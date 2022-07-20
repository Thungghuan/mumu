import config from './config'
import { Bot, createPlainMessage } from '../dist'

console.log('Hello World')
const bot = new Bot(config)

bot.on('*', (ctx) => {
  ctx.reply([
    ...createPlainMessage('Received a message: \n'),
    ...ctx.contentMessageChain
  ])
})

bot.command('*', (ctx) => {
  ctx.reply([
    ...createPlainMessage('Received a command: \n'),
    ...ctx.contentMessageChain
  ])
})

bot.start()
