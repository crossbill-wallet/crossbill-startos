import { autoconfig } from 'bitcoin-core-startos/startos/actions/config/autoconfig'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { lightningForkDashboard, lightningForkId } from './utils'

// '*': a range cannot name a flavor, and the BLAKE2b chain is a flavor of
// bitcoind. Crossbill itself refuses a node on another chain.
const bitcoin = sdk.Dependency.required('bitcoind', {
  description: i18n(
    'Crossbill reads the chain and keeps its watch-only wallets in your Bitcoin node, which must follow the BLAKE2b chain.',
  ),
  metadata: {
    title: 'Bitcoin',
    icon: 'https://raw.githubusercontent.com/Start9Labs/bitcoin-core-startos/feec0b1dae42961a257948fe39b40caf8672fce1/dep-icon.svg',
  },
  versionRange: '*',
  kind: 'running',
  healthChecks: ['bitcoind'],
}).withInit(async (effects) => {
  await sdk.action.createTask(effects, 'bitcoind', autoconfig, 'critical', {
    input: {
      kind: 'partial',
      accept: [{ wallet: { enable: true } }],
      set: { wallet: { enable: true } },
    },
    when: { condition: 'input-not-matches', once: false },
    reason: i18n(
      'Crossbill keeps its watch-only wallets in the node, so the node’s wallet must be on.',
    ),
  })
})

const lightningFork = sdk.Dependency.optional(lightningForkId, {
  description: i18n(
    'For Crossbill’s Lightning tab. When it is installed, Crossbill reaches its dashboard through StartOS.',
  ),
  metadata: {
    title: 'Lightning Fork',
    icon: 'https://raw.githubusercontent.com/paulscode/lightning-fork-startos/d3a89f02b84b59cd537699599e8b310c437fca0e/icon.png',
  },
  versionRange: '*',
  kind: 'exists',
  enabled: async ({ effects }) =>
    (await lightningForkDashboard(effects)) !== null,
})

export const dependencies = sdk.Dependencies.of()
  .addDependency(bitcoin)
  .addDependency(lightningFork)
