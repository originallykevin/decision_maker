/*
 * All routes for index are defined here
 * Since this file is loaded in server.js into /index,
 *   these routes are mounted onto /index
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { generateRandomString } = require('../helpers');

router.get('/', (req, res) => {
  res.render('index');
});


router.post('/email', (req, res) => {
  // SQL QUERY
  console.log(req.body);
  console.log('Email received');
  res.status(200).send();
});

router.post('/form', (req, res) => {
  console.log(req.body);
  console.log('Form data recieved');
  res.status(200).send();
});

module.exports = router;
