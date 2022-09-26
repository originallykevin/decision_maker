/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/:id', (req, res) => {
  const id = req.params.id
  const options = [];
  let title = '';
  let description = '';

  db.query(`SELECT polls.title, polls.description, polls.id FROM polls WHERE polls.url_admin LIKE '%${id}';`)
    .then((response) => {
      const pollID = response.rows[0].id;
      title = response.rows[0].title;
      description = response.rows[0].description;

      const queryString = `SELECT name, points FROM options WHERE poll_id = $1 ORDER BY points DESC`;
      const values = [pollID];
      return db.query(queryString, values);
    })
    .then((response) => {
      const options = response.rows;
      const templateVars = { title, description, options}
      res.render('admin', templateVars)
    })
});

module.exports = router;
