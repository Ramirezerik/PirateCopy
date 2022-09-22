const mongoose = require('mongoose');
//this file configures our connection to the mongoDB named PirateCrewCopy 

const dbName="PirateCrewCopy";

mongoose.connect(`mongodb://localhost/${dbName}`, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(()=> console.log(`Established a connection to the ${dbName} database`))
.catch((err) => console.log("Something went wrong when connecting to database", err))

//
