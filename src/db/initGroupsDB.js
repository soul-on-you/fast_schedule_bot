const { parseGroups } = require("../parser");
const axios = require("axios");

const initGroupDB = async () => {
  console.log("Initializing group database...");

  const result = await parseGroups();

  console.log("Cleaning groups database...");
  const dbGroup = await axios.get(`${process.env.DB_PATH}/groups`);
  await Promise.all(
    dbGroup.data.map((g) =>
      axios.delete(`${process.env.DB_PATH}/groups/${g.id}`)
    )
  );
  console.log("Cleaning finished!");

  console.log("Filling groups database...");
  await Promise.all(
    result.map((group) => axios.post(`${process.env.DB_PATH}/groups`, group))
  );
  console.log("Group database filled!");
};

module.exports = { initGroupDB };
