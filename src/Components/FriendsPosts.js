import React, { useState, useEffect } from 'react';
import UserPosts from './UserPosts';
import TopBar from './TopBar';
import Side from './Side';

function FriendsPosts() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetch(`http://localhost:8080/users/${userId}/friends-posts`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const postList = data._embedded ? data._embedded.postList : data.postList;
        setPosts(postList || []);
        console.log(postList);
      })
      .catch(error => console.error('Error fetching friends posts:', error));
  }, [userId, token]);

  return (
    <div className="friends-posts">
         <div className="grid-container">
      <div className="top" style={{ marginBottom: '100px'}}><TopBar /></div>
      <div className="side" style={{marginLeft:'80px'}}> <Side></Side></div>
      <div className="mid">
      <h2>Friends' Posts</h2>

      {posts.map(post => (
        <div key={post.id} className="post">
        
            <UserPosts userId= {post._links.user.href.split('/').pop()} /> 
         
    
        
        </div>
      ))}
    </div>
    </div>
    </div>
   
  );
}

export default FriendsPosts;
