import React, { Component } from 'react';
import { Navigate, Link } from 'react-router-dom';

export default class Register extends Component {
  constructor(props) {
    super(props);
    let loggedIn = false;
    if (localStorage.getItem('uid')) loggedIn = true;
    this.state = {
      uname: '',
      email: '',
      password: '',
      loggedIn,
    };
  }
  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  register(e) {
    e.preventDefault();
    //Api call
    console.log({
      uname: this.state.uname,
      email: this.state.email,
      password: this.state.password,
    });
  }
  render() {
    if (this.state.loggedIn == true) {
      alert('LogOut first');
      return <Navigate to="/" />;
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Register</h1>
        <form onSubmit={this.register.bind(this)}>
          <input
            name="uname"
            onChange={this.inputChange.bind(this)}
            value={this.state.uname}
            placeholder="user name"
            type="text"
          />
          <br />
          <input
            name="email"
            onChange={this.inputChange.bind(this)}
            value={this.state.email}
            placeholder="email"
            type="email"
          />
          <br />
          <input
            name="password"
            onChange={this.inputChange.bind(this)}
            value={this.state.password}
            placeholder="password"
            type="password"
          />
          <br />
          <input type="submit" />
        </form>
        <Link to="/">Login</Link>
      </div>
    );
  }
}
