import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp({setUser}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function createAccount() {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                user_name: userName,
                password: password
            })
        };
        fetch("/api/create-user", requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setUser(data.user_name);
                navigate('/');
            })
            .catch((err) => console.log(err));
    }

    function handleFirstName(e) {
        setFirstName(e.target.value);
    }

    function handleLastName(e) {
        setLastName(e.target.value);
    }

    function handleUserName(e) {
        setUserName(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <div className='container'>
            <form className='sign-up-form'>
                <p className='form-header'>HG</p>
                <div className="group">      
                    <input type="text" onChange={handleFirstName} required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>First Name</label>
                </div>
                
                <div className="group">      
                    <input type="text" onChange={handleLastName} required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Last Name</label>
                </div>

                <div className="group">      
                    <input type="text" onChange={handleUserName} required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>User Name</label>
                </div>
                <div className="group">      
                    <input type="password" onChange={handlePassword} required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Password</label>
                </div>
                <button
                    type="button"
                    className='create-button'
                    onClick={createAccount}
                >
                    Create Account
                </button>
            </form>
        </div>
        
    );
}

export default SignUp;
