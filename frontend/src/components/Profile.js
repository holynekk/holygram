import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Profile({user}) {
    const [profileData, setProfileData] = useState("");
    const [posts, setPosts] = useState({});
    const [following, setFollowing] = useState(false);
    const [owner, setOwner] = useState(false);
    const [editing, setEditing] = useState(false);
    const params = useParams();

    useEffect(()=>{
        updateProfile(params.username)
    }, [params.username, user]);


    function updateFollowing(profile) {
        for(let follower of profile.followers) {
            if (follower.user_name === user) {
                setFollowing(true);
                break;
            }
        }
        setFollowing(false);
    }

    function updateProfile(username) {
        fetch('/api/get-profile?userName=' + username)
            .then((res)=>res.json())
            .then((data)=>{
                if (data.length === 0) {
                    return;
                }
                fetch('/api/get-user-posts?userName=' + username)
                    .then((res)=>res.json())
                    .then((posts)=>{
                        console.log(posts)
                        console.log(data)
                        setProfileData(data);
                        setPosts(posts);
                        updateFollowing(data);
                        setOwner(user === data.user_name)
                    })
            })
            .catch((err)=>console.log(err));
    }

    function handleFollowClick() {

    }

    function hideEditCallback() {

    }

    if (profileData == {}) return null;

    return (
        <div className='profile-wrapper'>
            <div className='profile-info'>
                <div className='profile-avatar'>
                    <img src={"https://picsum.photos/150/150"}></img>
                </div>
                <div className='profile-general-info'>
                    <div className='profile-name'>
                        <h3>u/{profileData.user_name}</h3>
                        {user && !owner ? (
                            <button onClick={handleFollowClick}>{following ? "Unfollow" : "Follow"}</button>
                        ) : null}
                        {user && owner ? <button onClick={setEditing(true)}>Edit Profile</button> : null}
                    </div>
                    <div className='vertical-data'>
                        <div className='v-data'>
                            <p><strong>Posts</strong></p>
                            <p>{posts ? posts.length : 0}</p>
                        </div>
                        <div className='v-data'>
                            <p><strong>Followers</strong></p>
                            <p>{profileData.followers ? profileData.followers.length : 0}</p>
                        </div>
                        <div className='v-data'>
                            <p><strong>Following</strong></p>
                            <p>{profileData.following ? profileData.following.length : 0}</p>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className='profile-content'>
                {
                    posts && posts.length > 0 ?
                    posts.map((post, postIndex) => {
                        return (
                            <div className='profile-post-content' key={postIndex}>
                                <p className='profile-post-heading-text'>{post.heading}</p>
                                <img src={"https://picsum.photos/300/300"} />
                                <p className='profile-post-caption-text'>{post.caption}</p>
                            </div>
                        );
                    }): null
                }
            </div>
        </div>
    );
}

export default Profile;
