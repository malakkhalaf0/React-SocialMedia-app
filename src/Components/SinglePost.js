import React, { useState, useEffect } from 'react';
import Post from './Post';
import { useParams } from 'react-router-dom';

function SinglePost({ userId, postId }) {
  const [post, setPost] = useState(null);
  const token = localStorage.getItem('token');

 
    const fetchPosts = async () => {
    if(postId){}
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
    useEffect(() => {
    fetchPosts();
  }, [userId, postId, token]);

  const handlePostChange = () => {
   
    fetchPosts();
  };
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Post post={post} token={token} userId={userId} onPostChange={handlePostChange}/>
    </div>
  );
}

export default SinglePost;
