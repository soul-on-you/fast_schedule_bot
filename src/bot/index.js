const { createBotTask, editBotTask, removeBotTask } = require("./botTask");
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
  bot.tasks = {};
  bot.createTask = createBotTask(bot);
  bot.removeTask = removeBotTask(bot);
  bot.editTask = editBotTask(bot);

  restoreAllTasks(bot);

  bot.on("message", onMessage(bot));
  bot.on("callback_query", onCallback(bot));

  return bot;
};

module.exports = createBot;

function restoreAllTasks(bot) {
  Object.keys(bot.users).forEach(chatId=>{
    bot.createTask(chatId);
  })
}