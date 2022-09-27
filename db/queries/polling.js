const db = require('../connection');

const emailVoteConfirmation = function(url) {
  const queryString = `SELECT poll_owners.email, polls.title, polls.url_admin FROM poll_owners JOIN polls ON polls.owner_id = poll_owners.id WHERE polls.url_voter LIKE '%${url}'`;
  const values = [];
  return db.query(queryString, values);
}

module.exports = { emailVoteConfirmation };
