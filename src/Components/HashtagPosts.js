// HashtagPosts.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from './Post';

function HashtagPosts({ token }) {
  const { hashtag } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
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

    fetchPosts();
  }, [hashtag, token]);

  return (
    <div>
      <h1>Posts with #{hashtag}</h1>
      {/* Render posts */}
      <ul>
        {posts.map(post => (
          <Post key={post.id} post={post} token={token} />
        ))}
      </ul>
    </div>
  );
}

export default HashtagPosts;
