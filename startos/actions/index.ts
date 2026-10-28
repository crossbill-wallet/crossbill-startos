import { sdk } from '../sdk'
import { lightningPayments } from './lightningPayments'
import { setPassword } from './setPassword'

export const actions = sdk.Actions.of()
  .addAction(setPassword)
  .addAction(lightningPayments)
