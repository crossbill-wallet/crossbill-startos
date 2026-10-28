import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

// The server's own settings file, which it reads on every request.
// `lightningPayments` is on only when it is exactly true.
const shape = z.looseObject({
  lightningPayments: z.boolean().catch(false),
})

export const serverSettingsJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: '/server-settings.json' },
  shape,
)
