import React from 'react';
import {Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav className="App-nav">
            <Link to="/">Home</Link>
            <br/>
            <Link to="/add-exercise">Add an exercise</Link>
            
        </nav>
    );
  }
  

export default Navigation;