# AGENTS.md

This is a StartOS service-package repository: it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

## This repo

- **Clone with `--recursive`, or run `git submodule update --init` first.** The image builds from `upstream-project`, and an empty checkout fails at the Docker step.
- **Keep the daemon and the actions running as `root`, never the image's `node` user.** Bitcoin's `.cookie` is readable by its owner only, and the actions write files the daemon must read.
- **Lightning Fork's host id and port live in `startos/utils.ts`, copied from its `startos/interfaces.ts`.** Importing its package would pull an older SDK into `tsc`.
- **The release workflows are left out:** this package is published by hand with `start-cli` to its own registry. `build.yml` still builds every pull request.
