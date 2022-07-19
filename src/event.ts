import { Context } from './context'
import {
  BotEventCache,
  BotEventHandler,
  BotEventKey,
  BotEventType
} from './types'

export class BotEvent {
  private eventCache: BotEventCache = new Map()

  on(eventName: BotEventKey<BotEventType>, handler: BotEventHandler) {
    if (this.eventCache.has(eventName)) {
      this.eventCache.get(eventName).add(handler)
    } else {
      this.eventCache.set(eventName, new Set([handler]))
    }
  }

  off(eventName: BotEventKey<BotEventType>) {
    if (this.eventCache.has(eventName)) {
      this.eventCache.delete(eventName)
    }
  }

  emit<K extends BotEventType>(key: BotEventKey<K>, ctx: Context) {
    if (this.eventCache.has(key)) {
      const handlersToExec = new Set<BotEventHandler>()
      this.eventCache.get(key).forEach((fn) => handlersToExec.add(fn))
      handlersToExec.forEach((fn) => fn(ctx))
    }
  }
}
