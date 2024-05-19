
// import React, { useState, useEffect } from 'react';
// import ProfileForm from './ProfileForm';
// import TopBar from './TopBar';
// import Side from './Side';
// import { useParams } from 'react-router-dom';
// import { Typography, Button, CircularProgress, Paper, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import Friends from './Friends';
// import { PersonOutline, CakeOutlined, LocationOnOutlined, GenderIdentity, AccessTime } from '@mui/icons-material'; // Import icons

// function Profile({ token }) {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [profileUser, setProfileUser] = useState(null); // State to store the user with the profile's user ID
//   const [randomProfilePic, setRandomProfilePic] = useState(null); // State to store the random profile picture URL
//   const { userId } = useParams();
//   const [profilePic, setProfilePic] = useState(fetchRandomProfilePic());

//   // Function to handle changing profile picture
//   const changeProfilePic = () => {
//     const newProfilePic = fetchRandomProfilePic();
//     setProfilePic(newProfilePic);
//   };

//   useEffect(() => {
//     fetchProfile();
//     fetchUsers();
//     // Fetch random profile picture when component mounts
//     fetchRandomProfilePic();
//   }, [userId, token]);

//   const fetchProfile = async () => {
//     changeProfilePic();
//     try {
//       const response = await fetch(`http://localhost:8080/users/${userId}/profiles/1`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) {
//         setProfile(null);
//         setLoading(false);
//         return;
//       }
//       const data = await response.json();
//       setProfile(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//       setLoading(false);
//     }
//   };

//   const fetchUsers = () => {
//     fetch('http://localhost:8080/users', {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch users');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log(data);
//         setUsers(data._embedded.userList);
//         // Find the user with the same ID as the profile's user ID
//         const profileUser = data._embedded.userList.find(user => user.id === parseInt(userId));
//         setProfileUser(profileUser);
//         console.log("Profile" + profileUser.id);
//       })
//       .catch(error => {
//         console.error('Error fetching users:', error);
//       });
//   };

//   function fetchRandomProfilePic() {
//     // Base URL for profile pictures
//     const baseUrl = "assets/";

//     // List of image filenames
//     const imageFiles = [
//       "240227-140308.jpg",
//       "240227-140312.jpg",
//       "240227-140312.jpg",
//       // Add more image filenames as needed
//     ];

//     // Randomly select an image filename
//     const randomIndex = Math.floor(Math.random() * imageFiles.length);
//     const randomImage = imageFiles[randomIndex];
//     console.log("randomImage" + randomImage)
//     // Construct the full URL
//     const imageUrl = baseUrl + randomImage;
//     console.log("imageUrl" + imageUrl)
//     // Return the URL
//     return imageUrl;
//   }

//   const handleEditProfile = () => {
//     setShowForm(true);
//   };

//   const handleCancel = () => {
//     setShowForm(false);
//   };

//   const handleUpdate = updatedProfileData => {
//     setProfile(updatedProfileData);
//     setShowForm(false);
//   };

//   // Function to get the user name based on user ID
//   const getUserName = () => {
//     const user = users.find(user => user.id === parseInt(userId));
//     return user ? user.username : 'Unknown';
//   };

//   return (
//     <div className="grid-container">
//     <div class="top"><TopBar/></div>
//      <div class="side"> <Side></Side></div>
//         <div class="mid">
//     <Box sx={{ p: 12, mt: 3, display: 'flex', alignItems: 'flex-start', color: '#D9D9D9'}}>
//       <Box sx={{ marginRight: 4 }}>
    
