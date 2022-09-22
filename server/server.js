//these functions will allow us to run our dependencies on our backend to help us establish a connection to out db
const express = require('express');
const app = express();
const cors =require('cors')

//express.json allows Json objetions to be posted
//expressURLencoded allows JSON objects with strings & arrays
app.use(express.json(), express.urlencoded({ extended: true}));

app.use(cors());

//line below: we're importing the routes export. // This is where we import the pirate routes function from our pirates.routes.js file
require('./routes/pirates.routes')(app);
//this will fire our mongoose.connect statement to initialize our db connection & our pirate.routes file to handle post requests
require('./config/mongoose.config');


app.listen(8000, () => (
    console.log("Listening on Port 8000")
    ))

//
