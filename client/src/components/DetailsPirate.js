import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';



const PirateDetails = (props) => {
    const {id} = props;
    // const [pirates, setPirates] = useState({});
    const [pirate, setPirate] = useState({});

    useEffect(()=> {
        axios.get(`http://localhost:8000/api/pirates/${id}`)
            .then((response)=> {
                console.log(response);
                console.log(response.data);
                setPirate(response.data);
            })
            .catch((err)=> {
                console.log(err)
            })
    }, [id]);

    //our deletehandler function will go here


    return(
        <div>
            <div className="navBar">
                <h1>{pirate.name}</h1>
                <Link to="/" class="btn btn-danger" >Crew Board</Link>
            </div>
            <div className="body">
                <div>
                    <img className="Pirate-Image" src={pirate.imageURL} alt="Picture of Pirate" />
                    <h1>
                        {pirate.catchPhrase} 
                    </h1>
                </div>
                <div className="Pirate-Bio">
                    <h2>About</h2>
                    <hr />
                    <h4> Crew Position: </h4>
                    <h5> {pirate.crewPosition} </h5>
                    <h4>Treasures:</h4>
                        <h5>{pirate.treasureChests} </h5>
                    <h4>Peg Leg: {pirate.pegLeg ? <h5>Yes</h5> : <h5>No</h5> } </h4>
                    <h4>EyePatch: {pirate.eyePatch ? <h5>Yes</h5> : <h5>No</h5> } </h4>
                    <h4>Hook Hand: {pirate.hookHand ? <h5>Yes</h5> : <h5>No</h5> } </h4>
                </div>
            </div>
        </div>
    );
};




export default PirateDetails;

// encountered issue with route on our URL has ID as undefined.
//need to trouble shoot. left off on page 31 code block 5
//possible issue: button in AllPirates.js redirecting to a wrong path? may need to copy exact return for button to work. 
//future note: button in AllPiates.js was the issue and the solution. "":id" should have been ":_id" 