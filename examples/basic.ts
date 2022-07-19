import config from './config'
import { Bot } from '../dist'

console.log('Hello World')
const bot = new Bot(config)

bot.on('*', (ctx) => {
  ctx.reply(ctx.contentMessageChain)
})

bot.start()
