import React, { Component } from 'react';
import Game  from './components/game/Game.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game>
        </Game> 
      </div>
    );
  }
}

export default App;
