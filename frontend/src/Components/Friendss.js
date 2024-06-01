import React, { useState, useEffect } from 'react';
import './Friendss.css'; // Import your CSS file

function Friends({ user, token, onfriendUpdated = () => {} }) {
  const [friends, setFriends] = useState([]);
  const [updated, setUpdated] = useState(false);
  const userIdp = localStorage.getItem('userId');

  useEffect(() => {
    if (user) {
      fetchFriends();
    }
  }, [user, token, updated]);

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

  const handleFollow = async () => {
    if (isFriend()) {
      await deleteFriend();
    } else {
      await addFriend();
    }
  };

  const isFriend = () => {
    return friends.some(friend => parseInt(friend.id, 10) === parseInt(userIdp, 10));
  };

  const deleteFriend = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/${userIdp}/friends/${user.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to unfollow user');
      }
      setFriends(prevFriends => prevFriends.filter(friend => friend.id !== user.id));
      setUpdated(!updated);
      onfriendUpdated();
    } catch (error) {
      console.error('Error handling unfollow action:', error);
    }
  };

  const addFriend = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/${userIdp}/friends?friendIds=${user.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to follow user');
      }
      const newFriend = await response.json();
      setFriends(prevFriends => [...prevFriends, newFriend]);
      setUpdated(!updated);
      onfriendUpdated();
    } catch (error) {
      console.error('Error handling follow action:', error);
    }
  };

  return (
    <div>
      <button className={isFriend() ? 'follow' : 'follow-b'} onClick={handleFollow}>
        {isFriend() ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
}

export default Friends;
