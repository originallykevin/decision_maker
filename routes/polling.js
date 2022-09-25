/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/:id', (req, res) => {
  const id = req.params.id
  const options = [];

  db.query(`SELECT polls.title, polls.description, options.name FROM polls JOIN options ON polls.id = options.poll_id WHERE polls.url_voter LIKE '%${id}'`)
    .then((response) => {
      response.rows.forEach(option => {
        options.push(option.name);
      });
      const title = response.rows[0].title;
      const description = response.rows[0].description;
      let templateVars = { title, description, options}
      res.render('poll', templateVars)

    })
});

module.exports = router;
