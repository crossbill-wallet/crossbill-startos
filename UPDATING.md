# Updating the upstream version

Upstream is Crossbill (https://github.com/crossbill-wallet/crossbill), checked out as the git
submodule `upstream-project`. The image is built from that checkout with its own
`server/Dockerfile`, so the submodule's commit is the pin: there is no image tag.

## Determining the upstream version

The pinned commit is what `git submodule status` shows for `upstream-project`. The upstream
version is `version` in `upstream-project/package.json` at that commit.

To see the latest release:

```sh
git -C upstream-project fetch --tags origin
git -C upstream-project tag --sort=-creatordate | head -1
```

## Applying the bump

1. Move the submodule to the release tag (or commit) and stage it:

   ```sh
   git -C upstream-project checkout v0.4.2
   git add upstream-project
   ```

2. Set `version` in `startos/versions/current.ts` to the upstream version with the
   package revision reset to 0 (`0.4.2:0`), and write its `releaseNotes`. A package-only change
   on the same upstream version raises the revision instead (`0.4.2:1`).
3. Read upstream's `CHANGELOG.md` and `docs/server.md` for changes to the server's settings
   (`CROSSBILL_*` variables), its data folder, or its command line (`set-password`,
   `lightning-payments`), which `startos/main.ts`, `startos/utils.ts` and the file models depend on.
4. `make`, then install and check sign-in, a node connection and a Lightning pairing.
