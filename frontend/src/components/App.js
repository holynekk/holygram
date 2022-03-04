import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import Search from './Search';
import CreatePost from './CreatePost';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className=''>
                <BrowserRouter>
                    <Routes>
                        <Route element={<HomePage />} path='/' exact />
                        <Route element={<Login />} path='/login' />
                        <Route element={<SignUp />} path='/sign-up' />
                        <Route element={<Profile />} path='/profile/:username' />
                        <Route element={<Search />} path='/search' />
                        <Route element={<CreatePost />} path='/create-post' />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}