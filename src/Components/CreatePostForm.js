// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import ImageIcon from '@mui/icons-material/Image';
// import VideoIcon from '@mui/icons-material/VideoLibrary';
// import './style.css';

// function CreatePostForm({ token, userId, onPostCreated }) {
//   const [caption, setCaption] = useState('');
//   const [audiance, setAudiance] = useState('');
//   const [image, setImage] = useState(null);
//   const [video, setVideo] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('caption', caption);
//     formData.append('Audiance', audiance);
//     if (image) {
//       formData.append('image', image);
//     }
//     if (video) {
//       formData.append('video', video);
//     }

//     try {
//       const response = await fetch(`http://localhost:8080/users/${userId}/posts`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         body: formData,
//       });

//       if (response.ok) {
//         setSuccessMessage('Post created successfully!');
//         setCaption('');
//         setAudiance('');
//         setImage(null);
//         setVideo(null);
//         onPostCreated(); // Notify the parent component to refresh posts
//       } else {
//         const errorMessage = await response.text();
//         setErrorMessage(errorMessage);
//       }
//     } catch (error) {
//       console.error('Error creating post:', error);
//       setErrorMessage('Error creating post. Please try again later.');
//     }
//   };

//   return (
//     <div className="create-post-form">
//       <form onSubmit={handleFormSubmit}>
//         <div className="avatar-box">
//           <span className="avatar">{'u'.charAt(0).toUpperCase()}</span>
//         </div>
//         <div className="form-group">
//           <input
//             type="text"
//             placeholder="What's on your mind?"
//             value={caption}
//             onChange={(e) => setCaption(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <select
//             value={audiance}
//             onChange={(e) => setAudiance(e.target.value)}
//             required
//           >
//             <option value="" disabled>Select audience</option>
//             <option value="PUBLIC">PUBLIC</option>
//             <option value="PRIVATE">PRIVATE</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImage(e.target.files[0])}
//             style={{ display: 'none' }}
//             id="image-input"
//           />
//           <label htmlFor="image-input">
//             <Button component="span" startIcon={<ImageIcon />}>
//               Image
//             </Button>
//           </label>
//           <input
//             type="file"
//             accept="video/*"
//             onChange={(e) => setVideo(e.target.files[0])}
//             style={{ display: 'none' }}
//             id="video-input"
//           />
//           <label htmlFor="video-input">
//             <Button component="span" startIcon={<VideoIcon />}>
//               Video
//             </Button>
//           </label>
//         </div>
//         <button type="submit" className="create-post-button">
//           Create Post
//         </button>
//       </form>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       {successMessage && <p className="success-message">{successMessage}</p>}
//     </div>
//   );
// }

// export default CreatePostForm;
    
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ImageIcon from '@mui/icons-material/Image';
import VideoIcon from '@mui/icons-material/VideoLibrary';
import './style.css';

function CreatePostForm({ token, userId, onPostCreated}) {
  const [caption, setCaption] = useState('');
  const [audiance, setAudiance] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('Audiance', audiance);
    if (image) {
      formData.append('image', image);
    }
    if (video) {
      formData.append('video', video);
    }

    try {
      const response = await fetch(`http://localhost:8080/users/${userId}/posts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage('Post created successfully!');
        setCaption('');
        setAudiance('');
        setImage(null);
        setVideo(null);
        onPostCreated(); // Notify the parent component to refresh posts
      } else {
        const errorMessage = await response.text();
        setErrorMessage(errorMessage);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setErrorMessage('Error creating post. Please try again later.');
    }
  };

  return (
    <div className="create-post-form">
      <form onSubmit={handleFormSubmit}>
        <div className="form-header">
          <div className="avatar-box">
            <span className="avatar1">{'u'.charAt(0).toUpperCase()}</span>
          </div>
          <input
            type="text"
            placeholder="What's on your mind?"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
            className="caption-input"
          />
        </div>
        <div className="form-group">
          <select
            value={audiance}
            onChange={(e) => setAudiance(e.target.value)}
            required
            className="audience-select"
          >
            <option value="" disabled>Select audiance</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ display: 'none' }}
            id="image-input"
          />
          <label htmlFor="image-input">
            <Button component="span" startIcon={<ImageIcon />}>
              Image
            </Button>
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            style={{ display: 'none' }}
            id="video-input"
          />
          <label htmlFor="video-input">
            <Button component="span" startIcon={<VideoIcon />}>
              Video
            </Button>
          </label>
          <button type="submit" className="create-post-button">
            Create Post
          </button>
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default CreatePostForm;