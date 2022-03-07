import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePost({user}) {
    const [heading, setHeading] = useState("");
    const [caption, setCaption] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    function uploadImage(e) {
        setImageFile(e.target.files[0]);
    }

    function handleHeading(e) {
        setHeading(e.target.value);
    }

    function handleCaption(e) {
        setCaption(e.target.value);
    }

    function submitPost() {
        let sentData = new FormData();
        sentData.append("user_name", user);
        sentData.append("heading", heading);
        sentData.append("caption", caption);
        sentData.append("post_image", imageFile);

        fetch("/api/create-post", {
            method: "POST",
            enctype: 'multipart/form-data',
            // headers: {
            //     "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
            // },
            body: sentData
        })
            .then((response)=>response.json())
            .then((data)=>{
                console.log(data);
                navigate('/');
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className='create-post-container'>
            <form className='create-post-form'>
                <img src={imageFile ? URL.createObjectURL(imageFile) : null} className="uploaded-image"/>
                <label className="browse-button">
                    Upload Image <input type="file" accept="image/*" style={{display: "none"}} onChange={uploadImage}/>
                </label>
                <label htmlFor='heading-text'>Heading:</label>
                <input type='text' id='heading-text' onChange={handleHeading}/>
                <label htmlFor='caption-text'>Caption:</label>
                <textarea id='caption-text' cols="100" rows="15" placeholder="Enter the text" onChange={handleCaption}/>
                <button

                    type="button"
                    className='create-post-button'
                    onClick={submitPost}
                >
                    Create Post
                </button>
            </form>
        </div>
    );
}

export default CreatePost;
