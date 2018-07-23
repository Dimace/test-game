import React, { Component } from 'react';
import './Cell.css';

export default class Cell extends Component {
  render() {
    let className = 'cell';
    let { status, onClick } = this.props;
    switch(status) {
      case 'passive':
        return <div onClick={onClick} className={className}></div>;
      case 'active':
        return <div onClick={onClick} className={className + ' yellow'}></div>;
      case 'missed':
        return <div onClick={onClick} className={className + ' red'}></div>;
      case 'caught':
        return <div onClick={onClick} className={className + ' green'}></div>;
      default:
        return <div onClick={onClick} className={className + ' error'}></div>;
    }
  }
}