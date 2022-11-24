const axios = require("axios");

const findUserInDB = async (chatId) => {
  console.log("Finding user in database...");
  const res = await axios.get(`${process.env.DB_PATH}/users/?chatId=${chatId}`);
  console.log("Find user in database...");
  return res.data[0];
};

const removeFromUserDB = async (chatId) => {
  console.log("Removing users from database...");
  const res = await axios.delete(`${process.env.DB_PATH}/users/${chatId}`);
  console.log("Successfully removed users from database");
  return res.data;
};

const addToUserDB = async (chatId, gp_name, timeRemind) => {
  const user = await findUserInDB(chatId);
  if (user) {
    await removeFromUserDB(user.id);
  }

  console.log("Adding users to database...");
  const res = await axios.post(`${process.env.DB_PATH}/users`, {
    chatId,
    gp_name,
    timeRemind,
  });
  console.log("Successfully added users to database");
  return res.data;
};

module.exports = { addToUserDB, removeFromUserDB, findUserInDB };
