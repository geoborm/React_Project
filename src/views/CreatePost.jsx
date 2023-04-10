import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function CreatePost({ loggedIn, flashMessage }) {
    
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn){
            flashMessage('You must be logged in to create a new post', 'danger');
            navigate('/login'); 
        }
    });
    
    async function handleSubmit(e){
        e.preventDefault();
        console.log(e);

        let title = e.target.title.value;
        let content = e.target.content.value;

        let token = localStorage.getItem('token');

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`);

        let requestBody = JSON.stringify({title, content});

        let res = await fetch('https://kekambas-blog-api.onrender.com/api/posts', {
            method: 'POST',
            headers: myHeaders,
            body: requestBody
        });

        let data = await res.json();
        if (data.error){
            flashMessage(data.error, 'danger');
        } else {
            flashMessage(`${data.title} has been created`, 'primary');
            navigate('/');
        };
    };

    return (
       <div>
            <h3 className="text-center">Create A Post!</h3>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="title" className="form-control my-3" placeholder="Enter Title"></input>
                    <textarea name="content" className="form-control my-3" placeholder="Enter Body"></textarea>
                    <input type="submit" value="Create Post" className="btn btn-info w-100"></input>
                </div>
            </form>
        </div>
    )
}
