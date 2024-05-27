import React, { useState, useEffect } from 'react';
import Comments from './Comments';

function PostComments({ postId, commentsUpdated }) {
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem('token');

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

  // Function to handle comment editing
  const handleEditComment = (updatedComment) => {
    // Update the edited comment in the comments array
    const updatedComments = comments.map(comment =>
      comment.id === updatedComment.id ? updatedComment : comment
    );
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
          onDeleteComment={handleDeleteComment}
          onEditComment={handleEditComment} // Pass the callback function for comment editing
        />
      ))}
    </div>
  );
}

export default PostComments;
