import React, { useState, useEffect } from 'react';
import Comments from './Comments';

function PostComments({ postId, token, commentsUpdated}) {
  const [comments, setComments] = useState([]);

  const fetchComments = () => {
    fetch(`http://localhost:8080/posts/${postId}/comments`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const commentList = data._embedded ? data._embedded.commentList : data.commentList;
        setComments(commentList || []);
      })
      .catch(error => console.error('Error fetching comments:', error));
  };

  useEffect(() => {
    fetchComments();
  }, [postId, token, commentsUpdated]);

  // Function to handle comment deletion
  const handleDeleteComment = (commentId) => {
    // Filter out the deleted comment from the comments array
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
  };

  return (
    <div className="post-comments">
      <h2>Comments ({comments.length})</h2>
      {comments.map(comment => (
        <Comments
          key={comment.id}
          comments={comment}
          postId={postId}
          token={token}
          onDeleteComment={handleDeleteComment}
        // Pass the callback function for comment deletion
        />
      ))}
    </div>
  );
}

export default PostComments;