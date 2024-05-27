import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar'; // Import Avatar component
import './FriendsList.css'; // Import the CSS file
import Friends from './Friends';

function FriendsList({ user, token ,  friendUpdated}) {
  const [friends, setFriends] = useState([]);
  const userIdp = localStorage.getItem('userId');
  useEffect(() => {
    if (user) {
      fetchFriends();
    }
  }, [user, token,  friendUpdated]);

  const fetchFriends = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/${user.id}/friends`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch friends');
      }
      const data = await response.json();
      const userList = data._embedded ? data._embedded.userList : [];
      setFriends(userList);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  return (
    <div className="recommended-friendsssss">
      <h2>Friends</h2>
      <div className="friend-list">
        {friends.map((friend) => (
          <div key={friend.id} className="friend-card">
            <Avatar>
              {friend.username.charAt(0)} {/* Displaying first character of username */}
            </Avatar>
            <div className="friend-info">
              <Link to={`/users/${friend.id}/profiles/1`}>
                <p>{friend.username}</p>
                <p>@{friend.username}</p>
              </Link>
              {friend.id === parseInt(userIdp) ? (
                <></>
              ) : (
                <Friends user={friend} token={token} />
              )}
            </div>
          </div>
      
        ))}
      </div>
    </div>
  );
};

export default FriendsList;