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

router.post('/vote', (req, res) => {
  // console.log('req.body', req.body);
  const optionsArr = req.body.optionsArr;
  // console.log('borderCount', bordaCount(optionsArr))
  const count = bordaCount(optionsArr);
  const queryString = `UPDATE options SET points = points + $1 WHERE options.id = $2`;
  for(let option in count) {
    const values = [count[option], option];
    // console.log('values:', values)
    db.query(queryString, values);
  }
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
