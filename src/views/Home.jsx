import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function fetchPostData(){
            let response = await fetch('https://kekambas-blog-api.onrender.com/api/posts')
            let posts = await response.json()
            console.log(posts)
            setPosts(posts);
        };
        fetchPostData();
    }, []);

    return (
        <div>
            <h1 className="text-center">Welcome to the Blog!</h1>
            {posts.map(post => <PostCard key={post.id} post={post}/>)}
        </div>
    )
}
