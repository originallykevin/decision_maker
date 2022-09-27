const db = require('../db/connection');
const express = require('express');
const router = express.Router();
const { createPollOwner, selectPollOwner, createPoll, selectPollID, createOptions, selectUrl } = require('./database'); //db query functions
const { nodeMailer } = require('../nodemailer'); //email sending function

router.get('/', (req, res) => {
  res.render('index');
});

//creating poll, owner, options in db and sending email to poll owner
router.post('/form', (req, res) => {
  const email = req.body.email;
  const title = req.body.title;
  const options = req.body.option;

  createPollOwner(email) //db query creating poll owner
    .then(() => {
      return selectPollOwner(email)
    })
    .then((response) => {
      const pollOwner = response;
      return createPoll(pollOwner, req.body) //creating poll in db
    })
    .then(() => {
      return selectPollID(email, title)
    })
    .then((pollID) => {
      createOptions(pollID, options); //creating poll options in db
      return selectUrl(pollID) //returning urls associated with created poll
    })
    .then((response) => {
      //email variables
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
