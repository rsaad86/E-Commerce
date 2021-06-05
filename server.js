//Import express and our sequelize connection as well as the routes for our server to utilize
const express = require("express");
const routes = require("./Develop/routes");
const sequelize = require("./Develop/config/connection");

//Instantiate our server and define a port to use for the connection
const app = express();
const PORT = process.env.PORT || 3001;

//Middleware for receiving body objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware for the app's routes
app.use(routes);

//Sync sequelize models with the connection to our local database
//**IMPORTANT** change force: false to true if you changes are made to the models
sequelize.sync({ force: false }).then(() => {
  //Establish our express server connection
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
