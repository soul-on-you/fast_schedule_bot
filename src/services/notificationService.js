const cronJob = require("cron").CronJob;
const cronTime = require("cron").CronTime;

const createTask = (task, time) => {
  const job = new cronJob(time, task, null, true);

  if (process.env.NODE_ENV === "development") {
    console.log(job);
  }

  return job;
};

const removeTask = (cronTask) => {
  if (process.env.NODE_ENV === "development") {
    console.log("removing cron task...");
  }

  cronTask.stop();

  if (process.env.NODE_ENV === "development") {
    console.log("cron task removed!");
  }
};

const editTask = (cronTask, newTime) => {
  const cTime = new cronTime(newTime);
  cronTask.stop();

  if (process.env.NODE_ENV === "development") {
    console.log("stopped task");
    console.log("setting new time: " + cTime);
  }
  cronTask.setTime(cTime);

  if (process.env.NODE_ENV === "development") {
    console.log("set new time " + cTime);
    console.log("cron task started!");
  }

  cronTask.start();
};

module.exports = {
  createTask,
  removeTask,
  editTask,
};

// const time = "* * 12 * * 1-6";

//! TESTS
// const time = "*/2 * * * * *";
// const time2 = "* * * * * *";
// const task = createTask(() => console.log(new Date()), time);

// setTimeout(() => {
//   editTask(task, time2);
//   console.log("Edited Cron Task");
//   setTimeout(() => {
//     removeTask(task);
//   }, 10000);
// }, 10000);
