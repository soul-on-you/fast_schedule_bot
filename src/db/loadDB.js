const axios = require("axios");

const loadUserDB = async () => {
  console.log("Loading user database...");
  const db = await axios.get(`${process.env.DB_PATH}/users`);
  console.log(db.data);
  console.log("User database loaded!");
  return db.data;
};

const loadGroupDB = async () => {
  console.log("Loading group database...");
  const db = await axios.get(`${process.env.DB_PATH}/groups`);
  console.log(db.data);
  console.log("Group database loaded!");
  return db.data;
};

const loadDB = async () => {
  const users = loadUserDB();
  const groups = loadGroupDB();

  const res = await Promise.all([users, groups]);
  return {
    users: res[0].reduce((acc, user) => {
      acc[user.chatId] = {
        gp_name: user.gp_name,
        timeRemind: user.timeRemind,
        id: user.id,
      };
      return acc;
    }, {}),
    groups: res[1],
  };
};

module.exports = { loadDB };
