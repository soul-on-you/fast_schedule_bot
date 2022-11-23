const axios = require("axios");
var FormData = require("form-data");

const parseGroups = async () => {
  console.log("Fetch groups from www.madi.ru/tplan/...");

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const res = await axios.get(
    "https://www.madi.ru/tplan/tasks/task3,7_fastview.php",
    { step_no: 1, task_id: 7 },
    config
  );

  console.log("Fetching finished!");

  console.log("Parsing group data...");
  const data = res.data
    .slice(res.data.indexOf("<ul>") + 4, res.data.indexOf("</ul>") - 5)
    .replace(/<?li[^\w]|value=|"|\s+/g, "")
    .replace(/<\//g, "\n")
    .replace(/>/g, " ");

  const result = data.split("\n").map((line) => {
    const cur = line.trim().split(" ");
    return { gp_id: cur[0], gp_name: cur[1] };
  });
  console.log("Parsing finished!");
  return result;
};
module.exports = parseGroups;
