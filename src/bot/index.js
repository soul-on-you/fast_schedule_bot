const bot = require("./initBot");
const onCallback = require("./onCallbackEvent");
const onMessage = require("./onMessageEvent");
bot.ACTIONS = require("./botActionsCONSTS");
bot.COMMANDS = require("./botCommandsCONSTS");

const createBot = (users, groups, schedules, tempUsers) => {
  bot.users = users;
  bot.groups = groups;
  bot.tempUsers = tempUsers;
  bot.schedules = schedules;

  bot.on("message", onMessage(bot));
  bot.on("callback_query", onCallback(bot));

  return bot;
};

module.exports = createBot;
