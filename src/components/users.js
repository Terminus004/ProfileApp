import React, { Component } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';

export default class Users extends Component {
  constructor(props) {
    super(props);
    let loggedIn = false;
    if (localStorage.getItem('uid') != null) loggedIn = true;
    this.state = {
      persons: [],
      loggedIn,
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://zs2jwdq1p9.execute-api.ap-south-1.amazonaws.com/dev/readusers`
      )
      .then((res) => {
        alert(res.data.message);
        const persons = res.data.data;
        this.setState({ persons });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  render() {
    if (this.state.loggedIn == false) return <Navigate to="/" />;
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Users List</h2>
        <h3>
          <ul>
            {this.state.persons.map((person) => (
              <li key={person.email}>
                <b>{person.uname}</b>{' '}
                <a href={'mailto:' + person.email}>{person.email} </a>
              </li>
            ))}
          </ul>
        </h3>
        <div style={{ textAlign: 'center' }}>
          <Link to="/logout">LogOut</Link>
          <br />
          <Link style={{ textAlign: 'center' }} to="/profile">
            Profile
          </Link>
        </div>
      </div>
    );
  }
}
