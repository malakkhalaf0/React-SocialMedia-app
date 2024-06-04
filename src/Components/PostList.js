import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SinglePost from './SinglePost';
import TopBar from './TopBar';
import Side from './Side';
import './style.css';
import Post from './Post';
function PostList() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  const location = useLocation();

  // Extract query parameter from the URL
  const query = new URLSearchParams(location.search).get('query') || '';

 
    const fetchPosts = async () => {
      try {
        const url = `http://localhost:8080/users/1/search?query=${query}`;
      
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
       
        setPosts(data._embedded ? data._embedded.postList : []);
        
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    useEffect(() => {
    fetchPosts();
  }, [token, query]);
  const handlePostChange = () => {
   
    fetchPosts();
  };
  return (
    <div className="grid-container">
      <div className="top"><TopBar/></div>
      <div className="side"><Side/></div>
      <div className="mid" style={{minHeight:'900px', marginLeft:'100px'}} >
        <h2 style={{ color: '#FF9B00', fontFamily: 'Poppins, sans-serif' }}>Posts</h2>
      
        <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
          {posts?.map((post) => (
            <li key={post.id}>
              {/* <Link to={`/users/${post._links.self.href.split('/')[4]}/posts/${post.id}`}>View Post</Link> */}
              {/* <SinglePost userId={post._links.self.href.split('/')[4]} postId={post.id} /> */}
              <Post post={post} userId={post._links.self.href.split('/')[4]} onPostChange={handlePostChange}/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostList;