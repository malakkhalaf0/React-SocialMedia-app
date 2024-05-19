import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import './style.css'; // Import CSS file for styling

function RecommendedFriends({ userId, token }) {
    const [recommendedFriends, setRecommendedFriends] = useState([]);

    useEffect(() => {
        const fetchRecommendedFriends = async () => {
            try {
                const response = await fetch(`http://localhost:8080/users/${userId}/recommended-friends`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch recommended friends');
                }
               
                const data = await response.json();
                if (!data._embedded || !data._embedded.userList) {
                    setRecommendedFriends([]);
                } else {
                    setRecommendedFriends(data._embedded.userList);
                }
                
            } catch (error) {
                console.error('Error fetching recommended friends:', error);
            }
        };
    
        fetchRecommendedFriends();
    }, [userId, token]);
    
    return (
        <div className="recommended-friends">
            <h2>Suggested for you</h2>
            <div className="friend-list">
                {recommendedFriends.map((friend) => (
                    <div key={friend.id} className="friend-card">
                        <Avatar>
                            {friend.username.charAt(0)} {/* Displaying first character of username */}
                        </Avatar>
                        <div className="friend-info">
                            <p>{friend.username}</p>
                            <p>@{friend.username}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecommendedFriends;