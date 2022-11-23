const axios = require("axios");
var FormData = require("form-data");
const secureFetch = require("../utils/SecureFetch");

/**
 * Parse HTML
 * @param {string} gp_name group name
 * @param {string} gp_id group id
 * @returns string of html code
 */
const fetchSchedule = async (gp_name, gp_id) => {
  console.log(`Start fetching ${gp_name}...`);
  const tab_id = 7;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const res = await axios.post(
      "https://www.madi.ru/tplan/tasks/tableFiller.php",
      { tab: tab_id, gp_name, gp_id },
      config
    );
    console.log("Page fetched successfully!");
    return res.data;
  } catch (e) {
    console.error(e);
    console.error(gp_name + " " + gp_id + ": " + e.message);
    throw e;
  }
};

const parserSchedule = async (gp_name, gp_id) => {
  let res = null;
  try {
    res = await secureFetch(async () => fetchSchedule(gp_name, gp_id), 3);
  } catch (e) {
    console.error(e);
    console.error(gp_name + " " + gp_id + ": " + e.message);
    throw e;
  }

  const data = res
    .slice(res.indexOf("timetable") + 11, res.indexOf("print_btn") - 15)
    .replace(/<?td[^>]*>|<?tr>|<?b>/g, "\n")
    .replace(/[\r\n\t\f\v]+/g, "\n")
    .replace(/<?th[^>]*>/g, "\n")
    .replace(/<\//g, "")
    .trim();

  const ddata = data
    .replace(
      /Время занятий|Наименование дисциплины|Вид занятий|Периодичность занятий|Аудитория|Преподаватель/g,
      " "
    )
    .split("\n");
  if (
    ddata[0] ===
    "по данным атрибутам информация не найдена. Пожалуйста, укажите"
  ) {
    console.log(gp_id);
    return null;
  }
  const days = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Полнодневные занятия",
  ];
  const result = {};
  let currentDay = null;
  let time = null;
  let lesson = null;
  let lessonType = null;
  let period = null;
  let auditor = null;
  let teacher = null;

  for (let i = 0, ddataLen = ddata.length; i < ddataLen; ) {
    if (ddata[i] === "Полнодневные занятия") break;
    if (days.includes(ddata[i])) {
      currentDay = ddata[i++].trim();
    } else {
      currentDay = "Понедельник";
    }
    result[currentDay] = [];

    while (!ddata[i].trim()) {
      i++;
    }

    while (!days.includes(ddata[i])) {
      if (ddata[i].match(/\d\d:\d\d - \d\d:\d\d/)) {
        time = ddata[i];
        lesson = ddata[++i];
        lessonType = ddata[++i];
        period = ddata[++i];
        if (ddata[++i].trim().length !== 0) {
          auditor = ddata[i];
          if (ddata[++i].trim().length !== 0) teacher = ddata[i];
        }

        result[currentDay].push({
          time,
          lesson,
          lessonType,
          period,
          auditor,
          teacher,
        });
        time = lesson = lessonType = period = auditor = teacher = null;
      }
      i++;
    }
  }
  return result;
};

module.exports = parserSchedule;
