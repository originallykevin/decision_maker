const db = require('../db/connection');
const { generateRandomString } = require('../helpers');

const createPollOwner = function (email) {
  const queryString = `INSERT INTO poll_owners (email) VALUES ($1)`
  const values = [email];
  return db.query(queryString, values);
}

const selectPollOwner = function (email) {
  const queryString = `SELECT poll_owners.id as owner_id FROM poll_owners WHERE $1 = poll_owners.email`
  const values = [email];
  return db.query(queryString, values)
    .then((response) => {
      return response.rows[0].owner_id;
    });
}

const createPoll = function (ownerID, reqBody) {
  const { title, description } = reqBody
  const url_admin = createURL();
  const url_voter = createURL();
  const queryString = `INSERT INTO polls (owner_id, title, description, url_admin, url_voter) VALUES ($1, $2, $3, $4, $5)`
  const values = [ownerID, title, description, url_admin, url_voter]
  return db.query(queryString, values);
}

const selectPollID = function (email, title) {
  const queryString = `SELECT polls.id as poll_id FROM polls JOIN poll_owners ON owner_id = poll_owners.id WHERE $1 = poll_owners.email AND $2 = polls.title`
  const values = [email, title];
  return db.query(queryString, values)
    .then((response) => {
      return response.rows[0].poll_id;
    });
}

const createOptions = function (pollID, options) {
  const optionQueryString = `INSERT INTO options (poll_id, name, points) VALUES ($1, $2, 0)`;
  options.forEach(name => {
    const values = [pollID, name];
    return db.query(optionQueryString, values);
  });
};

const createURL = function () {
  const randomString = generateRandomString();
  const url = `http://localhost:8080/polling/${randomString}`;
  return url;
};

const selectUrl = function(pollID) {
  const queryString = `SELECT url_admin, url_voter FROM polls WHERE $1 = polls.id`
  const values = [pollID]
  return db.query(queryString, values)
  .then((response) => {
    return response.rows[0]
  })
};

module.exports = { createPollOwner, selectPollOwner, createPoll, selectPollID, createOptions, selectUrl};
