import React, { useState } from 'react'
import Notes from './components/Notes';
import './App.css';

function App() {
  const [storage, setStorage] = useState(JSON.parse(localStorage.getItem('notes')));

  const addNote = () => {
    localStorage.setItem(
      "notes",
      JSON.stringify([
        {
          title: "",
          body: "",
        },
      ])
    );
    setStorage(JSON.parse(localStorage.getItem('notes')));
  };

  return (
    <div className="App">
      {
        storage !== null ?
          < Notes />
          :
          <div className="addnote">
            <h1 className="addnote__title">You have no notes</h1>
            <div className="addnote__btn">
              <button className="btn" onClick={addNote}>
                Create one now
              </button>
            </div>
          </div>
      }
    </div>

  );
}

export default App;
