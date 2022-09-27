import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';


const crewPositionOptions = ["Capitan", "First Mate", "Quater Master", "Boastswain", "Powder Monkey"];

const EditPirate= (props) => {
    const {id} = props;
    const [updateName, setUpdateName] = useState("");
    const [updateCrewPos, setUpdateCrewPos] = useState("");
    const [updateImageURL, setUpdateImageURL]=useState("");
    const [updateTreasure, setUpdateTreasure] = useState("");
    const [updatePhrase, setUpdatePhrase]= useState("");
    const [updateLeg, setUpdateLeg]= useState(true);
    const [updateEye, setUpdateEye]= useState(true);
    const [updateHand, setUpdateHand]= useState(true);

    //We are making a request to our server to get the pirate(id) identical to that in the URL.
    //our get request sets our states to the response values. 
    //Prepopulate inputs w/ exisiting user data. 
    useEffect(()=> {
        axios.get(`http://localhost:8000/api/pirates/${id}`)
        .then((response)=> {
            console.log(response.data);
            setUpdateName(response.data.name);
            setUpdateCrewPos(response.data.crewPosition);
            setUpdateImageURL(response.data.imageURL);
            setUpdateTreasure(response.data.treasureChests);
            setUpdatePhrase(response.data.catchPhrase);
            setUpdateLeg(response.data.pegLeg);
            setUpdateEye(response.data.eyePatch);
            setUpdateHand(response.data.hookHand);
        })
        .catch((err)=> {
            console.log(err);
            navigate('/error');
        })
    }, [id]);


    //using useEffect, we have existing data that we can update/change
    //our put request below will allow us to replace the existing data
    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/pirates/${id}`, {
            name: updateName,
            crewPosition: updateCrewPos,
            imageURL: updateImageURL,
            treasureChests: updateTreasure,
            catchPhrase: updatePhrase,
            pegLeg: updateLeg,
            eyePatch: updateEye,
            hookHand: updateHand
        })
        .then((response)=> {
            console.log(response.data);
            navigate('/'); //this will redirect us back to the home page 
        })
        .catch ((err)=> {
            console.log(err.response)
        });
    };
    return(
        <div>
            <div className="navBar">
                <h1>Edit {id.name}</h1>
                <Link to="/" className="btn btn-danger" >Crew Board</Link>
            </div>
            <div className="editBody">
                <form onSubmit={onSubmitHandler}>

                    <div class="form-group">
                        <label> Name:</label> 
                        <input 
                        type="text" 
                        onChange={(e)=> setUpdateName(e.target.value)}
                        value={updateName}
                        />
                    </div>
                    <br />
                    
                    <div class="form-group">
                        <label>Crew Position:</label>
                        <select 
                        onChange={(e)=> setUpdateCrewPos(e.target.value)}
                        value={updateCrewPos}>
                            <option value="Capitan">Capitan</option>
                            <option value="First Mate">First Mate</option>
                            <option value="Quater Master" >Quarter Master</option>
                            <option value="Boatswain">Boatswain</option>
                            <option value="Powder Monkey">Powder Monkey</option>
                        </select>
                    </div>
                    <br />

                    <div class="form-group">
                        <label>Image URL:</label>
                        <input 
                            type="text" 
                            onChange={(e)=> setUpdateImageURL(e.target.value)}
                            value={updateImageURL}
                            />
                    </div>
                    <br />


                    <label># Treasure Chests:</label>
                    <select
                    onChange={(e)=>setUpdateTreasure(e.target.value)}
                    value={updateTreasure}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <br />

                    <div class="form-group">
                        <label>Catch Phrase:</label>
                        <input 
                        type="text" 
                        onChange={(e)=> setUpdatePhrase(e.target.value)}
                        value={updatePhrase}
                        />
                    </div>

                    {/* <div class="form-group">
                        <label>Peg Leg:</label>
                        <input 
                        type="checkbox" 
                        onChange={(e)=> setUpdateLeg(e.target.value)}
                        value={updateLeg}
                        
                        />
                    </div> */}



                    <br />
                    <br />
                    <br />
                    <button class="btn btn-warning">
                        Update Pirate
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditPirate;


//need to format form
//configure boleans so that they can be edited.
