import React, { useState, useEffect } from 'react';
import './style.css';
import Post from "./Post"
function UserPosts({ userId, token, postUpdated }) {
    const [posts, setPosts] = useState([]);
  

      const fetchPosts = () => {
        fetch(`http://localhost:8080/users/${userId}/posts`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch posts for user ${userId}`);
            }
            return response.json();
          })
          .then(data => {
            if (data._embedded && data._embedded.postList) {
              setPosts(data._embedded.postList);
            } else {
              setPosts([]);
            }
          })
          .catch(error => {
            console.error(`Error fetching posts for user ${userId}:`, error);
          });
      };
  
  

  useEffect(() => {
    fetchPosts();
  }, [userId, token, postUpdated]);

  const handlePostChange = () => {
    fetchPosts();
  };

  return (
    <div>
      <ul>
        {posts.map(post => (
          <Post key={post.id} post={post} token={token} userId={userId} onPostChange={handlePostChange} />
        ))}
      </ul>
    </div>
  );
}

export default UserPosts;