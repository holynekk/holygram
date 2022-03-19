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
                <div className='uploaded-image'>
                    <img src={imageFile ? URL.createObjectURL(imageFile) : null} />
                </div>
                <label className="browse-button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg> 
                    Upload Image<input type="file" accept="image/*" style={{display: "none"}} onChange={uploadImage}/>
                </label>
                <label style={{fontWeight: 900, fontSize: 'larger', margin: '10px'}} htmlFor='heading-text'>Heading</label>
                <input type='text' id='heading-text' maxLength="100" onChange={handleHeading}/>
                <label style={{fontWeight: 900, fontSize: 'larger', margin: '10px'}} htmlFor='caption-text'>Caption</label>
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
