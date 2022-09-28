const { response } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../db/connection');

const { getPollInformation, createVoter, emailVoteConfirmation, updateCount } = require('../db/queries/polling'); //db queries
const { nodeMailer } = require('../lib/nodemailer'); //email sender function

//renders poll for voter to vote
router.get('/:id', (req, res) => {
  const id = req.params.id;

  //db query for information to load poll for voter
  getPollInformation(id)
    .then((response) => {
      const title = response.rows[0].title;
      const description = response.rows[0].description;
      const options = [];

      //creates an array of the queried options name and id together in an object
      response.rows.forEach(option => {
        options.push({ name: option.name, id: option.id });
      });
      const templateVars = { title, description, options };
      res.render('poll', templateVars);
    });
});

//!! Unfinished? Needs to link voter to options or poll !!
router.post('/voter', (req, res) => {
  const voterName = req.body.name;
  createVoter(voterName)
    .then((response) => {
      res.status(200).send(response);
    });
});

//where vote submission information is counted and the options updated with appopriate number of points
router.post('/:id', (req, res) => {
  const optionsArr = req.body.optionsArr; //the list of voting options in the order that they were submitted
  const urlID = req.params.id; //used in retrieving email information
  const bCountOptions = bordaCount(optionsArr); //Borda Count method used in determining number of points to give each option

  //loops through options after bordaCount has assigned points and updates the number of points for the options in the db
  updateCount(bCountOptions);

  //db query to retreive information for email function to send to poll owner that a person has voted in their poll
  emailVoteConfirmation(urlID)
    .then((response) => {
      //email variables
      const title = response.rows[0].title;
      const email = response.rows[0].email;
      const urlAdmin = response.rows[0].url_admin;
      const subject = `Someone has voted in a poll you own named ${title}`;
      const body = `Somone has voted in a poll you own: "${title}".<br>
                    Please visit this link to view the results: ${urlAdmin}`;
      nodeMailer(email, subject, body) //email sender
        .catch(console.error);
    });
  res.status(200).send();
});

//https://en.wikipedia.org/wiki/Borda_count
const bordaCount = function(optionsArr) {
  const optionsAndPoints = {};
  for (let i = 0; i < optionsArr.length; i++) { //could change this c style loop with a forEach with index?
    const points = optionsArr.length - (i + 1);
    optionsAndPoints[optionsArr[i]] = points;
  }
  return optionsAndPoints;
};

module.exports = router;
