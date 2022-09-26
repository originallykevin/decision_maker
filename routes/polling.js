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
      console.log(response.rows);
      response.rows.forEach(option => {
        options.push(option.name);
        optionID.push(option.id);
      });
      const title = response.rows[0].title;
      const description = response.rows[0].description;

      let templateVars = { title, description, options, optionID };
      // console.log(templateVars)
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

});


module.exports = router;
