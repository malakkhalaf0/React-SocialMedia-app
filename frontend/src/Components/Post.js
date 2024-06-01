import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostComments from './PostComments';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import LikePostButton from './LikePostButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import SendIcon from '@mui/icons-material/Send';
import RepeatIcon from '@mui/icons-material/Repeat';
import Snackbar from '@mui/material/Snackbar';
import EditPostForm from './EditPostForm';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CommentIcon from '@mui/icons-material/Comment';

function Post({ post, userId , onPostChange }) {
  const [commentText, setCommentText] = useState('');
  const [commentsUpdated, setCommentsUpdated] = useState(false);
  const [userName, setUserName] = useState('');
  const [showComments, setShowComments] = useState(false);
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const userIdc = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const handleCommentsToggle = () => {
    setShowComments(!showComments);
  };

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const handleEditPost = () => {
    setEditFormOpen(true); // Open the edit form when "Edit Post" is clicked
  };

  const handleCloseEditForm = () => {
    setEditFormOpen(false); // Close the edit form when it's submitted or cancelled
  };
///////////////////////////////////////////////////////edit/////////////////////////////////
const handleSubmitEditForm = async (data) => {
  try {
    const formData = new FormData(); 
    // Create a FormData object
    
    // Add caption and audience to the FormData object
    formData.append('caption', data.caption);
    formData.append('Audiance', data.audiance);

    // Add image if provided
    if (data.image) {
      formData.append('image', data.image);
    }

    // Add video if provided
    if (data.video) {
      formData.append('video', data.video);
    }

    // Add flag to remove image if necessary
    if (data.removeImage) {
      formData.append('removeImage', true);
    }

    // Add flag to remove video if necessary
    if (data.removeVideo) {
      formData.append('removeVideo', true);
    }

    const response = await fetch(`http://localhost:8080/users/${userIdc}/posts/${post.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData // Pass the FormData object as the request body
    });

    if (response.ok) {
      // Post updated successfully
      console.log('Post updated successfully');
      console.log(data);

      // Close edit form
      setEditFormOpen(false);
      onPostChange();
      // Show success message
      setSnackbarMessage('Post edited successfully');
      setSnackbarOpen(true);
    } else {
      throw new Error('Failed to update post');
    }
  } catch (error) {
    console.error('Error updating post:', error);
    // Show error message
    setSnackbarMessage('Failed to update post');
    setSnackbarOpen(true);
  }
};

  



  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
          setUserName(userData.username);

        } else {
          throw new Error('Failed to fetch user information');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, [userId, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/posts/${post.id}/comments/users/${userIdc}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          commentContent: commentText
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create comment');
      }

      setCommentText('');
      setCommentsUpdated(!commentsUpdated);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleShare = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/${userIdc}/shared-posts?postId=${post.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        onPostChange();
        setSnackbarMessage('Post shared successfully');
        setSnackbarOpen(true);
      } else {
        throw new Error('Failed to share post');
      }
    } catch (error) {
      console.error('Error sharing post:', error);
      setSnackbarMessage('Failed to share post');
      setSnackbarOpen(true);
    }
  };
  const renderCaptionWithLinks = () => {
    if (!post.caption) return null; // Add null check
  
    const parts = post.caption.split(/(#\w+)/g); // Split caption by hashtags
    return parts.map((part, index) => {
      if (part.startsWith('#')) {
        const tag = part.substring(1); // Remove the '#'
        return <Link key={index} to={`/hashtags/${tag}`}>{part}</Link>; // Convert hashtag to link
      } else {
        return <span key={index}>{part}</span>; // Render regular text
      }
    });
  }
  

  const handleDeletePost = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/${userIdc}/posts/${post.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        onPostChange();
        // Redirect or update UI as needed
       console.log("post is deleted")// Redirect to home page after deletion
      } else {
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      // Optionally, handle errors
    }
  };

  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


  return (
    
      <Card sx={{ width: 600, overflow:'visible',   boxShadow:' 0px 0px 10px 3px rgba(0, 0, 0, 0.1)' }}>
     
        <CardHeader
            avatar={
              <Link to={`/users/${userId}/profiles/1`} style={{textDecoration:'none'}}>
                {/* <Avatar sx={{ bgcolor: '#490057' }} aria-label="recipe">
                  {userName ? userName.charAt(0).toUpperCase() : ''}
                </Avatar> */}
                        <img
              src="\images\images.jpg"
              alt="User Avatar"
              className="avatar-image"
            />
              </Link>
            }
          action={
            <>
              {post._links.user.href === `http://localhost:8080/users/${userIdc}` && (
                <IconButton aria-label="settings" onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
              )}
              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>
                <MenuItem onClick={handleEditPost}>Edit Post</MenuItem>
                
              </Menu>
              
            </>
            
          }
          title={
          <Link to={`/users/${userId}/profiles/1`} style={{textDecoration:'none',fontSize:'large'}}>{userName} </Link>}
          subheader={post.audiance === 'PUBLIC' ? (
            <>
              {new Date(post.date).toLocaleString()}
              
            </>
          ) : (
            <>
              {new Date(post.date).toLocaleString()}
            </>
          )}
        />
      <div className="post">
          <p style={{color:'#490057', fontSize:'20px', fontFamily: 'Poppins, sans-serif'}}>{renderCaptionWithLinks()}</p> <br/>
          {post.imageUrl && (
      <img
        src={post.imageUrl} 
        alt="Image Alt"
        style={{ width: '100%', maxWidth: '500px', marginTop: '10px' ,borderRadius:'10px'}} 
      />
    )}
    {/* Check if videoUrl is not null and render the video */}
    {post.videoUrl && (
      <video controls style={{ width: '100%', maxWidth: '500px', marginTop: '10px', borderRadius:'10px' }}>
        <source src={post.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )}
          
          
          <div className='CL'>
      <Button onClick={handleCommentsToggle} style={{ textTransform: 'lowercase' ,  color :'#490057'}}>
       <CommentIcon></CommentIcon>
      </Button>

      {/* Dialog for displaying comments */}
      <Dialog open={showComments} onClose={handleCommentsToggle} >
      
        <DialogContent >
 
          <PostComments postId={post.id}  commentsUpdated={commentsUpdated}  />

          
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '5px', padding: '5px 10px', width: '550px', backgroundColor: '#f9f9f9' }}>
      <InputBase
        value={commentText}
        onChange={(event) => setCommentText(event.target.value)}
        placeholder="Add a comment..."
        inputProps={{ 'aria-label': 'Add a comment...' }}
        sx={{ flex: 1, marginRight: '10px' }}
      />
      <Button type="submit" sx={{ minWidth: 'auto', padding: '0', color: '#490057' }}>
        <SendIcon />
      </Button>
    </form> 
        </DialogContent>


      </Dialog>

            <LikePostButton postId={post.id} userId={userIdc} token={token}/> 
            <Button sx={{ border: 'none', outline: 'none',color:'#490057' }} onClick={handleShare}><RepeatIcon /></Button>
          </div>
          <br></br>
          <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '5px', padding: '5px 10px', width: '550px', backgroundColor: '#f9f9f9' }}>
      <InputBase
        value={commentText}
        onChange={(event) => setCommentText(event.target.value)}
        placeholder="Add a comment..."
        inputProps={{ 'aria-label': 'Add a comment...' }}
        sx={{ flex: 1, marginRight: '10px' }}
      />
      <Button type="submit" sx={{ minWidth: 'auto', padding: '0', color: '#490057' }}>
        <SendIcon />
      </Button>
    </form>
        </div>
        <EditPostForm
              open={editFormOpen}
              onClose={handleCloseEditForm}
              onSubmit={handleSubmitEditForm}
              post={post}
            
            />
            
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity="success"
      />
      </Card>

   
  );
}

export default Post; 