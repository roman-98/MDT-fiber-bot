const {Session, SessionStorage} = require('../components/Session');
const MessageController = require('../controllers/MessageController');

async function handleMessage(bot, message) {
  const {
    message_id: id,
    chat: {id: chatId},
    text,
    date,
  } = message;
  if (!SessionStorage.has(chatId)) {
    SessionStorage.set(chatId, new Session(chatId));
  }
  const session = SessionStorage.get(chatId);

  session.push({
    id,
    date: new Date(date*1000),
    text,
  });

  await MessageController.handle(bot, session);
}
module.exports = {handleMessage};