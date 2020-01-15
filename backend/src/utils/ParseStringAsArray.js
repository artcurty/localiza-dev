module.exports = queryToArray = data => {
  return data.split(",").map(tech => tech.trim());
};
