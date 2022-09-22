// const { request, response } = require("express");

const { findById } = require('../models/pirate.model');
const Pirate = require('../models/pirate.model');


//we are exporting a key:value pair of index:function
//this function will help us ensure that our server is conecting to our cleint
// module.exports.index = (request, response) => {
//     response.json({
//         message:"Hello World"
//     });
// }

module.exports= {
    //create new pirate. This mongoose create method is ran using our pirate model to add a new pirate to our db.
    //request.body will create a new pirate entry from client side.
    createPirate:(request, response) => {
        Pirate.create(request.body)
            .then((newPirate)=> {
                response.json(newPirate);
            })
            .catch((err)=> {
                console.log(err);
                response.status(400).json(err);
            })
    },
    //finds all pirates in db. Pirate.find is a mongoose method(query)
    getAllPirates:(request, response) => {
        Pirate.find({})
            .collation({locale: "en", strength: 2})
            .sort({ Name: 1})
            .then((allPirates)=> {
                response.json(allPirates);
        })
        .catch((err)=> {
            console.log(err);
            response.status(400).json(err);
        })
    },

    //finds a specific pirate. * Our params (getOnePirate) must match the variable in our route, exactly.
    //in this findById mongoose method, we are telling this method to return a document using our documents field id & specifying that this info will come from client's request.
    getOnePirate: (request, response) => {
        Pirate.findById({ _id: request.params.id })
        .then((onePirate)=> {
            response.json(onePirate);
        })
        .catch((err)=> {
            console.log(err);
            response.status(400).json(err);
        });
    },
    
    //edits an existing pirate  
    editPirate: (request, response) => {
        console.log(request.body);
        console.log(request.params);
        Pirate.findOneAndUpdate({ _id: request.params.id }, request.body, {
            new: true, 
            runValidators: false
        })
        .then((updatedPirate) => {
            console.log("SUCCESS!");
            console.log(updatedPirate);
            response.json(updatedPirate);
        })
        .catch((err)=> {
            console.log("ERROR!");
            console.log(err);
            response.status(400).json(err);
        });
    },

    //deletes an existing pirate from db
    deletePirate: (request, response) => {
        Pirate.deleteOne({_id: request.params.id})
            .then((deletedPirate)=> {
                console.log("Pirate Deleted");
                response.json(deletedPirate)
            })
            .catch((err)=>{
                console.log(err);
                response.status(400).json(err);
            })
    }
};


//
//all CRUD controllers added
