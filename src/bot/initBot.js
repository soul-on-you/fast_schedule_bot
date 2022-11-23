const TelegramBot = require("node-telegram-bot-api");
const COMMANDS = require("./botCommandsCONSTS");

const bot = new TelegramBot(process.env.TG_TOKEN, { polling: true });
bot.setMyCommands(
  JSON.stringify(
    Object.keys(COMMANDS).map((key) => ({
      command: key,
      description: COMMANDS[key],
    }))
  )
);

module.exports = bot;

// [
//     { command: "/start", description: "Подписаться на рассылку" },
//     { command: "/unsubscribe", description: "Отписаться от рассылки" },
//     { command: "/info", description: "Посмотреть информацию рассылки" },
//   ]
