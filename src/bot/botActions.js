const { addToUserDB } = require("../db");

const botAddTime = (bot, chatId) => {
  addToUserDB(
    chatId,
    bot.tempUsers[chatId].data.group,
    bot.tempUsers[chatId].data.time
  )
    .then((data) => {
      bot.users.push(data);
      return bot.sendMessage(
        chatId,
        `✅ Вы успешно подписались на рассылку расписания\n\n🗂️ Данные о вашей рассылке:\n\n🎓 Группа: ${data.gp_name}\n🕰️ Время уведомления: ${data.timeRemind}\n\n📇 Чтобы отписаться отправьте /unsubscribe`
      );
    })
    .then(() => {
      delete bot.tempUsers[chatId];
    });
};

module.exports = {
  botAddTime,
};
