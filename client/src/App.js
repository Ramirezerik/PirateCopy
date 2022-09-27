import './App.css';
import React from 'react';
import axios from 'axios';
import {Router} from '@reach/router';
import AllPirates from './components/AllPirates';
import NewPirate from './components/NewPirate';
import PirateDetails from './components/DetailsPirate';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditPirate from './components/EditPirate';

function App() {
  return (
    <div className="App">
      <Router>
        <AllPirates path="/" />
        <NewPirate path="/new" />
        <PirateDetails path="/details/:id" />
        <EditPirate path="/edit/:id" />
      </Router>

    </div>
  );
}

export default App;

// 
