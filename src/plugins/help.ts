import { definePlugin } from '.'

export default definePlugin({
  name: 'Help',
  load: (bot) => {
    bot.command('help', (ctx) => {
      ctx.reply('Bot help text.')
    })
  }
})
