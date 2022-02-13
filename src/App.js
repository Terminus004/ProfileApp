import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Profile from './components/profile';
import Users from './components/users';
import Logout from './components/logout';
import './style.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}
