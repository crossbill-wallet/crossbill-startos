import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'

export const uiPort = 8080
export const dataDir = '/data'
export const bitcoindMount = '/mnt/bitcoin'

// From Lightning Fork's startos/interfaces.ts. Copied, not imported: its
// package pins an older SDK, which this package's tsc would then compile.
export const lightningForkId = 'lightning-fork'
export const lightningForkDashboardHostId = 'dashboard'
export const lightningForkDashboardPort = 3006

/** Lightning Fork's dashboard on the bridge, or null when it isn't installed. */
export const lightningForkDashboard = (effects: T.Effects) =>
  sdk.host
    .getBridgeAddress(effects, {
      packageId: lightningForkId,
      hostId: lightningForkDashboardHostId,
      internalPort: lightningForkDashboardPort,
      ssl: false,
    })
    .const()

export const dataMounts = sdk.Mounts.of().mountVolume({
  volumeId: 'main',
  subpath: null,
  mountpoint: dataDir,
  readonly: false,
})

/**
 * Runs the server's own command line (`node server/main.ts …`) against the
 * data volume, in a throwaway container. As root, like the server itself.
 */
export const runServerCommand = (
  effects: T.Effects,
  name: string,
  args: string[],
) =>
  sdk.SubContainer.withTemp(
    effects,
    { imageId: 'crossbill' },
    dataMounts,
    name,
    (sub) =>
      sub.execFail(['node', 'server/main.ts', ...args], {
        user: 'root',
        env: { CROSSBILL_DATA_DIR: dataDir },
      }),
  )
