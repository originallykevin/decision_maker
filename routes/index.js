/*
 * All routes for index are defined here
 * Since this file is loaded in server.js into /index,
 *   these routes are mounted onto /index
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const db = require('../db/connection');
const express = require('express');
const router = express.Router();
const { generateRandomString } = require('../helpers');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/email', (req, res) => {
  const queryString = `INSERT INTO poll_owners (email) VALUES ($1)`;
  const values = [req.body.email];
  return db.query(queryString, values)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log("Error:", err.message);
    })
});

router.post('/form', (req, res) => {
  // const { title, description, name } =
  const title = req.body.title;
  const description = req.body.description;
  const queryParams = [];
  const url_admin = createURL();
  const url_voter = createURL();
  const queryString = `INSERT INTO polls (owner_id, title, description, url_admin, url_voter)
                        VALUES ($1, $2, $3, $4, $5)`;
  res.status(200).send();
});

module.exports = router;

// const options = req.body.options;
// const optionQueryString = `INSERT INTO options (poll_id, name, points) VALUES ($1, $2, 0)`;
// options.forEach(option => {
//   const values = [option];
//   db.query(optionQueryString, values);
// });

const createURL = function () {
  const randomString = generateRandomString();
  const url = `http://localhost:8080/polling/${randomString}`;
  return url;
};
