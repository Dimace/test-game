import React, { Component } from 'react';
import './Score.css';

export default class Score extends Component {
  render() {
    const { onClose, victoryText, scorePC, scorePL } = this.props;
    return (
			<div className="modal-wrapper">
				<div className="modal">
					 <button className="close" onClick={() => onClose()}>&times;</button>
					<div className="text">PC:{scorePC} / Player:{scorePL}</div>
          <div className="text">{victoryText}</div>
				</div>
			</div>
    );
  }
}