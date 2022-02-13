import React, { Component } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    let loggedIn = true;
    if (localStorage.getItem('uid') == null) loggedIn = false;
    this.state = {
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
  submit(e) {
    e.preventDefault();
    axios({
      method: 'get',
      url: 'https://zs2jwdq1p9.execute-api.ap-south-1.amazonaws.com/dev/authuser',
      params: {
        email: this.state.email,
        password: this.state.password,
      },
    })
      .then((res) => {
        alert(res.data.message);
        if (res.data.uid !== null) {
          localStorage.setItem('uid', res.data.uid);
          this.setState({
            loggedIn: true,
          });
        } else alert(error);
      })
      .catch((err) => console.log(err));
    //Api call
  }
  render() {
    if (this.state.loggedIn) return <Navigate to="/profile" />;
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Login</h1>
        <form onSubmit={this.submit.bind(this)}>
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
        <Link to="/register">Register</Link>
      </div>
    );
  }
}
