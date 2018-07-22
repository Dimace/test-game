import React, { Component } from 'react';
import './Input.css';

export default class Input extends Component {
  render() {
    const { onClick, onChange, text } = this.props;
    return (
      <div className = 'inputRow'>
        <input value={text} onChange={onChange} placeholder = "Enter delay" type='text'></input>
        <button onClick={onClick}> Start </button>
      </div>
    )
  }
}