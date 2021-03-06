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
                                <span><small style={{marginRight: '7px'}}>Signed in as:</small><Link className="logged-in-link" to={'/profile/' + user}>{user}</Link></span>
                                <button className="logout-button" type="button" onClick={()=>{setUser('')}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </button>
                            </div>
                            : <Link className='link sign-in-link' to='/login'>Sign in!</Link>
                        }
                        
                    </div>
                </nav>
                <Routes>
                    <Route element={<HomePage user={user}/>} path='/' exact />
                    <Route element={<Login setUser={setUser}/>} path='/login' />
                    <Route element={<SignUp setUser={setUser}/>} path='/sign-up' />
                    <Route element={<Profile user={user} />} path='/profile/:username' />
                    <Route element={<Search />} path='/search' />
                    <Route element={<CreatePost user={user}/>} path='/create-post' />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
