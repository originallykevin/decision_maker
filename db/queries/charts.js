const db = require('../connection');

const getPieChartData = function(urlID) {
  const queryString = `SELECT options.name, options.points FROM options JOIN polls ON options.poll_id = polls.id WHERE polls.url_admin LIKE $1`;
  const values = [`%${urlID}`];
  return db.query(queryString, values)
    .then((response) => {
      return response.rows;
    })
};

module.exports = { getPieChartData };
