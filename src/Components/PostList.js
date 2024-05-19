import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PostList() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/users/1/posts', {
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
  }, [token]);

  return (
    <div>
      <h1>Post List</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <p>{post.caption}</p>
            <Link to={`/users/${post._links.self.href.split('/')[4]}/posts/${post.id}`}>View Post</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
