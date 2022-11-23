const validateGroup = (groups, userInput) => {
  //   const catalog = groups.map((group) => group.gp_name.toUpperCase());
  //   if(catalog.includes(userInput.toUpperCase().trim()))
  //     return
  const userGroup = userInput.toUpperCase().trim();
  return groups.find((group) => group?.gp_name?.toUpperCase() === userGroup);
};

module.exports = { validateGroup };
