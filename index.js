require("dotenv").config();
const createBot = require("./src/bot");
const { loadDB, initGroupDB } = require("./src/db");
const { parseSchedule } = require("./src/parser");

const start = async () => {
  // await initGroupDB();могу
  const { users, groups } = await loadDB();
  const schedules = await Promise.all(
    groups.map((g) => parseSchedule(g.gp_name, g.gp_id))
  );

  const tempUsers = {};
  createBot(users, groups, schedules, tempUsers);
};

start();
