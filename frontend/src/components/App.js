import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import Search from './Search';
import CreatePost from './CreatePost';

function App() {
    const [user, setUser] = useState("");
    return (
        <div style={{height: '100%'}} className=''>
            <BrowserRouter>
                <nav className='main-nav'>
                    <h2><a href='/'>HolyGram</a></h2>
                    <div className='nav-buttons'>
                        <div className='nav-tripple'>
                            <Link className='link' to='/'>Feed</Link>
                            <Link className='link' to='/search'>Search</Link>
                            <Link className='link' to='/create-post'>Post</Link>
                        </div>
                        {
                            user 
                            ? <div className='logged-in-drop'>
                                <span>Signed in as: <Link to={'/profile/' + user}>{user}</Link></span>
                                <button type="button" onClick={()=>{setUser('')}}>Logout!</button>
                            </div>
                            : <Link className='link sign-in-link' to='/login'>Sign in!</Link>
                        }
                        
                    </div>
                </nav>
                <Routes>
                    <Route element={<HomePage user={user}/>} path='/' exact />
                    <Route element={<Login setUser={setUser}/>} path='/login' />
                    <Route element={<SignUp setUser={setUser}/>} path='/sign-up' />
                    <Route element={<Profile />} path='/profile/:username' />
                    <Route element={<Search />} path='/search' />
                    <Route element={<CreatePost user={user}/>} path='/create-post' />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
