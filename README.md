Decision Maker
=========

## Project Details

Decision Maker is a full stack web application that was built for our midterm project at Lighthouse Labs in a collaborative environment. It allows a user to create a questionnaire that helps groups of friends to vote on a preferred choice (using [Borda Count](https://en.wikipedia.org/wiki/Borda_count) method). For example: "What is your favourite vegetable?".

This project was designed by [Cindy Chen](https://github.com/cindyc0106), [Spencer Bethel](https://github.com/sb242) and [Kevin Ly](https://github.com/originallykevin).

  - Front-end was built using Javascript, Bootstrap, jQuery, SASS and HTML.
  - Back-end was built using Node.js, PostgreSQL, Express and EJS.
  - Nodemailer API was our choice for easy email sending.


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
  - NM_USER: Your email address
  - NM_PASS: Your email password
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Final Product

#### Creating a poll

!["Creating a poll"](https://github.com/originallykevin/decision_maker/blob/master/public/image/creating-poll.gif)

#### Copying the links

!["Copying the links"](https://github.com/originallykevin/decision_maker/blob/master/public/image/link-coping.gif)

#### Submitting a poll

!["Submitting a poll"](https://github.com/originallykevin/decision_maker/blob/master/public/image/submitting-poll.gif)

#### Checking the poll statistics

!["Checking the poll statistics"](https://github.com/originallykevin/decision_maker/blob/master/public/image/poll-stats.gif)

#### Mobile view

!["Mobile view"](https://github.com/originallykevin/decision_maker/blob/master/public/image/poll-stats-mobile.gif)


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Express
- Morgan
- Chalk
- dotenv
- EJS
- NodeMailer
- SASS
- Sortablejs
- Nodemon
