export const DEFAULT_LANG = 'en_US'

const dict = {
  // interfaces.ts
  'Web UI': 0,
  'Crossbill in the browser, behind the password from the Set Password action.': 1,

  // actions/setPassword.ts
  'Set Password': 2,
  'Make a new random password for signing in to Crossbill. Every open session is signed out.': 3,
  'This replaces the current password, and every open session is signed out.': 4,
  'Crossbill Password': 5,
  'Sign in to Crossbill with this password. It is shown only now: keep it in your password manager.': 6,

  // actions/lightningPayments.ts
  'Turn Off Lightning Payments': 7,
  'Turn On Lightning Payments': 8,
  'Lightning payments are on: the Crossbill page can pay from your Lightning Fork node. Turn them off to refuse every payment before it reaches the node. Invoices, balances and activity keep working.': 9,
  'Lightning payments are off: Crossbill shows balances and activity and makes invoices, but refuses every payment before it reaches your Lightning Fork node. Turn them on to pay from the Crossbill page.': 10,
  'Once this is on, anyone who can sign in to Crossbill can pay from your Lightning Fork node.': 11,
  'Lightning Payments Off': 12,
  'Lightning Payments On': 13,
  'Crossbill now refuses every Lightning payment.': 14,
  'Crossbill can now pay on Lightning, straight away.': 15,

  // init/watchPassword.ts
  'Set the password for signing in to Crossbill': 16,

  // dependencies.ts
  'Crossbill reads the chain and keeps its watch-only wallets in your Bitcoin node, which must follow the BLAKE2b chain.': 17,
  'Crossbill keeps its watch-only wallets in the node, so the node’s wallet must be on.': 18,
  'For Crossbill’s Lightning tab. When it is installed, Crossbill reaches its dashboard through StartOS.': 19,

  // main.ts
  'Web Interface': 20,
  'The web interface is ready': 21,
  'The web interface is not ready': 22,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
