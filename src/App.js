import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react';
import Navigation from './components/Navigation';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <header>
        <h1>Exercise Tracker</h1>
        <p>Enter or edit exercises below. All data entered will be stored in a database.</p>
      </header>
      <Router>
        <Navigation></Navigation>
        <div className="App-header">
          <Routes>
              <Route path="/" element={<HomePage setExerciseToEdit = {setExerciseToEdit}/>}/>
              <Route path="/add-exercise" element={<CreateExercisePage />}/>
              <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit={exerciseToEdit}/>}/>
          </Routes>
        </div>
      </Router>
      <footer>© 2024 Michael Mclean</footer>
    
    </div>
  );
}

export default App;