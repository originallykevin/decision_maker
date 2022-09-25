/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { generateRandomString } = require('../helpers');


// router.get('/:id', (req, res) => {
//   res.render('index');
// });

router.get('/:id', (req, res) => {
  console.log('Link created')
  res.status(200).send({resultLink : 'http://www.reddit.com', pollLink : 'link'});
})

router.post('/email', (req, res) => {
  // SQL QUERY
  console.log("Post recieved");
  res.status(200).send('Post received');
});

router.post('/form')

module.exports = router;

