import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 

function Login({setUser}) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function login(e) {
        fetch('/api/get-user' + '?userName=' + userName + '&password=' + password)
            .then((response) => response.json())
            .then((data) => {
                setUser(data.user_name);
                navigate('/');
            })
    }

    function handleUserName(e) {
        setUserName(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <div className='container' style={{height: '300px'}}>
            <form className='sign-up-form'>
                <div className="group">      
                    <input type="text" onChange={handleUserName} required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>User Name</label>
                </div>
                <div className="group">      
                    <input type="text" onChange={handlePassword} required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Password</label>
                </div>
                <button
                    type="button"
                    className='create-button'
                    onClick={login}
                >
                    Log in
                </button>
                <small className='small-login'>Don't have an account? Let's sign up <Link to="/sign-up">here</Link></small>
            </form>
        </div>
    );
}

export default Login;
