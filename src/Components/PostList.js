import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SinglePost from './SinglePost';
import TopBar from './TopBar';
import Side from './Side';
import './style.css';

function PostList() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  const location = useLocation();

  // Extract query parameter from the URL
  const query = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
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

    fetchPosts();
  }, [token, query]);

  return (
    <div className="grid-container">
      <div className="top"><TopBar/></div>
      <div className="side"><Side/></div>
      <div className="mid">
        <h1>Post List</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              {/* <Link to={`/users/${post._links.self.href.split('/')[4]}/posts/${post.id}`}>View Post</Link> */}
              <SinglePost userId={post._links.self.href.split('/')[4]} postId={post.id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostList;
