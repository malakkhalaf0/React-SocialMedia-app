import React, { useState, useEffect } from 'react';
import './style.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

function PostLikes({ postId, token, onLikeAdded }) {
  const [likesCount, setLikesCount] = useState(0);
  const [likers, setLikers] = useState([]);
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
      const likerUrls = likes.map(like => like._links.user.href);

      setLikesCount(likes.length);
      setLikers(likerUrls);

      // Fetch liker names
      const names = await fetchLikerNames(likerUrls);
      setLikerNames(names);
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const fetchLikerNames = async (likerUrls) => {
    try {
      const names = await Promise.all(likerUrls.map(async (likerUrl) => {
        const response = await fetch(likerUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch liker name');
        }

        const data = await response.json();
        return data.username;
      }));

      return names;
    } catch (error) {
      console.error('Error fetching liker names:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [postId, token, onLikeAdded]); // Trigger fetchLikes when postId, token, or onLikeAdded changes

  useEffect(() => {
    if (likers.length > 0) {
      fetchLikerNames(likers)
        .then(names => {
          setLikerNames(names);
        })
        .catch(error => console.error('Error fetching liker names:', error));
    }
  }, [likers, token]);

  return (
    <>
      <div className="post-likes">
        <Button onClick={() => setShowLikes(!showLikes)} sx={{textDecoration: 'underline', textTransform: 'lowercase', fontSize: '13px', fontFamily: 'sans-serif',height:'3px', width:'3px', color:'#FBB03B'}}>
        {likesCount}
        </Button>
        {showLikes && (
          <Dialog open={showLikes} onClose={() => setShowLikes(false)}>
            <DialogTitle>Likes</DialogTitle>
            <DialogContent>
              <p>Likers: {likerNames.join(', ')}</p>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
}

export default PostLikes;