import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function CreatePost({ token }) {
  const { userId } = useParams();
  const [caption, setCaption] = useState('');
  const [audiance, setAudience] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentDate = new Date().toISOString(); // Get the current date in ISO format

    try {
      const response = await fetch(`http://localhost:8080/users/${userId}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          caption,
         audiance,
          date: currentDate // Include the current date in the post data
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      // Optionally, you can handle success here (e.g., show a success message)
    } catch (error) {
      console.error('Error creating post:', error);
      // Optionally, you can handle errors here (e.g., show an error message)
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="caption">Caption:</label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="audience">Audience:</label>
          <input
            type="text"
            id="audience"
            value={audiance}
            onChange={(event) => setAudience(event.target.value)}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
