<p align="center">
  <img src="icon.png" alt="Crossbill Logo" width="21%">
</p>

# Crossbill on StartOS

> Everything not listed in this document should behave the same as upstream Crossbill's server
> (`docs/server.md` in the upstream repository). If a feature, setting, or behavior is not mentioned
> here, the upstream documentation is accurate and fully applicable. See the Documentation section
> of `instructions.md` for links.

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

## Image and Container Runtime

The image is built from the upstream repository, checked out as the `upstream-project` submodule, with upstream's own `server/Dockerfile`: Node.js on Debian slim, holding the server (`server/`) and the screens it serves (`dist-server/`), with no npm packages at run time.

| Item          | Value                                                                             |
| ------------- | --------------------------------------------------------------------------------- |
| Image         | `crossbill`, built from `upstream-project/server/Dockerfile`                      |
| Architectures | x86_64, aarch64                                                                   |
| Entrypoint    | `node server/main.ts` in `/app`, run as `root` (the image's own user is `node`)   |
| Subcontainers | `crossbill`: the one daemon, `primary`, which serves the page and the API on 8080 |

The daemon runs as root because Bitcoin's RPC cookie file is readable by its owner only. The actions run the server's command line (`node server/main.ts set-password …`) in a throwaway container from the same image, also as root, against the same volume.

To look inside a running install: `start-cli package attach crossbill -n crossbill -- sh`.

## Volume and Data Layout

One volume, `main`, mounted at `/data`, holds everything the server keeps. Bitcoin's own `main` volume is mounted read-only at `/mnt/bitcoin`, for its `.cookie` file only.

| Path in `/data`        | What it is                                                                                                      |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| `app/`                 | The page's own files: settings, wallets' public keys and history, labels, contacts                              |
| `vault.json`           | What the iPhone app keeps in the Keychain, less seed words: the two-factor key and Lightning Fork's pairing key |
| `auth.json`            | The sign-in password's scrypt hash and the session epoch                                                        |
| `server-settings.json` | Settings only StartOS changes: whether Lightning payments are on                                                |
| `initial-password.txt` | Made only if the server ever starts without a password, which the Set Password task prevents                    |

No database: each file is plain JSON, written atomically. The server never stores seed words and refuses requests to.

## File Models

The package models two of the server's files and writes one of them. Everything is passed to the server as environment variables on each start, re-read on every launch; nothing is written into a configuration file.

- **`auth.json`** is written only by the server (`set-password`, which the Set Password action runs). The package reads it to know whether a password is set (a `hash` field). A hand edit that breaks it locks every session out until Set Password runs again.
- **`server-settings.json`** holds `lightningPayments`. The Lightning payments action merges `true` or `false` into it; the server's own `lightning-payments on|off` command writes the same key. The server reads it on every request, so a change takes effect at once, and a hand edit survives. Payments are on only when the value is exactly `true`.

Environment variables the package sets on every start:

| Variable                    | Value                                                                     |
| --------------------------- | ------------------------------------------------------------------------- |
| `CROSSBILL_HOST`            | `0.0.0.0`                                                                 |
| `CROSSBILL_PORT`            | `8080`                                                                    |
| `CROSSBILL_DATA_DIR`        | `/data`                                                                   |
| `CROSSBILL_RPC_URL`         | Bitcoin's RPC on the StartOS bridge, `http://`; left out while unresolved |
| `CROSSBILL_RPC_COOKIE_FILE` | `/mnt/bitcoin/.cookie`, read again for every call                         |
| `CROSSBILL_LF_URL`          | Lightning Fork's dashboard on the bridge, `http://`, while it's installed |
| `CROSSBILL_TOR_SOCKS`       | Tor's SOCKS proxy on the bridge, while Tor is installed                   |

`CROSSBILL_LIGHTNING_PAYMENTS` is never set, so `server-settings.json` decides. The network is the server's default, mainnet. Installing or removing Lightning Fork or Tor restarts Crossbill once, to pick the address up or drop it.

## Dependencies

Bitcoin is required; Lightning Fork is optional.

- **Bitcoin** (`bitcoind`), required, must be running with its `bitcoind` health check passing. Its `main` volume is mounted read-only at `/mnt/bitcoin` for the RPC cookie. Crossbill keeps its watch-only wallets in the node's `cormorant` wallet, the same one the iPhone app and desktop Shrike use, so the node's wallet must be on (see Tasks). The node must follow the BLAKE2b chain: any flavor is accepted at install, and Crossbill's page refuses a node on another chain.
- **Lightning Fork** (`lightning-fork`), optional, kind `exists`. It counts as a current dependency while it is installed. Crossbill reaches its dashboard (host `dashboard`, port 3006) through the bridge, for the Lightning tab; pairing is still done in the page, with the dashboard's pairing code. Without it installed, a pairing reaches the dashboard's onion through Tor, if Tor is installed.

Tor is not declared: when installed, its SOCKS proxy is passed so the price, and a Lightning Fork on another server, can be reached through Tor.

## Network Access and Interfaces

One interface serves the page and its API.

| Interface | Host id | Port | Protocol | Type |
| --------- | ------- | ---- | -------- | ---- |
| Web UI    | `ui`    | 8080 | HTTP     | `ui` |

The server's own sign-in page guards everything but `/login` and `/api/health`. Outbound, the server reaches Bitcoin's RPC and Lightning Fork's dashboard over the bridge, a dashboard's onion through Tor when there's no Lightning Fork on this server, and the XBT price from Neoxa Exchange's public API (through Tor when the page asks for that).

## Installation and First-Run Flow

Two critical tasks must be done before the first start: Set Password on Crossbill, and turning the node's wallet on (usually already on). Then the user starts Crossbill, opens the Web UI, signs in, and adds a wallet from a Krux's key. The page finds an existing wallet in the node's `cormorant` wallet with no rescan when the iPhone app or desktop Shrike already imported it.

## Actions

- **Set Password** (`set-password`). Run on install (a critical task asks for it) and whenever the password is lost or should change. Runs `node server/main.ts set-password` with a new random 24-character password, which replaces `auth.json` and signs out every session. Takes a second or two, works with the service running or stopped, and is safe to repeat; each run makes a new password. Returns the password once, masked and copyable. It is not stored anywhere in clear.
- **Turn On / Turn Off Lightning Payments** (`lightning-payments`). Off by default. On, the page can pay from Lightning Fork; off, the server refuses every payment before it reaches the node, while invoices, balances and activity keep working. Flips `lightningPayments` in `server-settings.json`, effective at once with no restart. Safe to repeat. Turning it on warns that anyone who can sign in can then pay.

## Tasks

- **Set Password** on Crossbill: raised by init while `auth.json` has no `hash`. Critical. Cleared by running Set Password. Returns only if `auth.json` is deleted.
- **Auto-Configure** on Bitcoin (`bitcoind`'s `autoconfig` action, shown on Bitcoin's page): raised by Crossbill while the node's wallet is not on, asking for `wallet.enable: true`. Critical. Cleared by running it, which turns the wallet on in `bitcoin.conf`. Returns if the wallet is turned off again.

## Health Checks

One check, on the daemon.

| Check         | Probes                                                                    | Failure means                                                                                                                                                                |
| ------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Web Interface | An HTTP request to `http://127.0.0.1:8080/api/health` (any answer passes) | The server isn't listening: still starting (a second or two), or it exited. Its log says why; `CROSSBILL_RPC_URL is not set` means Bitcoin's RPC address hasn't resolved yet |

The check does not reach the node. When the page can't reach it, the page says why: "Can't read the node's RPC cookie" means the mount or the node's cookie is missing (the node isn't running, or hasn't written it yet). The log's first line names what the server was given: `crossbill: <version> on http://0.0.0.0:8080, mainnet, node at <address>`, then Lightning Fork's address and `Tor proxy on` when present.

## Backups and Restore

The `main` volume is copied whole. A restore brings back the password, two-factor, Lightning Fork's pairing, and every wallet's public data, labels and contacts.

The node's `cormorant` wallet is Bitcoin's data, not Crossbill's, and is not in this backup. A restored Lightning pairing works only while that Lightning Fork still lists it.

## Limitations and Differences

1. Watch-only: there is no screen for seed words, and the server refuses to store them. Wallets come from a Krux's key, and every send is signed on the Krux.
2. QR codes are read in the page, with the camera of the device it's open on (jsQR, not the iPhone's VisionKit). The browser gives a page the camera only on a secure address: the interface's `https://` address, or an onion in Tor Browser. On plain `http://` the scanner says so and offers a picture of the code or its pasted text instead.
3. No Face ID, app PIN or duress PIN. Two-factor asks for its code, but the page checks it and the server hands the page its key once signed in, so on this server the password is what keeps others out.
4. No sign-out button in the page; Set Password signs out every session.
5. Untested on a pruned node, where Bitcoin's RPC on 8332 is its block-fetching proxy rather than the node itself.
6. Mainnet only: the package doesn't offer testnet4 or regtest, which the server supports.
7. No notifications, by decision: the iPhone app's notifications come from iOS waking the app, and nothing here runs while no Crossbill page is open. The Notifications settings are hidden in this version. No widgets either.

---

## Quick Reference for AI Consumers

```yaml
package_id: 'crossbill'
image: 'crossbill (built from upstream-project/server/Dockerfile)'
architectures: [x86_64, aarch64]
subcontainers:
  - crossbill # daemon "primary": node server/main.ts, as root
volumes:
  main: /data
  bitcoind main (read-only): /mnt/bitcoin
file_models:
  - /data/auth.json # read only: is a password set
  - /data/server-settings.json # lightningPayments, written by the action
startos_managed_env_vars:
  - CROSSBILL_HOST
  - CROSSBILL_PORT
  - CROSSBILL_DATA_DIR
  - CROSSBILL_RPC_URL
  - CROSSBILL_RPC_COOKIE_FILE
  - CROSSBILL_LF_URL
  - CROSSBILL_TOR_SOCKS
dependencies:
  - bitcoind # required, running, health check bitcoind
  - lightning-fork # optional, exists, enabled while installed
interfaces:
  ui: { port: 8080, protocol: http, type: ui }
actions:
  - set-password
  - lightning-payments
tasks:
  - crossbill:set-password # critical, until a password is set
  - bitcoind:autoconfig # critical, until the node's wallet is on
health_checks:
  - primary # Web Interface: HTTP on /api/health
```
