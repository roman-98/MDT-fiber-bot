const {letCheck} = require("./options");

async function start(bot, context) {
  await bot.sendMessage(context.chatId, "\u{2705}Вітаємо Вас у команді цифровізаторів Львівщини!\u{1F603}");
  await bot.sendMessage(context.chatId, "\u{2705}Давайте перевіримо чи наявні оптоволоконні мережі у населених пунктах Вашого старостату та чи підключені до оптоволоконних мереж соціальні об'єкти у цих населених пунктах", letCheck)
}

module.exports = {start};