//         <img src="\images\images.jpg" alt="pic" style={{ width: 150, height: 150, borderRadius: '50%' }} />
//         <Typography variant="h4" sx={{ color: '#490057', fontFamily: 'Poppins, sans-serif' }}>  
//            {getUserName()}
//         </Typography>
//         <br></br>
//         <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2, color: '#490057', fontFamily: 'Poppins, sans-serif' }}>
//           <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif' }}>
//             {profile?.bio}
//           </Typography>
//           <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif' }}>
//             <CakeOutlined /> {profile?.dob}
//           </Typography>
//           <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif' }}>
//             <LocationOnOutlined /> {profile?.city}
//           </Typography>
//           <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif' }}>
//             <PersonOutline /> {profile?.gender}
//           </Typography>
//           {/* <Typography variant="h6">
//             <AccessTime /> Age: {profile?.age}
//           </Typography> */}
//         </Box>
//         <Button variant="contained" onClick={handleEditProfile} sx={{ mt: 2 }}>
//           Edit Profile
//         </Button>
//         <Dialog open={showForm} onClose={handleCancel}>
//           <DialogTitle>Edit Profile</DialogTitle>
//           <DialogContent>
//             <ProfileForm token={token} profile={profile} onCancel={handleCancel} onUpdate={handleUpdate} />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCancel}>Cancel</Button>
//           </DialogActions>
//         </Dialog>
//         {Friends && <Friends user={profileUser} token={token} />}
//       </Box>
//       <Box>
//         <Typography variant="h4" gutterBottom>
//           User Posts
//         </Typography>
//         {/* Add user posts grid here */}
//       </Box>
//     </Box>
//     </div>
//     </div>
//   );
// }

// export default Profile;
  

import React, { useState, useEffect } from 'react';
import ProfileForm from './ProfileForm';
import TopBar from './TopBar';
import Side from './Side';
import { useParams } from 'react-router-dom';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Friends from './Friends';
import { PersonOutline, CakeOutlined, LocationOnOutlined } from '@mui/icons-material'; // Import icons
import './ProfilePage.css'; // Import the CSS for styles
import UserPosts from './UserPosts';
import './Friends.css'; 
import FriendsList from './FriendsList';
import './style.css';

function Profile() {
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [profileUser, setProfileUser] = useState(null); // State to store the user with the profile's user ID
  const { userId } = useParams();
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYWxhayIsImlhdCI6MTcxNjExOTU5MywiZXhwIjoxNzE2MjA1OTkzfQ.bwUajAvTQcjPglvxKcTATb3KqhXj40qRdY0jK6nUdF4';
 
  useEffect(() => {
    fetchProfile();
    fetchUsers();
  }, [userId, token]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/${userId}/profiles/1`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setProfile(null);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setProfile(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  const fetchUsers = () => {
    fetch('http://localhost:8080/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data._embedded.userList);
        const profileUser = data._embedded.userList.find(user => user.id === parseInt(userId));
        setProfileUser(profileUser);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  const handleEditProfile = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleUpdate = updatedProfileData => {
    setProfile(updatedProfileData);
    setShowForm(false);
  };

  const getUserName = () => {
    const user = users.find(user => user.id === parseInt(userId));
    return user ? user.username : 'Unknown';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return (
      <div>
        <h2>Create Profile</h2>
        <ProfileForm token={token} onUpdate={handleUpdate} />
      </div>
    );
  }

  return (
    <div className="grid-container">
      <div className="top"><TopBar/></div>
      <div className="side"><Side/></div>
      <div className="mid" style={{ height: '200%'}}>
        <div className="profile-header">
          <img src="\images\images.jpg" alt="Profile" className="profile-pic"/>
          <div className="profile-info">
            <div className="profile-details-left">
              <h1 style={{ fontFamily: 'Poppins, sans-serif' }}>{getUserName()}</h1>
              <h4>{profile?.bio}</h4>
            </div>
            <div className="profile-actions">
              <div className='edit'>
                <div className='edit-button'>
                  <Button onClick={handleEditProfile}>Edit Profile</Button>
                </div>
                <div>
                  {Friends && <Friends user={profileUser} token={token} />}
                </div>
              </div>
              <Dialog open={showForm} onClose={handleCancel}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                  <ProfileForm token={token} profile={profile} onCancel={handleCancel} onUpdate={handleUpdate} />
                </DialogContent>
                <DialogActions className="my-button">
                  <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
        <section className="profile-details">
          <div className="about">
            <h3>About</h3>
            <ul>
              <li><PersonOutline /> {profile?.gender}</li>
              <li><CakeOutlined /> {profile?.dob}</li>
              <li><LocationOnOutlined /> {profile?.city}</li>
            </ul>
          </div>
          <div className="posts">
            <UserPosts userId={userId} />
          </div>
          <div className="suggestions">
            <FriendsList user={profileUser} token={token} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
