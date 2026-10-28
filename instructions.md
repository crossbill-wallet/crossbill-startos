# Crossbill

## Documentation

- [Crossbill on StartOS](https://github.com/crossbill-wallet/crossbill/blob/main/docs/server.md) - how the browser version differs from the iPhone app
- [Running your own bridge](https://github.com/crossbill-wallet/crossbill/blob/main/docs/own-bridge.md) - letting your Lightning Fork node pay invoices on the SHA256 chain itself

## What you get on StartOS

- **Web UI:** Crossbill in your browser, on your network or wherever else you've made this interface reachable. One password signs you in.
- **Your Bitcoin node does the work.** Crossbill reads the chain and keeps its watch-only wallets in the node's `cormorant` wallet, the same one the Crossbill iPhone app and desktop Shrike use, so a wallet you already have there opens with no rescan.
- **No seed words, ever.** You add a wallet from the key your Krux shows, and every send is signed on the Krux.
- **Lightning,** when you pair Crossbill with Lightning Fork. If Lightning Fork runs on this server, Crossbill reaches it here directly.

## Getting set up

1. **Install Bitcoin first,** following the BLAKE2b chain. If Bitcoin asks to turn its wallet on for Crossbill, run that.
2. **Run Set Password** on Crossbill. Copy the password it shows into your password manager: it is shown only once.
3. **Start Crossbill,** then open the **Web UI** interface and sign in.
4. **Add your Krux wallet.** On the Krux, save its key to microSD (or show its QR code). In Crossbill, choose **Open the key file from microSD** (or paste the code's text). Check the balance and the first receive address match what you expect.
5. **Try a small send.** Build it, choose **Save for microSD**, then on the Krux choose **Load from SD card** and **Sign to SD card**. Open the signed file back in Crossbill to send it.

## Using Crossbill

### Lightning

1. In Lightning Fork's dashboard, open **Mobile app**, then **Pair a phone**.
2. In Crossbill, open **Settings**, then **Lightning**, and paste what the pairing code holds (its `lightningfork://pair` link, or its text).

The dashboard lists the pairing as **Crossbill on StartOS**; remove it there to cut Crossbill off. Until you turn payments on, Crossbill shows balances and activity and makes invoices, but refuses every payment.

### Actions

- **Set Password:** makes a new random password and signs out every open session. Run it if you lose the password, or want to sign everyone out.
- **Turn On Lightning Payments / Turn Off Lightning Payments:** lets the Crossbill page pay from Lightning Fork, or stops it. Takes effect straight away. Once it's on, anyone who can sign in to Crossbill can pay, so keep the password to yourself.

## Limitations

- **Two-factor doesn't protect the password.** You can turn two-factor on in Crossbill's Settings, and it asks for the code before sends, but here the page checks the code, and anyone signed in can read its key. Guard the password itself.
- **No camera scanning.** Move the Krux's codes by microSD, or paste their text.
