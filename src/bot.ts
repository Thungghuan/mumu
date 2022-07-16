import { BotEventCache } from './types'

export class Bot {
  private eventCache: BotEventCache = new Map()

  constructor() {
    console.log('Creating a new bot...')
  }

  on() {}
  once() {}
  off() {}
  private emit() {}

  use() {}
  start() {}
}
