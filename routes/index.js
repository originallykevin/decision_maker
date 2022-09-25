/*
 * All routes for index are defined here
 * Since this file is loaded in server.js into /index,
 *   these routes are mounted onto /index
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const { createPollOwner, selectPollOwner, createPoll, selectPollID, createOptions } = require('./database');
const db = require('../db/connection');
const express = require('express');
const router = express.Router();
const { generateRandomString } = require('../helpers');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/email', (req, res) => {
  const ownersQueryString = `INSERT INTO poll_owners (email) VALUES ($1)`;
  const ownersValues = [req.body.email];
  return db.query(queryString, values)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log("Error:", err.message);
    })
});

router.post('/form', (req, res) => {
  //poll owners insert query
  const email = req.body.email;
  const title = req.body.title;
  const options = req.body.option;
  createPollOwner(email)
    .then(() => {
      selectPollOwner(email).then((response) => {
        const pollOwner = response;
        createPoll(pollOwner, req.body)
        .then(() => {
          selectPollID(email, title)
          .then((pollID) => {
            createOptions(pollID, options)
          })
        })
      })
    })
  res.status(200).send();
});

module.exports = router;

const createURL = function () {
  const randomString = generateRandomString();
  const url = `http://localhost:8080/polling/${randomString}`;
  return url;
};
