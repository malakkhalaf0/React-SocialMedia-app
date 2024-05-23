// import React, { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';
// import LikeCommentButton from './LikeCommentButton';

// function Comments({ comments, token, postId, onDeleteComment }) {
//   const [username, setUsername] = useState('');
 
//   const [likesCount, setLikesCount] = useState(0);
//   const [likers, setLikers] = useState([]);
//   const [likerNames, setLikerNames] = useState([]);
//   const [likeAdded, setLikeAdded] = useState(false); // State to track if a like has been added
//   const [likeAdded1, setLikeAdded1] = useState(false); 
//   const userId = localStorage.getItem('userId');
//   const userName = localStorage.getItem('username');

//   useEffect(() => {
//     fetch(comments._links.user.href, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch user');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setUsername(data.username);
//         ; // Assuming the response includes the user ID
//       })
//       .catch(error => console.error('Error fetching user:', error));

//     fetch(comments._links.likes.href, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch likes');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setLikesCount(data._embedded ? data._embedded.commentLikeList.length : 0);
//         setLikers(data._embedded ? data._embedded.commentLikeList.map(like => like._links.user.href) : []);
//       })
//       .catch(error => console.error('Error fetching likes:', error));
//   }, [comments._links.user.href, comments._links.likes.href, token, likeAdded1 , likeAdded]);

//   const fetchLikerNames = async () => {
//     const likerNames = await Promise.all(likers.map(likerUrl =>
//       fetch(likerUrl, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       })
//       .then(response => response.json())
//       .then(data => data.username)
//     ));
    
//     return likerNames;
//   };

//   useEffect(() => {
//     if (likers.length > 0) {
//       fetchLikerNames()
//         .then(names => {
//           setLikerNames(names);
//         })
//         .catch(error => console.error('Error fetching liker names:', error));
//     }
//   }, [likers, token]);

//   // Callback function to handle like added
//   const handleLikeAdded = () => {
//     setLikeAdded(!likeAdded); // Toggle likeAdded state to trigger re-render
//   };

//   const handleLikeAdded1 = () => {
//     setLikeAdded1(!likeAdded1);
//     fetchLikerNames()
//       .then(names => {
//         // Filter out the username of the user who unliked the comment
//         const updatedLikerNames = likerNames.filter(name => name !== userName);
//         setLikerNames(updatedLikerNames);
//       })
//       .catch(error => console.error('Error updating liker names:', error));
//   };

//   // Function to handle comment deletion
//   const handleDelete = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/posts/${postId}/comments/${comments.id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete comment');
//       }

//       // Trigger the onDeleteComment callback provided by the parent component
//       onDeleteComment(comments.id);

//       // Optionally, you can handle success or update UI here
//       console.log('Comment deleted successfully');
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//     }
//   };

//   return (
//     <div className="comments">
//       <ul>
//         <li key={comments.id}>
//           <p>{comments.commentContent}</p>
//           <p>Date: {new Date(comments.date).toLocaleString()}</p>
//           <p>Author: {username}</p>
//           <p>Likes: {likesCount}</p>
//           <p>Likers: {likerNames.join(', ')}</p>

//           {`http://localhost:8080/users/${userId}` === comments._links.user.href && (
//             <Button onClick={handleDelete}>Delete</Button>
//           )}
//         </li>
//       </ul>
//       <LikeCommentButton 
//         postId={postId} 
//         commentId={comments.id} 
//         userId={userId} 
//         token={token} 
//         onLikeAdded={handleLikeAdded} 
//         onLikeAdded1={handleLikeAdded1} 
//       />
//     </div>
//   );
// }

// export default Comments;
import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LikeCommentButton from './LikeCommentButton';
import './style.css';
import { Link } from 'react-router-dom'; 

function Comments({ comments, token, postId, onDeleteComment }) {
  const [username, setUsername] = useState('');
  const [likesCount, setLikesCount] = useState(0);
  const [likers, setLikers] = useState([]);
  const [likerNames, setLikerNames] = useState([]);
  const [likeAdded, setLikeAdded] = useState(false);
  const [likeAdded1, setLikeAdded1] = useState(false);
  const [open, setOpen] = useState(false);
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('username');

  useEffect(() => {
    fetch(comments._links.user.href, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        return response.json();
      })
      .then(data => {
        setUsername(data.username);
      })
      .catch(error => console.error('Error fetching user:', error));

    fetch(comments._links.likes.href, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch likes');
        }
        return response.json();
      })
      .then(data => {
        setLikesCount(data._embedded ? data._embedded.commentLikeList.length : 0);
        setLikers(data._embedded ? data._embedded.commentLikeList.map(like => like._links.user.href) : []);
      })
      .catch(error => console.error('Error fetching likes:', error));
  }, [comments._links.user.href, comments._links.likes.href, token, likeAdded1, likeAdded]);

  const fetchLikerNames = async () => {
        const likerNames = await Promise.all(likers.map(likerUrl =>
          fetch(likerUrl, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response => response.json())
          .then(data => data.username)
        ));
        
        return likerNames;
      };
    
      useEffect(() => {
        if (likers.length > 0) {
          fetchLikerNames()
            .then(names => {
              setLikerNames(names);
            })
            .catch(error => console.error('Error fetching liker names:', error));
        }
      }, [likers, token]);
    
      // Callback function to handle like added
      const handleLikeAdded = () => {
        setLikeAdded(!likeAdded); // Toggle likeAdded state to trigger re-render
      };
    
      const handleLikeAdded1 = () => {
        setLikeAdded1(!likeAdded1);
        fetchLikerNames().then(names => {
          console.log(names);
            const updatedLikerNames = likerNames.filter(n  => n !== userName );
            setLikerNames(updatedLikerNames);
            
          })
          .catch(error => console.error('Error updating liker names:', error));
      };
     //console.log(likerNames);
  const handleDelete = async () => {
        try {
          const response = await fetch(`http://localhost:8080/posts/${postId}/comments/${comments.id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
    
          if (!response.ok) {
            throw new Error('Failed to delete comment');
          }
    
          // Trigger the onDeleteComment callback provided by the parent component
          onDeleteComment(comments.id);
    
          // Optionally, you can handle success or update UI here
          console.log('Comment deleted successfully');
        } catch (error) {
          console.error('Error deleting comment:', error);
        }
      };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="comment">
      <div className="comment-avatar">{username.charAt(0).toUpperCase()}</div>
      <div className="comment-content">
        <div className="comment-header">
    
          <span className="comment-author">   <Link to={`/users/${userId}/profiles/1`}>{username} </Link></span>
          {`http://localhost:8080/users/${userId}` === comments._links.user.href && (
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          )}
        </div>
        <div className="comment-text">{comments.commentContent}</div>
        <div className="comment-actions">
          <LikeCommentButton 
            postId={postId} 
            commentId={comments.id} 
            userId={userId} 
            token={token} 
            onLikeAdded={handleLikeAdded} 
            onLikeAdded1={handleLikeAdded1} 
          />
          <Button onClick={handleClickOpen} className="comment-likes">
            {likesCount} Likes
          </Button>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Likers</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {likerNames.length > 0 ? likerNames.join(', ') : 'No likers yet.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Comments;