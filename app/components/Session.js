class Session {
  constructor(chatId) {
    this.chatId = chatId;
    this.messages = [];
    this.currentMessage = null;
    this.lastMessage = null;
    this.state = {};
  }

  push(message) {
    if (this.messages.length > 100) {
      this.messages.splice(0, this.messages.length - 100);
    }

    if (this.messages.length) {
      this.lastMessage = this.messages[this.messages.length - 1];
    }
    this.messages.push(message);

    this.currentMessage = message;
  }
}

if (!global.__SESSION_STORAGE) {
  global.SessionStorage = global.__SESSION_STORAGE = new Map();
}

module.exports = {Session, SessionStorage};
