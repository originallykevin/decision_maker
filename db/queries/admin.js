const db = require('../connection');

const getPollInformation = function(urlID) {
  const queryString = `SELECT polls.title, polls.description, polls.id FROM polls WHERE polls.url_admin LIKE $1;`
  const values = [`%${urlID}`];
  return db.query(queryString, values);
}

const getOptionsAndPoints = function(pollID) {
  const queryString = `SELECT name, points FROM options WHERE poll_id = $1 ORDER BY points DESC`;
  const values = [pollID];
  return db.query(queryString, values);
}

module.exports = { getPollInformation, getOptionsAndPoints };
