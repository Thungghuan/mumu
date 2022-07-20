import { PlainMessage, MessageChain } from './types'

export function createPlainMessage(text: string): MessageChain {
  const plainMessage: PlainMessage = {
    type: 'Plain',
    text
  }

  return [plainMessage]
}
