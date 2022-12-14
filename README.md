Pokemon Ultimate Team

This project is designed to be a site that allows anyone to build a custom pokemon team of their choosing. Along with choosing any Pokemon, a custom move list can be chosen for each Pokemon with a detailed description of each move available. The main purpose of this site is that any user can open it and create a team without having to worry about logging in or signing up. However, if a user does wish to sign up they will have access to the ability to save and name any team they make and view all past teams on their dashboard.

Tech Stack

Client: React, Sass, ChartJs, Formik, Yup

Server: Node, Express, MySQL

Installation
client

    cd client
    npm install
    npm start

Create a database in MySQL and fill out .env file with relevant info

Server

    cd server
    npm install
    npm run migrate
    npm run seed
    npm start

Make sure to fill out the client side .env as well with API_URL

Screenshots
See Screenshots folder in client side

Lessons Learned

Throughout the course of this project I learned a lot about myself as a developer and my capabilities. I faced a couple major roadblocks throughout the development of this project with one of the more notable hurdles being my use of the third party PokemonAPI.

Initially I had looked through the PokemonAPI found that it contained all the information I wanted/needed to make this site. However it turned out that the way the API is organized I was being required to do a lot more calls to the API then anticipated. My solution to that was to build a function that would grab all the information I need once and seed a table with everything. This way I wouldn't be asking the browser to do hundreds of API calls on page load every time the homepage was mounted.

Next Steps

Future iterations of this site will include more information displayed on the user dashboard so that each team members moves as well as move info can be viewed, as well as a layout of the overall team stats for each user team. I would also like to be able to show individual details page for each user generated team.

I would also like to add some stat calculators that would allow a user to customize the Effort Values (EVs) and Individual Values (IVs) so that further customization for each team can be done.

A Community Page would be the final addition to the site where anyone with an account would be able to share a team that they've made for others to try out in their own games.