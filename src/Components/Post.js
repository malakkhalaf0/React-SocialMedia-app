import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostComments from './PostComments';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import LikePostButton from './LikePostButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { green } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import PublicIcon from '@mui/icons-material/Public';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import SendIcon from '@mui/icons-material/Send';
import RepeatIcon from '@mui/icons-material/Repeat';
import Snackbar from '@mui/material/Snackbar';
import EditPostForm from './EditPostForm';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { BorderColorSharp } from '@mui/icons-material';




function Post({ post, token, userId , onPostChange }) {
  const [commentText, setCommentText] = useState('');
  const [commentsUpdated, setCommentsUpdated] = useState(false);
  const [userName, setUserName] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const userIdc = localStorage.getItem('userId');

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
        
      }
   else{
    throw new Error('Failed to share post');
   }
      // Optionally, you can handle success here (e.g., show a success message)
    } catch (error) {
      console.error('Error sharing post:', error);
      // Optionally, you can handle errors here (e.g., show an error message)
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
    <>
      <Card sx={{ maxWidth: 800 }}>
     
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">{userName ? userName.charAt(0).toUpperCase() : ''}</Avatar>}
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
          title={userName}
          subheader={post.audiance === 'PUBLIC' ? (
            <>
              {new Date(post.date).toLocaleString()}
              <PublicIcon />
            </>
          ) : (
            <>
              {new Date(post.date).toLocaleString()}
            </>
          )}
        />
      <div className="post">
          <h3>{renderCaptionWithLinks()}</h3> <br/>
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
            <div style={{ color :'#A303A0'}} >_________________________________________________________________</div>
            <br></br>
          <div className='CL'>
      <Button onClick={handleCommentsToggle} style={{ textTransform: 'lowercase' ,  color :'#490057'}}>
        Comments
      </Button>

      {/* Dialog for displaying comments */}
      <Dialog open={showComments} onClose={handleCommentsToggle} >
        <DialogTitle>Comments</DialogTitle>
        <DialogContent >
          <PostComments postId={post.id} token={token} commentsUpdated={commentsUpdated}  />
        </DialogContent>
      </Dialog>

            <LikePostButton postId={post.id} userId={userIdc} token={token}/> 
            <Button sx={{ border: 'none', outline: 'none',color:'#490057' }} onClick={handleShare}><RepeatIcon /></Button>
          </div>
          <form onSubmit={handleSubmit}>
            <br/>
            <InputBase
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              placeholder=" Write a Comment..."
              inputProps={{ 'aria-label': 'Write a Comment...' }}
              sx={{ border: '1px solid #490057', borderRadius: '10px' , width: '500px' , color: '#490057'}}
            />
            <Button type="submit"  sx={{ width: '50px', height: '30px',fontSize: '13px' ,color:'#490057' }}><SendIcon/></Button>
          </form>
        </div>
      </Card>
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
      />
    </>
  );
}

export default Post; 