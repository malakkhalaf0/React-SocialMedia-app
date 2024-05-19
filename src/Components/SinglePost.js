import React, { useState, useEffect } from 'react';
import Post from './Post';
import { useParams } from 'react-router-dom';

function SinglePost({ token }) {
    const { userId, postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:8080/users/${userId}/posts/${postId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const postData = await response.json();
                setPost(postData);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [userId, postId, token]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Post post={post} token={token} userId={userId} />
        </div>
    );
}

export default SinglePost;
