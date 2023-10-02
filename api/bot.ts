import { Bot, GrammyError, HttpError, webhookCallback } from 'grammy';

const token = process.env.BOT_TOKEN;
const webApp = process.env.WEB_APP;

if (!token) throw new Error('BOT_TOKEN is unset');
// Create your bot and tell it about your context type
const bot = new Bot(token);

bot.use(async (ctx, next) => {
  console.log(ctx.msg);
  await next();
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error('Error in request:', e.description);
  } else if (e instanceof HttpError) {
    console.error('Could not contact Telegram:', e);
  } else {
    console.error('Unknown error:', e);
  }
});

const introductionMessage = 'Приветствую!';

bot.command(
  'start',
  async (ctx) =>
    await ctx.reply(introductionMessage, {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Запустить приложение', web_app: { url: webApp ?? '' } }],
        ],
      },
    })
);

if (process.env.NODE_ENV === 'development') {
  const { run } = require('@grammyjs/runner');
  const runner = run(bot);

  const stopRunner = () => (runner.isRunning() as boolean) && runner.stop();

  process.once('SIGINT', stopRunner);
  process.once('SIGTERM', stopRunner);
}

export default webhookCallback(bot, 'http');
