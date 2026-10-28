# Crossbill

## Documentation

- [Crossbill on StartOS](https://github.com/crossbill-wallet/crossbill/blob/main/docs/server.md) - how the browser version differs from the iPhone app
- [Running your own bridge](https://github.com/crossbill-wallet/crossbill/blob/main/docs/own-bridge.md) - letting your Lightning Fork node pay invoices on the SHA256 chain itself

## What you get on StartOS

- **Web UI:** Crossbill in your browser, on a computer or a phone, on your network or wherever else you've made this interface reachable. One password signs you in.
- **Your Bitcoin node does the work.** Crossbill reads the chain and keeps its watch-only wallets in the node's `cormorant` wallet, the same one the Crossbill iPhone app and desktop Shrike use, so a wallet you already have there opens with no rescan.
- **No seed words, ever.** You add a wallet from the key your Krux shows, and every send is signed on the Krux.
- **Lightning,** when you pair Crossbill with Lightning Fork. If Lightning Fork runs on this server, Crossbill reaches it here directly.

## Getting set up

1. **Install Bitcoin first,** following the BLAKE2b chain. If Bitcoin asks to turn its wallet on for Crossbill, run that.
2. **Run Set Password** on Crossbill. Copy the password it shows into your password manager: it is shown only once.
3. **Start Crossbill,** then open the **Web UI** interface at its `https://` address and sign in. The camera works only on a secure address: that one, or an onion address in Tor Browser.
4. **Add your Krux wallet.** On the Krux, show its key's QR code, then in Crossbill choose **Scan the Krux's key** and hold the code up to the camera. Or save the key to microSD and choose **Open the key file from microSD**. Check the balance and the first receive address match what you expect.
5. **Try a small send.** Build it and follow the steps on the **Sign on your Krux** screen: the Krux reads Crossbill's codes with **Load from camera**, signs with **Sign to QR code**, and you choose **Scan the Krux's signed codes**. With a microSD card instead, choose **Save for microSD instead**, then **Open the signed file**.

## Using Crossbill

### Scanning QR codes

Wherever Crossbill asks you to scan, it opens the camera of the device you're using: your phone's when you have Crossbill open on your phone, your computer's when it's open there. Under the camera there are two more ways in:

- **Open a picture of the code:** for a code on the same screen as Crossbill, take a screenshot of it and open the screenshot. A photo of a code works too.
- **Paste the code's text:** if you have the code as text.

If the browser blocks the camera, allow it in the browser's settings for this site.

### Lightning

1. In Lightning Fork's dashboard, open **Mobile app**, then **Pair a phone**.
2. In Crossbill, open **Settings**, **Node and Lightning**, then **Lightning**, and choose **Scan**. With the dashboard on the same computer, use **Open a picture of the code** with a screenshot of it, or open Crossbill on your phone and scan the code there. The code works once, for five minutes.

The dashboard lists the pairing as **Crossbill on StartOS**; remove it there to cut Crossbill off. Until you turn payments on, Crossbill shows balances and activity and makes invoices, but refuses every payment.

### Actions

- **Set Password:** makes a new random password and signs out every open session. Run it if you lose the password, or want to sign everyone out.
- **Turn On Lightning Payments / Turn Off Lightning Payments:** lets the Crossbill page pay from Lightning Fork, or stops it. Takes effect straight away. Once it's on, anyone who can sign in to Crossbill can pay, so keep the password to yourself.

## Limitations

- **Two-factor doesn't protect the password.** You can turn two-factor on in Crossbill's Settings, and it asks for the code before sends, but here the page checks the code, and anyone signed in can read its key. Guard the password itself.
- **No notifications.** Crossbill on StartOS shows nothing while no Crossbill page is open. Notifications are part of the iPhone app.
