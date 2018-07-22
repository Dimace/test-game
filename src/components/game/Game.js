import React, { Component } from 'react';
import Board from '../board/Board.js';
import Input from '../input/Input.js';

// controller component
export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 3000, // default time change later
            scorePC: 0,
            scorePL: 0,
            targetCells: [],
            cellsStatus: Array(100).fill('passive'),
            startGame: true,
            gameStatus: 'paused'
        };
    }

    handleClick = (id) => (e) => {
        if(this.state.targetCells[this.state.targetCells.length-1] === id) {
            console.log('++');
            this.setState((prevState) => {
                let cellsStatus = prevState.cellsStatus.slice();
                cellsStatus[id] = 'caught';
                return {
                    scorePL: prevState.scorePL+1,
                    cellsStatus
                };
            }, () => {console.log(this.state)})
        }
        console.log('handle click:');
        console.log(this.state.targetCells[this.state.targetCells.length-1]);
        console.log('target');
        console.log(id);
    }

    updateCells() {
        let lastTarget = this.state.targetCells.length-1;
        if(this.state.cellsStatus[this.state.targetCells[lastTarget]] !== 'caught' && lastTarget >= 0) {
            this.setState((prevState) => {
                let cellsStatus = prevState.cellsStatus.slice();
                cellsStatus[this.state.targetCells[lastTarget]] = 'missed';
                return {
                    scorePC: prevState.scorePC+1,
                    cellsStatus
                };
            }, () => {console.log(this.state)})
        }
        this.setState((prevState) => {
            let targetCells = this.state.targetCells.slice();
            let cellsStatus = this.state.cellsStatus.slice();
            let randomCell = 0;
            do {
                randomCell = Math.floor(Math.random() * 99);
            } while(targetCells.includes(randomCell));
            targetCells.push(randomCell);
            cellsStatus[randomCell] = 'active';
            return {targetCells, cellsStatus}
        });
    }

    componentDidMount() {
        this.timer = setInterval(() => {
              this.updateCells()
            }, this.state.time
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div>
                <Board cellsStatus={this.state.cellsStatus} handleClick={this.handleClick}> 
                </Board> 
            </div>
        )
    }
}
