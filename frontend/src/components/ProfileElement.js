import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileElement({user_name, first_name, last_name, profile_picture, followers}) {
    const navigate = useNavigate();
    return (
        <div className='profile-element-wrapper'>
            <img src={"https://picsum.photos/80/80"}></img>
            <div className='profile-element-info' >
                <p style={{fontWeight: "900"}} onClick={()=>navigate('/profile/' + user_name)}>{user_name}</p>
                <p>{first_name + " " + last_name}</p>
                <p> Followers <bold>{0}</bold></p>
            </div>
        </div>
    );
}

export default ProfileElement;
