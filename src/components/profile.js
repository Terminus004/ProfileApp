import React, { Component } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    let loggedIn = true;
    if (localStorage.getItem('uid') == null) loggedIn = false;
    this.state = {
      uname: '',
      email: '',
      password: '',
      loggedIn,
    };
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://zs2jwdq1p9.execute-api.ap-south-1.amazonaws.com/dev/readuser',
      params: {
        uid: localStorage.getItem('uid'),
      },
    }).then((res) => {
      alert(res.data.message);
      this.setState({ uname: res.data.uname, email: res.data.email });
    });
  }

  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  changeData(e) {
    e.preventDefault();
    //Api call
    axios({
      method: 'put',
      url: 'https://zs2jwdq1p9.execute-api.ap-south-1.amazonaws.com/dev/updateuser',
      data: {
        uid: localStorage.getItem('uid'),
        email: this.state.email,
        password: this.state.password,
        uname: this.state.uname,
      },
    })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => console.log(err));
  }
  render() {
    if (!this.state.loggedIn) return <Navigate to="/" />;
    return (
      <div style={{ textAlign: 'center' }}>
        <u>
          <h1>{this.state.uname} Profile </h1>
        </u>

        <form onSubmit={this.changeData.bind(this)}>
          <label for="uname">Name : </label>
          <input
            name="uname"
            type="text"
            placeholder="User Name"
            value={this.state.uname}
            onChange={this.inputChange.bind(this)}
          />
          <br />
          <label for="email">Email Id : </label>
          <input
            name="email"
            type="email"
            placeholder="Email Id"
            value={this.state.email}
            onChange={this.inputChange.bind(this)}
          />
          <br />
          <label for="password">Password : </label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.inputChange.bind(this)}
          />
          <br />
          <input type="submit" />
        </form>
        <h3>Change parameters to update profile</h3>
        <Link to="/users">Users</Link>
        <br />
        <Link to="/logout">LogOut</Link>
      </div>
    );
  }
}
