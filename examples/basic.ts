import config from './config'
import { Bot, createPlainMessage } from '../dist'

const bot = new Bot(config)

bot.on('*', (ctx) => {
  ctx.quoteReply([
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

bot.command('hi', (ctx) => {
  ctx.reply('hello from mumu bot')
})

bot.start(() => {
  bot.logToMaster('Bot started successfully!')
})
