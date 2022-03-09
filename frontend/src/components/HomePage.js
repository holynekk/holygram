import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage({user}) {
    const [allPostsData, setAllPostsData] = useState(null);

    useEffect(()=>{
        if (!user) {
            fetch('/api/get-all-posts')
                .then((res)=>res.json())
                .then((data)=>setAllPostsData(data))
                .catch((err)=>console.log(err));
        } else {
            fetch('/api/get-posts-of-following?user=' + user)
                .then((res)=>res.json())
                .then((data)=>setAllPostsData(data))
                .catch((err)=>console.log(err));
        }
    }, [user]);

    return (
        <div className='feed-section'>
            {allPostsData ? allPostsData.map((post, index)=>(
                <div className="post-card" key={index}>
                    <div className='post-info-section'>
                        <Link className='profile-name-tag' to={'/profile/' + post.user_name}>u/{post.user_name}</Link>
                    </div>
                    <div className='post-content'>
                        <p className='heading-text'>{post.heading}</p>
                        {
                            post.post_image ?
                            <img className='post-image' src={"https://picsum.photos/300/300"}></img> :
                            null
                        }
                        <p className='caption-text'>{post.caption}</p>
                    </div>
                </div>
            )) : <p>There are no posts to view...</p>}
        </div>
    );
} 

export default HomePage;
