import { MessageChain } from './types'

export function createPlainMessage(
  message: string | MessageChain
): MessageChain {
  if (typeof message === 'string') {
    return [
      {
        type: 'Plain',
        text: message
      }
    ]
  }

  return message
}
