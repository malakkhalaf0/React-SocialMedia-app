import React, { useState, useEffect } from 'react';

function LikeCommentButton({ postId, commentId, userId, token, onLikeAdded ,  onLikeAdded1}) {
    const [isLiked, setIsLiked] = useState(false);
    const [likeId, setLikeId] = useState(null); // Track the id of the like

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const response = await fetch(`http://localhost:8080/posts/${postId}/comments/${commentId}/likes`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const userLike = data._embedded ? data._embedded.commentLikeList.find(like => like._links.user.href === `http://localhost:8080/users/${userId}`) : null;
                    setIsLiked(!!userLike);
                    if (userLike) {
                        setLikeId(userLike.id);
                    }
                }
            } catch (error) {
                console.error('Error fetching likes:', error);
            }
        };

        fetchLikes();
    }, [postId, commentId, userId, token]);

    const handleLikeComment = async () => {
        try {
            if (isLiked) {
                // Unlike the comment
                const response = await fetch(`http://localhost:8080/posts/${postId}/comments/${commentId}/likes/${likeId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    setIsLiked(false);
                    setLikeId(null);
                    onLikeAdded1(); // Trigger the callback function to indicate a like has been removed
                } else {
                    throw new Error('Failed to unlike comment');
                }
            } else {
                // Like the comment
                const response = await fetch(`http://localhost:8080/posts/${postId}/comments/${commentId}/users/${userId}/likes`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log(userId);
                    setIsLiked(true);
                    setLikeId(responseData.id);
                    onLikeAdded(); // Trigger the callback function to indicate a like has been added
                } else {
                    throw new Error('Failed to like comment');
                }
            }
        } catch (error) {
            console.error('Error liking/unliking comment:', error);
        }
    };

    return (
        <button onClick={handleLikeComment}>
            {isLiked ? 'Unlike' : 'Like'}
        </button>
    );
}

export default LikeCommentButton;