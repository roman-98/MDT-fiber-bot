const commands = require('../commands');
const {
  start,
  startProfileForm,
  profileForm,
  finishProfileForm,
} = commands;

class MessageController {
  static async handle(bot, context) {
    if (!context.lastMessage) {
      await start(bot, context);
      return;
    }

    let handled = true;

    switch (context.currentMessage.text) {
      case '/start' :
        await start(bot, context);
        break;

      case 'Розпочати перевірку \u{1F680}' :
        await startProfileForm(bot, context);
        break;

      default:
        handled = false;
    }

    if (handled) {
      return;
    }

    const command = context.state?.command ?? '';
    if (command && commands[command]) {
      await commands[command](bot, context);
    }
  }
}

module.exports = MessageController;