const DayChecker = require("../parser/DayChecker");
const PeriodChecker = require("../parser/PeriodChecker");
const {
  createTask,
  removeTask,
  editTask,
} = require("../services/notificationService");

const shortLT = (LT) => {
  if (LT.match(/Практические/g)) return "🧾 Семинар";
  else if (LT.match(/Лабораторные/g)) return "🥵 Лабораторка";
  else if (LT.match(/Лекц/g)) return "🛌 Лекция";
  else {
    console.log(LT);
    return "";
  }
};

const buildMessage = (bot, chatId) => {
  const period = PeriodChecker();
  const day = DayChecker();

  const messageData = bot.schedules[bot.users[chatId].gp_name][day];
  if (messageData) {
    // console.log(messageData);
    const message = messageData
      .filter((data) =>
        period === "Числитель"
          ? !data.period.match(/Знам/g)
          : !data.period.match(/Числ/g)
      )
      .map(
        (data) =>
          `🕰️ ${data.time}: ${data.lesson}\n${shortLT(data.lessonType)} ${
            data.period.match(/в месяц/g) ? "(раз в месяц)" : ""
          }${
            data.auditor
              ? `в ауд: 🐗 ${data.auditor}`
              : ": 😎 аудитория не указана"
          }${data.teacher ? `\n👨‍🏫 Препод: ${data.teacher}` : ""}`
      )
      .join("\n\n");
    return `📆 Расписание на день\n${message}`;
  }
  return null;
};

const buildTimeCron = (timeRemind) => {
  let cron = "";

  timeRemind = timeRemind.split(":");

  if (timeRemind[1].length === 2 && timeRemind[1].at(0) == "0") {
    timeRemind[1] = "0";
  }

  if (timeRemind[0].length === 2 && timeRemind[0].at(0) == "0") {
    timeRemind[0] = timeRemind[0].slice(1)[0];
  }

  if (timeRemind) {
    cron = `0 ${timeRemind[1]} ${timeRemind[0]} * * *`;
  }
  return cron;
};

const createBotTask = (bot) => async (chatId) => {
  try {
    bot.tasks[chatId] = createTask(
      () => bot.sendMessage(chatId, buildMessage(bot, chatId)),
      buildTimeCron(bot.users[chatId].timeRemind)
    );
  } catch (err) {
    console.log(err);
    console.log("Cant create bot task for chatID: " + chatId);
  }
};

const removeBotTask = (bot) => async (chatId) => {
  removeTask(bot.tasks[chatId]);
};

const editBotTask = (bot) => async () => {
  ///
};

module.exports = {
  createBotTask,
  editBotTask,
  removeBotTask,
};
