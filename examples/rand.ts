import { Bot } from '../dist'
import config from './config'

const randBot = new Bot(config)

randBot.command('rand', (ctx) => {
  const choices = ctx.command?.attrs

  if (!choices) {
    ctx.quoteReply('Usage: /rand [...choices]')
  } else {
    const range = choices.length

    ctx.reply(choices[Math.floor(Math.random() * range)])
  }
})

randBot.start()
