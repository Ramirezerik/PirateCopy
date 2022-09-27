import React, { useState, useEffect } from 'react';
// axios dependecy is a library so we can ealsiy make request to our backend.
import axios from 'axios';
import { Link, navigate } from '@reach/router';


const AllPirates = (props) => {

    const {id} = props;
    const [pirates, setPirates] = useState({});
    const [pirateList, setPirateList] = useState([]);

    //using useEffect to make our GET request using axios. When this component renders, our useEffect will fire of making our req to our API to get every doc in our pirates collection. 
    useEffect(()=> {
        axios.get('http://localhost:8000/api/pirates')
        .then((response)=> {
            console.log(response);
            console.log(response.data);
            setPirateList(response.data);
        })
        .catch((err)=> {
            console.log(err)
        })
    }, [])

    //We are sending a req to our API to delete our pirate
    //and removing from our document object model (DOM) UI
    const deleteHandler = (id, index) => {
        console.log("handle delete", id);
        axios.delete(`http://localhost:8000/api/pirates/${id}`)
            .then((response)=> {
                console.log(response);
                const piratesCopy = [...pirates];
                const filteredArr = piratesCopy.filter(
                    (pirate, index) => index !== index
                );
                setPirates(filteredArr);
                navigate="/"
            })
            .catch((err)=> console.log(err));
    };

    return(
        <div>
            <div className="navBar">
                <h1>Add a Pirate to the Crew</h1>
                <Link to="/new" class="btn btn-primary" >Add Pirate</Link>
            </div>
            <div className="body">
                <table>
                    <thead>
                        <tr>
                        </tr>
                    </thead>
                    <tbody className="profile">
                        {
                            pirateList?
                            pirateList.map((pirate, index)=> (
                                <tr key={index} className="profile">
                                    <td>
                                        <img className="table-image" src={pirate.imageURL} alt="Pirate Image" />
                                        
                                    </td>
                                    <td>
                                        <p className="pirate-name">
                                        {pirate.name}
                                        </p>
                                    </td>
                                    <td>
                                        <button onClick={()=>{navigate(`/details/${pirate._id}`)}} class="btn btn-info" >View Pirate</button>
                                    </td>
                                    <td>
                                        <button onClick={()=>{navigate(`/edit/${pirate._id}`)}} class="btn btn-warning">Edit Pirate</button>
                                    </td>
                                    <td>
                                        <button onClick={()=> deleteHandler(pirate._id, index)} class="btn btn-danger">Walk the Plank</button>
                                    </td>
                                </tr>
                            ))
                        :null
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllPirates;

//