import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditProfile from './EditProfile';

function Profile() {
    const [profileData, setProfileData] = useState("");
    const [posts, setPosts] = useState({});
    const [following, setFollowing] = useState(false);
    const [owner, setOwner] = useState(false);
    const [editing, setEditing] = useState(false);
    const params = useParams();

    function updateFollowing(profile) {

    }

    function updateProfile(username) {
        
    }

    function handleFollowClick() {

    }

    function hideEditCallback() {

    }

    if (profileData == {}) return null;

    return (
        <div className='profile-wrapper'>
            <h3>u/{profileData.user_name}</h3>
            <div className='profile-data'>
                <img src={"#"}></img>
                <div className='vertical-data'>
                    <p>Posts: {posts ? posts.length : 0}</p>
                </div>
                <div className='vertical-data'>
                    <p>Followers: {profileData.followers ? profileData.followers.length : 0}</p>
                </div>
            </div>

        </div>
    );
}

export default Profile;
