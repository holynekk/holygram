import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileElement({user_name, first_name, last_name, profile_picture, followers}) {
    const navigate = useNavigate();
    return (
        <div className='profile-element-wrapper'>
            1111
            <img src={"#"}></img>
            <div profile-element-info>
                <p onClick={()=>navigate('/profile/' + user_name)}>{user_name}</p>
                <p>{first_name + " " + last_name}</p>
                <p>{followers} Followers</p>
            </div>
        </div>
    );
}

export default ProfileElement;
