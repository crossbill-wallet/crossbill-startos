import { setPassword } from '../actions/setPassword'
import { authJson } from '../fileModels/auth.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const watchPassword = sdk.setupOnInit(async (effects) => {
  const hash = await authJson.read((a) => a.hash).const(effects)

  if (!hash) {
    await sdk.action.createOwnTask(effects, setPassword, 'critical', {
      reason: i18n('Set the password for signing in to Crossbill'),
    })
  }
})
