const Router = require('./router');

class App {
  constructor(bot) {
    this.bot = bot;
  }

  listen() {
    this.bot.setMyCommands([
      {command: '/start', description: 'Розпочати'}
    ])
    this.bot.on('message', (message) => Router.handleMessage(this.bot, message));
  }
}

module.exports = App;
