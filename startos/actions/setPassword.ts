import { utils } from '@start9labs/start-sdk'
import { authJson } from '../fileModels/auth.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { runServerCommand } from '../utils'

export const setPassword = sdk.Action.withoutInput(
  'set-password',

  async ({ effects }) => ({
    name: i18n('Set Password'),
    description: i18n(
      'Make a new random password for signing in to Crossbill. Every open session is signed out.',
    ),
    warning: (await authJson.read((a) => a.hash).const(effects))
      ? i18n(
          'This replaces the current password, and every open session is signed out.',
        )
      : null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  async ({ effects }) => {
    const password = utils.getDefaultString({
      charset: 'a-z,A-Z,0-9',
      len: 24,
    })
    await runServerCommand(effects, 'set-password', ['set-password', password])

    return {
      version: '1',
      title: i18n('Crossbill Password'),
      message: i18n(
        'Sign in to Crossbill with this password. It is shown only now: keep it in your password manager.',
      ),
      result: {
        type: 'single',
        value: password,
        masked: true,
        copyable: true,
        qr: false,
        launchable: false,
      },
    }
  },
)
