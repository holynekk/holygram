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
                    <nav className='main-nav'>
                        <h2><a href='/'>HolyGram</a></h2>
                        <div className='nav-buttons'>
                            <div className='nav-tripple'>
                                <Link className='link' to='/'>Feed</Link>
                                <Link className='link' to='/search'>Search</Link>
                                <Link className='link' to='/create-post'>Post</Link>
                            </div>
                            <Link className='link sign-in-link' to='/login'>Sign in!</Link>
                        </div>
                    </nav>
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