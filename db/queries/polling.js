const db = require('../connection');

const getPollInformation = function(urlID) {

  const queryString = `SELECT polls.title, polls.description, options.id, options.name FROM polls JOIN options ON polls.id = options.poll_id WHERE polls.url_voter LIKE $1`;
  const values = [`%${urlID}`];
  return db.query(queryString, values);
}

const createVoter = function(name) {
  const queryString = `INSERT INTO votes (voter_name) VALUES ($1)`
  const values = [name];
  return db.query(queryString, values);
}

const emailVoteConfirmation = function(url) {
  const queryString = `SELECT poll_owners.email, polls.title, polls.url_admin FROM poll_owners JOIN polls ON polls.owner_id = poll_owners.id WHERE polls.url_voter LIKE '%${url}'`;
  const values = [];
  return db.query(queryString, values);
}

const updateCount = function(options) {
  const queryString = `UPDATE options SET points = points + $1 WHERE options.id = $2`;
  for (let option in options) {
    const values = [options[option], option];
    db.query(queryString, values);
  }
}

module.exports = { getPollInformation, createVoter, emailVoteConfirmation, updateCount };
