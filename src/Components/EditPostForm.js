import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ImageIcon from '@mui/icons-material/Image';
import VideoIcon from '@mui/icons-material/VideoLibrary';
import ClearIcon from '@mui/icons-material/Clear';

function EditPostForm({ open, onClose, onSubmit, post }) {
  const [audiance, setAudiance] = useState(post.audiance || '');
  const [caption, setCaption] = useState(post.caption || '');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [removeVideo, setRemoveVideo] = useState(false);

  useEffect(() => {
    // Update state when the post prop changes
    setAudiance(post.audiance || '');
    setCaption(post.caption || '');
  }, [post]);

  const handleAudianceChange = (event) => {
    setAudiance(event.target.value);
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleImageChange = (event) => {
    // Reset removeImage state when a new image is uploaded
   setRemoveImage(false);
    setImage(event.target.files[0]);
  };

  const handleVideoChange = (event) => {
    setRemoveVideo(false);
    setVideo(event.target.files[0]);
  };

  const handleRemoveImage = () => {
    setRemoveImage(!removeImage);
    setImage(null);
  };

  const handleRemoveVideo = () => {
    setRemoveVideo(true);
    setVideo(null);
  };

  const handleSubmit = () => {
    onSubmit({ audiance, caption, image, video, removeImage, removeVideo });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Post</DialogTitle>
      <br />
      <DialogContent>
        <TextField
          select
          label="Audiance"
          value={audiance}
          onChange={handleAudianceChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          <MenuItem value="PUBLIC">Public</MenuItem>
          <MenuItem value="PRIVATE">Private</MenuItem>
        </TextField>

        <TextField
          label="Caption"
          value={caption}
          onChange={handleCaptionChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <div>
          {post.imageUrl && !removeImage && (
            <div>
              <img src={post.imageUrl} alt="Post Image" style={{ width: 100, height: 100, marginRight: 8 }} />
              <Button onClick={handleRemoveImage} startIcon={<ClearIcon />} variant="outlined" size="small">
                Remove Image
              </Button>
            </div>
          )}
          <Button component="label" startIcon={<ImageIcon />} sx={{ marginRight: 1 }}>
            Upload Image
            <input type="file" onChange={handleImageChange} />
          </Button>
        </div>

        <div>
          {post.videoUrl && !removeVideo && (
            <div>
              <video src={post.videoUrl} controls style={{ width: 200, height: 'auto', marginRight: 8 }} />
              <Button onClick={handleRemoveVideo} startIcon={<ClearIcon />} variant="outlined" size="small">
                Remove Video
              </Button>
            </div>
          )}
          <Button component="label" startIcon={<VideoIcon />}>
            Upload Video
            <input type="file"  onChange={handleVideoChange} />
          </Button>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditPostForm;