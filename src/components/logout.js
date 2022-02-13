import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Logout extends Component {
  constructor(props) {
    super(props);
    localStorage.removeItem('uid');
  }
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>U have Logged Out</h1>
        <Link to="/">Login</Link>
      </div>
    );
  }
}
