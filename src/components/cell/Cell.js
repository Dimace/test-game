import React, { Component } from 'react';
import './Cell.css';

export default class Cell extends Component {
  render() {
    let className = 'cell';
    switch(this.props.status) {
      case 'passive':
        return <div onClick={this.props.onClick} className={className}></div>;
      case 'active':
        return <div onClick={this.props.onClick} className={className + ' yellow'}></div>;
      case 'missed':
        return <div onClick={this.props.onClick} className={className + ' red'}></div>;
      case 'caught':
        return <div onClick={this.props.onClick} className={className + ' green'}></div>;
      default:
        return <div onClick={this.props.onClick} className={className + ' error'}></div>;
    }
  }
}