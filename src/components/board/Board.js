import React, { Component } from 'react';
import Cell from '../cell/Cell.js';
import './Board.css';

export default class Board extends Component {
    render() {
        let cells = [];
        let board = [];
        for(let i=0; i<100; i++) 
            cells.push(<Cell key={i} status={this.props.cellsStatus[i]} onClick={this.props.handleClick(i)}></Cell>);
        
        for(let i=0; i<10; i++) 
            board.push(<div key={i} className='row'>{cells.slice(i*10,i*10+10)}</div>);
        return (
            <div>
                {board}
            </div>
        );
    }
}
