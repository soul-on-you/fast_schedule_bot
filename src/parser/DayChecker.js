const DayChecker = () => {
  const date = new Date();

  if (date.getHours() >= 12) {
    date.setDate(date.getDate() + 1);
  }

  // console.log(date.toString().slice(0, 3));

  const DAYS = {
    Mon: "Понедельник",
    Tue: "Вторник",
    Wed: "Среда",
    Thu: "Четверг",
    Fri: "Пятница",
    Sat: "Суббота",
  };

  // console.log(DAYS[date.toString().slice(0, 3)]);

  return DAYS[date.toString().slice(0, 3)];
};

module.exports = DayChecker;

DayChecker();