import { manifest as bitcoinManifest } from 'bitcoin-core-startos/startos/manifest'
import {
  rpccookiefile,
  rpcHostId,
  rpcPort,
} from 'bitcoin-core-startos/startos/utils'
import { socksHostId, socksPort } from 'tor-startos/startos/utils'
import { i18n } from './i18n'
import { sdk } from './sdk'
import {
  bitcoindMount,
  dataDir,
  dataMounts,
  lightningForkDashboard,
  uiPort,
} from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  // Each address is null while its service isn't installed: the setting is
  // then left out, and the .const() restarts Crossbill once it appears.
  const rpc = await sdk.host
    .getBridgeAddress(effects, {
      packageId: 'bitcoind',
      hostId: rpcHostId,
      internalPort: rpcPort,
      ssl: false,
    })
    .const()
  const lightningFork = await lightningForkDashboard(effects)
  const torSocks = await sdk.host
    .getBridgeAddress(effects, {
      packageId: 'tor',
      hostId: socksHostId,
      internalPort: socksPort,
    })
    .const()

  const env: Record<string, string> = {
    CROSSBILL_HOST: '0.0.0.0',
    CROSSBILL_PORT: String(uiPort),
    CROSSBILL_DATA_DIR: dataDir,
    CROSSBILL_RPC_COOKIE_FILE: `${bitcoindMount}/${rpccookiefile}`,
  }
  if (rpc) env.CROSSBILL_RPC_URL = `http://${rpc}`
  if (lightningFork) env.CROSSBILL_LF_URL = `http://${lightningFork}`
  if (torSocks) env.CROSSBILL_TOR_SOCKS = torSocks

  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer: sdk.SubContainer.of(
      effects,
      { imageId: 'crossbill' },
      dataMounts.mountDependency<typeof bitcoinManifest>({
        dependencyId: 'bitcoind',
        volumeId: 'main',
        subpath: null,
        mountpoint: bitcoindMount,
        readonly: true,
      }),
      'crossbill',
    ),
    // Root, as the node's cookie file is readable by its owner only.
    exec: { command: ['node', 'server/main.ts'], user: 'root', env },
    ready: {
      display: i18n('Web Interface'),
      fn: () =>
        sdk.healthCheck.checkWebUrl(
          effects,
          `http://127.0.0.1:${uiPort}/api/health`,
          {
            successMessage: i18n('The web interface is ready'),
            errorMessage: i18n('The web interface is not ready'),
          },
        ),
    },
    requires: [],
  })
})
