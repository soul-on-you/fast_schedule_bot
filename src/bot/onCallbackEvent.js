const { botAddTime } = require("./botActions");

const onCallback = (bot) => (msg) => {
  const chatId = msg.from.id;
  if (bot.tempUsers[chatId]) {
    switch (bot.tempUsers[chatId].action) {
      case bot.ACTIONS.ADDTIME:
        bot.tempUsers[chatId].data.time = msg.data;
        botAddTime(bot, chatId);
        break;
      default:
        bot.tempUsers[chatId].action = bot.ACTIONS.OTHER;
        break;
    }
  }
};
module.exports = onCallback;
