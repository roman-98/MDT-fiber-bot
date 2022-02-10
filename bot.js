const TelegramBot = require('node-telegram-bot-api');
const sequelize = require('./database');

const App = require('./app');

(async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  console.info('DB Connected');

  const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});
  (new App(bot)).listen();
  console.info('Bot started');
})();
