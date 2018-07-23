import React, { Component } from 'react';
import Board from '../board/Board.js';
import Input from '../input/Input.js';
import Score from '../score/Score.js';

// controller component
export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 1000, 
            scorePC: 0,
            scorePL: 0,
            targetCells: [],
            cellsStatus: Array(100).fill('passive'),
            gameStatus: 'paused'
        };
    }

    handleClick = (id) => (e) => {
        if(this.state.targetCells[this.state.targetCells.length-1] === id && this.state.cellsStatus[id] === 'active') {
            this.setState((prevState) => {
                let cellsStatus = prevState.cellsStatus.slice();
                cellsStatus[id] = 'caught';
                return {
                    scorePL: prevState.scorePL+1,
                    cellsStatus
                };
            });
        }
    }

    startGame = () => {
        if(!isNaN(this.state.time)) 
            this.setState({
                gameStatus: 'started', 
                scorePL: 0,
                scorePC: 0,
                cellsStatus: Array(100).fill('passive'),
                targetCells: []
            },()=> {
                this.timer = setInterval(() => {
                    this.updateCells()
                    }, this.state.time
                );
            });
    }

    onChange = (e) => {
        let time = e.target.value;
        this.setState((prevState) => {
            clearInterval(this.timer);
            return { 
                gameStatus:'paused',
                scorePL: 0,
                scorePC: 0,
                cellsStatus: Array(100).fill('passive'),
                targetCells: [],
                time 
            }
        })
    }

    checkCells() {
        let lastTarget = this.state.targetCells.length-1;
        if(this.state.cellsStatus[this.state.targetCells[lastTarget]] !== 'caught' && lastTarget >= 0) {
            this.setState((prevState) => {
                let cellsStatus = prevState.cellsStatus.slice();
                cellsStatus[this.state.targetCells[lastTarget]] = 'missed';
                return {
                    scorePC: prevState.scorePC+1,
                    cellsStatus
                };
            })
        }
    }

    getNewTargetCell() {
        let randomCell = 0;
        this.setState((prevState) => {
            let targetCells = this.state.targetCells.slice();
            let cellsStatus = this.state.cellsStatus.slice();
            do {
                randomCell = Math.floor(Math.random() * 99);
            } while(targetCells.includes(randomCell));
            targetCells.push(randomCell);
            cellsStatus[randomCell] = 'active';
            return {targetCells, cellsStatus}
        });
    }

    endGame() {
        clearInterval(this.timer);
        this.setState({
            gameStatus:'gameover',
            cellsStatus: Array(100).fill('passive'),
            targetCells: [],
            time: 1000
        })
    }

    updateCells() {
        if(this.state.scorePC === 10 || this.state.scorePL === 10) {
            this.endGame();
        } else {
            this.checkCells();
            this.getNewTargetCell();
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    onClose = () => {
        this.setState({
            gameStatus: 'paused',
            scorePL: 0,
            scorePC: 0
        });
    }

    render() {
        const { scorePC, scorePL } = this.state; 
        let victoryText = 'Game over';
        if(this.state.scorePL === 10)
            victoryText = 'You have won!';
        return (
            <div>
                {this.state.gameStatus === 'gameover' && 
                <Score victoryText = {victoryText} scorePC={scorePC} scorePL={scorePL} onClose={this.onClose}>
                </Score>}
                <Input text={this.state.time} onChange={this.onChange} onClick={this.startGame}>
                </Input>
                <Board cellsStatus={this.state.cellsStatus} handleClick={this.handleClick}> 
                </Board> 
            </div>
        )
    }
}
