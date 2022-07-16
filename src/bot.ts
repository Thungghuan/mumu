import {
  BotEventCache,
  BotEventHandler,
  BotEventKey,
  BotEventName,
  BotEventType
} from './types'

export class Bot {
  private eventCache: BotEventCache = new Map()

  constructor() {
    console.log('Creating a new bot...')
  }

  on(eventType: BotEventName, handler: BotEventHandler) {
    const key: BotEventKey<'message'> = `message:${eventType}`

    if (this.eventCache.has(key)) {
      this.eventCache.get(key).push(handler)
    } else {
      this.eventCache.set(key, [handler])
    }
  }

  once() {}

  off(eventType: BotEventName) {
    const key: BotEventKey<'message'> = `message:${eventType}`

    if (this.eventCache.has(key)) {
      this.eventCache.delete(key)
    }
  }

  private emit<K extends BotEventType>(key: BotEventKey<K>) {
    if (this.eventCache.has(key)) {
      this.eventCache
        .get(key)
        .slice()
        .map((fn) => fn())
    }
  }

  use() {}

  start() {}
}
