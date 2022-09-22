//we are creating out customer relationship Mgt (CRM software by making a new model names Pirates
const mongoose = require('mongoose');
// The database schema is the structure of a database described in a formal language supported by the database management system. The term "schema" refers to the organization of data as a blueprint of how the database is constructed
const PirateSchema = new mongoose.Schema({

    name: {
        type: String, 
        required: [true, "Name is required!"],
        minlength:[3, "Pirate name must be at least 3 characters long!"]
    }, 
    crewPosition: {
        type: String, 
        required: [true, "crew position is required!"],
        //enum keyword is used to restrict a value to a fixed set of values. It must be an array with at least one element, where each element is unique
        enum: ["Capitan", "First Mate", "Quarter Master", "Boatswain", "Powder Monkey"]
    },
    imageURL: {
        type: String,
        required: [true, "Pirate image URL is required!"]
    },
    treasureChests: {
        type: String,
        required:[true, "# of treasure chests are required!"],
        enum: ["0", "1", "2", "3"]
    },
    catchPhrase: {
        type: String, 
        required: [true, "A catchphrase is required for each pirate!"],
        minlength:[2, "A minumum of 2 characters are required for a catchphrase!"]
    },
    pegLeg: {
        type: Boolean, 
        default: true, 
        required: [true, "Does pirate have a pegleg is required!"]
    },
    eyePatch: {
        type: Boolean,
        default: true, 
        required:[true, "Does pirate have an eyepatch is required!"]
    },
    hookhand: {
        type: Boolean, 
        default: true, 
        required: [true, "Does pirate have a hookhand is required!"]
    }
},
    { timestamps: true }
)
const Pirate = mongoose.model("Pirate", PirateSchema);

module.exports = Pirate;

//