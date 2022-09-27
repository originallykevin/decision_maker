/*
 * All routes for index are defined here
 * Since this file is loaded in server.js into /index,
 *   these routes are mounted onto /index
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const db = require('../db/connection');
const express = require('express');
const router = express.Router();
const { createPollOwner, selectPollOwner, createPoll, selectPollID, createOptions, selectUrl } = require('./database');
const { nodeMailer } = require('../nodemailer');

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
  const email = req.body.email;
  const title = req.body.title;
  const options = req.body.option;

  createPollOwner(email)
    .then(() => {
      return selectPollOwner(email)
    })
    .then((response) => {
      const pollOwner = response;
      return createPoll(pollOwner, req.body)
    })
    .then(() => {
      return selectPollID(email, title)
    })
    .then((pollID) => {
      createOptions(pollID, options);
      return selectUrl(pollID)
    })
    .then((response) => {
      const url_admin = response.url_admin;
      const url_voter = response.url_voter;
      const subject = `Your poll has been created!`;
      const body = `Your poll "${title}" has been created.<br>
                    Share this link for people to vote: ${url_voter} <br>
                    Visit this link to view the results: ${url_admin}`;
      nodeMailer(email, subject, body); //sends email
      res.status(200).send(response);
    })
});

module.exports = router;
