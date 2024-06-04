// HashtagPosts.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from './Post';
import TopBar from './TopBar';
import Side from './Side';

function HashtagPosts() {
  const { hashtag } = useParams();
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
 
    // Fetch posts related to the hashtag
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/hashtags/${hashtag}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
      setPosts(data._embedded.postList);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    useEffect(() => {
    fetchPosts();
  }, [hashtag, token]);


  const handlePostChange = () => {
    
    fetchPosts();
  };
  return (
    <div>
         <div className="grid-container">
      <div class="top" style={{ marginBottom: '100px'}}><TopBar /></div>
      <div class="side" style={{marginLeft:'80px'}}> <Side></Side></div>
      <div class="mid"style={{minHeight:'700px'}} >
      <h2 style={{color:'#490057'}}>Posts with #{hashtag}</h2>
     
      <ul>
        {posts?.map(post => (
          <Post key={post.id}  post={post}  userId={post._links.user.href.split('/')[4]} onPostChange={handlePostChange}/>
        ))}
      </ul>
    </div>
    </div>
    </div>
  );
}

export default HashtagPosts;
