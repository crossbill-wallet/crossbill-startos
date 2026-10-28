import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

// Written only by the server (`set-password`): the sign-in password's scrypt
// hash. Read here to know whether a password has been set.
const shape = z.looseObject({
  hash: z.string().optional().catch(undefined),
})

export const authJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: '/auth.json' },
  shape,
)
