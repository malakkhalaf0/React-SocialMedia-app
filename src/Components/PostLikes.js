import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import './style.css';

function PostLikes({ postId, token, onLikeAdded }) {
  const [likesCount, setLikesCount] = useState(0);
  const [likerIds, setLikerIds] = useState([]);
  const [likerNames, setLikerNames] = useState([]);
  const [showLikes, setShowLikes] = useState(false);

  const fetchLikes = async () => {
    try {
      const response = await fetch(`http://localhost:8080/posts/${postId}/likes`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch likes');
      }

      const data = await response.json();
      const likes = data._embedded ? data._embedded.postLikeList : [];
      const likerIds = likes.map(like => like._links.user.href.split('/').pop());

      setLikesCount(likes.length);
      setLikerIds(likerIds);

      // Fetch liker names
      const names = await fetchLikerNames(likerIds);
      setLikerNames(names);
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const fetchLikerNames = async (likerIds) => {
    try {
      const likersData = await Promise.all(likerIds.map(async (userId) => {
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch liker data');
        }

        const data = await response.json();
        return { id: data.id, username: data.username };
      }));

      return likersData;
    } catch (error) {
      console.error('Error fetching liker data:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [postId, token, onLikeAdded]);

  return (
    <>
      <div className="post-likes">
        <Button onClick={() => setShowLikes(!showLikes)} sx={{ textDecoration: 'none', textTransform: 'lowercase', fontSize: '13px', fontFamily: 'sans-serif', height: '3px', minWidth: '0px', color: '#FBB03B' }}>
          {likesCount}
        </Button>
        {showLikes && (
          <Dialog open={showLikes} onClose={() => setShowLikes(false)}>
            <DialogTitle>Likes</DialogTitle>
            <DialogContent>
              {likerNames.map((liker) => (
                <div key={liker.id} className="liker-info">
                  <Avatar>{liker.username.charAt(0)}</Avatar>
                  <Link to={`/users/${liker.id}/profiles/1`} className="liker-link">
                    {liker.username}
                  </Link>
                </div>
              ))}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
}

export default PostLikes;
