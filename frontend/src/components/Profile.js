import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Profile({user}) {
    const [profileData, setProfileData] = useState("");
    const [followData, setFollowData] = useState({});
    const [posts, setPosts] = useState({});
    const [following, setFollowing] = useState(false);
    const [owner, setOwner] = useState(false);
    const params = useParams();

    useEffect(()=>{
        updateProfile(params.username);
        updateFollowData();
    }, [params.username, user]);

    function updateFollowData() {
        fetch('/api/get-follow-data?userName=' + params.username)
            .then((res)=>res.json())
            .then((data)=>{
                setFollowData(data);
                updateFollowing(data.following_list);
            }).catch((err)=>console.log(err));
    }

    function updateFollowing(data) {
        for(let follower of data) {
            if (follower === user) {
                setFollowing(true);
                return;
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
                        setProfileData(data);
                        setPosts(posts);
                        setOwner(user === params.username);
                    })
            })
            .catch((err)=>console.log(err));
    }

    function handleFollowClick(e) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                follower: user,
                following: params.username,
            }),
        };
        if (e.target.name === 'Follow') {
            fetch('/api/follow-user', requestOptions)
                .then((res)=>res.json())
                .then((data)=>console.log(data))
                .catch((err)=>console.log(err));
        } else if (e.target.name === 'Unfollow') {
            fetch('/api/unfollow-user', requestOptions)
                .then((res)=>res.json())
                .then((data)=>console.log(data))
                .catch((err)=>console.log(err));
        } else;
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
                            <button onClick={handleFollowClick} name={following ? "Unfollow" : "Follow"}>{following ? "Unfollow" : "Follow"}</button>
                        ) : null}
                    </div>
                    <div className='vertical-data'>
                        <div className='v-data'>
                            <p><strong>Posts</strong></p>
                            <p>{posts ? posts.length : 0}</p>
                        </div>
                        <div className='v-data'>
                            <p><strong>Followers</strong></p>
                            <p>{followData.follower_number}</p>
                        </div>
                        <div className='v-data'>
                            <p><strong>Following</strong></p>
                            <p>{followData.following_number}</p>
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
