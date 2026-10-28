import { serverSettingsJson } from '../fileModels/server-settings.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const lightningPayments = sdk.Action.withoutInput(
  'lightning-payments',

  async ({ effects }) => {
    const on = await serverSettingsJson
      .read((s) => s.lightningPayments)
      .const(effects)
    return {
      name: on
        ? i18n('Turn Off Lightning Payments')
        : i18n('Turn On Lightning Payments'),
      description: on
        ? i18n(
            'Lightning payments are on: the Crossbill page can pay from your Lightning Fork node. Turn them off to refuse every payment before it reaches the node. Invoices, balances and activity keep working.',
          )
        : i18n(
            'Lightning payments are off: Crossbill shows balances and activity and makes invoices, but refuses every payment before it reaches your Lightning Fork node. Turn them on to pay from the Crossbill page.',
          ),
      warning: on
        ? null
        : i18n(
            'Once this is on, anyone who can sign in to Crossbill can pay from your Lightning Fork node.',
          ),
      allowedStatuses: 'any',
      group: null,
      visibility: 'enabled',
    }
  },

  async ({ effects }) => {
    const on = await serverSettingsJson.read((s) => s.lightningPayments).once()
    await serverSettingsJson.merge(effects, { lightningPayments: !on })
    return {
      version: '1',
      title: on
        ? i18n('Lightning Payments Off')
        : i18n('Lightning Payments On'),
      message: on
        ? i18n('Crossbill now refuses every Lightning payment.')
        : i18n('Crossbill can now pay on Lightning, straight away.'),
      result: null,
    }
  },
)
