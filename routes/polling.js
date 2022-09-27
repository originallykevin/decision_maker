/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');

const { createVoter } = require('./database');
const { emailVoteConfirmation } = require('../db/queries/polling');
const { nodeMailer } = require('../nodemailer');

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const options = [];
  const optionID = [];

  db.query(`SELECT polls.title, polls.description, options.id, options.name FROM polls JOIN options ON polls.id = options.poll_id WHERE polls.url_voter LIKE '%${id}'`)
    .then((response) => {

      response.rows.forEach(option => {
        options.push( { name: option.name, id: option.id } );
        optionID.push(option.id);
      });
      console.log(response.rows);
      const title = response.rows[0].title;
      const description = response.rows[0].description;

      let templateVars = { title, description, options, optionID };

      res.render('poll', templateVars);
    })

});

router.post('/voter', (req, res) => {
  const voterName = req.body.name;
  createVoter(voterName)
    .then((response) => {
      res.status(200).send(response);
    });

});

router.post('/:id', (req, res) => {
  const optionsArr = req.body.optionsArr;
  const urlID = req.params.id;
  const count = bordaCount(optionsArr);
  const queryString = `UPDATE options SET points = points + $1 WHERE options.id = $2`;
  for(let option in count) {
    const values = [count[option], option];
    db.query(queryString, values);
  }

  emailVoteConfirmation(urlID)
    .then((response) => {
      const title = response.rows[0].title;
      const email = response.rows[0].email;
      const url_admin = response.rows[0].url_admin;
      const subject = `Somone has voted in a poll you own named ${title}`;
      const body = `Somone has voted in a poll you own: "${title}".<br>
                    Please visit this link to view the results: ${url_admin}`;
      nodeMailer(email, subject, body);
    })
  res.status(200).send();
});

const bordaCount = function(optionsArr) {
  const optionsAndPoints = {};
  for(let i = 0; i < optionsArr.length; i++) {
    const points = optionsArr.length - (i + 1);
    optionsAndPoints[optionsArr[i]] = points;
  }
  return optionsAndPoints;
}

module.exports = router;
