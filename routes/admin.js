const express = require('express');
const router  = express.Router();
const { getPollInformation, getOptionsAndPoints } = require("../db/queries/admin");

//renders admin page which contains poll results
router.get('/:id', (req, res) => {
  const id = req.params.id
  let title = ''; //declaring outside of query to allow us to access them for templateVars
  let description = '';

  //retrieving poll information then the options and points
  getPollInformation(id)
    .then((response) => {
      const pollID = response.rows[0].id;
      title = response.rows[0].title;
      description = response.rows[0].description;
      return getOptionsAndPoints(pollID);
    })
    .then((response) => {
      const options = response.rows;
      const templateVars = { title, description, options}
      res.render('admin', templateVars)
    })
});

module.exports = router;
