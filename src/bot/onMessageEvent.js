const { findUserInDB, removeFromUserDB } = require("../db");
const { validateGroup } = require("../db/validators");
const { botAddTime } = require("./botActions");

const onMessage = (bot) => (message) => {
  const chatId = message.from.id;

  if (!bot.tempUsers[chatId]) {
    bot.tempUsers[chatId] = { action: bot.ACTIONS.INIT };
    if (!bot.users[chatId]) {
      bot.tempUsers[chatId].action = bot.ACTIONS.ADDGROUP;
    }
  }

  if (Object.keys(bot.COMMANDS).includes(message.text)) {
    if (message.text === "/start") {
      bot.sendMessage(
        chatId,
        "👋 Welcome!\n\n🎓Введите название группы в которой обучаетесь"
      );
    }

    if (message.text === "/unsubscribe") {
      const deleteId = bot.users.find((user) => user.chatId === chatId)?.id;
      if (deleteId)
        removeFromUserDB(deleteId).then(() => {
          bot.sendMessage(
            chatId,
            "✅ Вы успешно отписались от рассылки расписания\n\n🥳 Чтобы подписаться повторно отправьте /start"
          );
        });
    }

    if (message.text === "/info") {
      findUserInDB(chatId).then((data) => {
        if (data)
          bot.sendMessage(
            chatId,
            `🗂️ Данные о вашей рассылке:\n\n🎓 Группа: ${data.gp_name}\n🕰️ Время уведомления: ${data.timeRemind}\n\n💡 Чтобы поменять данные отправьте /start`
          );
        else {
          bot.sendMessage(
            chatId,
            "🔍 Не удается найти вашу информацию, давайте заполним заново!\n\n🎓Введите название группы в которой обучаетесь"
          );
        }
      });
    }
  } else {
    switch (bot.tempUsers[chatId].action) {
      case bot.ACTIONS.ADDGROUP:
        const group = validateGroup(bot.groups, message.text);
        if (group) {
          bot.tempUsers[chatId].data = { group: group.gp_name };
          bot.sendMessage(
            chatId,
            "🕰️ Выберите время, в которое будет приходить расписание\n\n💡 Вы также можете ввести свое время в формате hh:mm, пример: 22:20",
            {
              reply_markup: JSON.stringify({
                inline_keyboard: [
                  [
                    {
                      text: "🕘 21:00",
                      callback_data: "21:00",
                    },
                    {
                      text: "🕙 22:00",
                      callback_data: "22:00",
                    },
                    {
                      text: "🕚 23:00",
                      callback_data: "23:00",
                    },
                  ],
                  [
                    {
                      text: "🕕 6:00",
                      callback_data: "6:00",
                    },
                    {
                      text: "🕖 7:00",
                      callback_data: "7:00",
                    },
                    {
                      text: "🕗 8:00",
                      callback_data: "8:00",
                    },
                  ],
                ],
              }),
            }
          );
          bot.tempUsers[chatId].action = bot.ACTIONS.ADDTIME;
        } else {
          bot.sendMessage(
            chatId,
            "😭 Мы не нашли вашу группу, попробуйте еще раз"
          );
        }
        break;
      case bot.ACTIONS.ADDTIME:
        const time = message.text.match(/\d?\d:\d\d/) || "0:00";
        bot.tempUsers[chatId].data.time =
          time[0].length == 4
            ? `0${time[0]}`
            : time[0].at(0) !== "0" &&
              time[0].at(0) !== "1" &&
              time[0].at(0) !== "2"
            ? `0${time[0].slice(1)}`
            : time[0];
        botAddTime(bot, chatId);
        break;

      default:
        bot.tempUsers[chatId].action = bot.ACTIONS.OTHER;
        break;
    }
  }
};

module.exports = onMessage;
