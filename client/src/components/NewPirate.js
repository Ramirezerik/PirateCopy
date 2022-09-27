import React, { useState } from 'react';
import axios from 'axios';
import { Link, navigate} from "@reach/router";
import "../App.css";



//for booleans, we will be creating a function with predesignated strings/selection of choices to chose from
const crewPositionOptions = ["Capitan", "First Mate", "Quarter Master", "Boatswain", "Powder Monkey"];
const numOfTreasureChests = ["0", "1", "2", "3"];

const NewPirate = (props)=> {
    const [errors, setErrors] = useState({});
    // const [pirates, setPirates] = props;
    const [name, setName] = useState("");
    const [crewPosition, setCrewPosition] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [treasureChests, setTreasureChests] = useState("");
    const [catchPhrase, setCatchPhrase] = useState("");
    const [pegLeg, setPegLeg] = useState(true);
    const [eyePatch, setEyePatch] = useState(true);
    const [hookHand, setHookHand] = useState(true);

    const newSubmitHandler = (e) => {
        //this function prevents default behavior of our app
        e.preventDefault();
        axios.post('http://localhost:8000/api/pirates', {
            name,
            crewPosition,
            imageURL,
            treasureChests,
            catchPhrase,
            pegLeg,
            eyePatch,
            hookHand,
        })
        .then((response)=> {
            console.log(response.data);// console log tracks our data
            //updating lifted state of our pirates array to include CURRENT value in state + new object created/returned from our post req.
            navigate('/');
            //installed @reach/router dependecy in our server
        })
        .catch((err)=> {
            console.log(err.response); //tracks our data
            setErrors(err.response.data.errors)
        });
    };

    return(
        <div>
            <div className="navBar">
                <h1>Add Pirate to Crew</h1>
                <Link to="/" class="btn btn-primary" >Crew Board</Link>
            </div>
            <div className="body">
                <form onSubmit={newSubmitHandler}>
                    <p>
                        Pirate Name:
                        <input 
                        type="text" 
                        onChange={(e)=>setName(e.target.value)}
                        value={name}
                        />
                    </p>
                    <p>
                        Crew Position:
                        <select 
                        onChange={(e)=>setCrewPosition(e.target.value)}
                        value={crewPosition}>
                            <option>      </option>
                            <option value="Capitan">Capitan</option>
                            <option value="First Mate">First Mate</option>
                            <option value="Quarter Master">Quarter Master</option>
                            <option value="Boatswain">Boatswain</option>
                            <option value="Powder Monkey">Powder Monkey</option>
                        </select>
                    </p>
                    <p>
                        Image URL:
                        <input 
                        type="text" 
                        onChange={(e)=>setImageURL(e.target.value)}
                        value={imageURL}
                        />
                    </p>
                    <p>
                        # of Treasure Chests:
                        <select 
                        onChange={(e)=>setTreasureChests(e.target.value)}
                        value={treasureChests}>
                            <option>      </option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </p>
                    <p>
                        Pirate's Catch Phrase:
                        <input 
                        type="text" 
                        onChange={(e)=>setCatchPhrase(e.target.value)}
                        value={catchPhrase}
                        />
                    </p>
                    <p>
                        Does Pirate have a peg leg?
                        <input 
                        type="checkbox" 
                        onChange={()=>setPegLeg(!pegLeg)}
                        readOnly
                        checked={pegLeg}
                        />
                    </p>
                    <p>
                        Does Pirate have an eye patch?
                        <input 
                        type="checkbox" 
                        onChange={()=> setEyePatch(!eyePatch)}
                        readOnly
                        checked={eyePatch}
                        />
                    </p>
                    <p>
                        Does Pirate have a hook for a hand?
                        <input 
                        type="checkbox" 
                        onChange={()=> setHookHand(!hookHand)}
                        readOnly
                        checked={hookHand}
                        />
                    </p>
                    <button class="btn btn-primary" >
                        Add Pirate
                    </button>
                </form>
                {errors &&
                Object.keys(errors).map((objKey, index) => (
                <p key={index} className="error-text">{errors[objKey].message}</p>
                ))}
            </div>
        </div>
    )
}

export default NewPirate;
