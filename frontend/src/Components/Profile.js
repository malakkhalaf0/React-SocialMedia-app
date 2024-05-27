
  

// import React, { useState, useEffect } from 'react';
// import ProfileForm from './ProfileForm';
// import TopBar from './TopBar';
// import Side from './Side';
// import { useParams } from 'react-router-dom';
// import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import Friends from './Friends';
// import { PersonOutline, CakeOutlined, LocationOnOutlined } from '@mui/icons-material'; // Import icons
// import './ProfilePage.css'; // Import the CSS for styles
// import UserPosts from './UserPosts';
// import './Friends.css'; 
// import FriendsList from './FriendsList';
// import './style.css';
// import CreatePostForm from './CreatePostForm';

// function Profile() {
//   const [postUpdated, setPostUpdated] = useState(false);
  
//   const handlePostCreated = () => {
//     setPostUpdated(!postUpdated);
//   };
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [profileUser, setProfileUser] = useState(null); // State to store the user with the profile's user ID
//   const { userId } = useParams();
//   const userIdp = localStorage.getItem('userId');
//   const token = localStorage.getItem('token');
 
//   useEffect(() => {
//     fetchProfile();
//     fetchUsers();
//   }, [userId, token]);

//   const fetchProfile = async () => {
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
//         setUsers(data._embedded.userList);
//         const profileUser = data._embedded.userList.find(user => user.id === parseInt(userId));
//         setProfileUser(profileUser);
//       })
//       .catch(error => {
//         console.error('Error fetching users:', error);
//       });
//   };

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

//   const getUserName = () => {
//     const user = users.find(user => user.id === parseInt(userId));
//     return user ? user.username : 'Unknown';
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!profile && userId === userIdp) {
//     return (
//       <div>
//         <h2>Create Profile</h2>
//         <ProfileForm token={token} onUpdate={handleUpdate} />
//       </div>
//     );
//   }

//   return (
//     <div className="grid-container">
//       <div className="top"><TopBar/></div>
//       <div className="side"><Side></Side></div>
//       <div className="mid">
//         <div className="profile-header">
//           <img src="\images\images.jpg" alt="Profile" className="profile-pic"/>
//           <div className="profile-info">
//             <div className="profile-details-left">
//               <h1 style={{ fontFamily: 'Poppins, sans-serif' }}>{getUserName()}</h1>
//               <h4>{profile?.bio}</h4>
//             </div>
//             <div className="profile-actions">
//             {userId === userIdp ? (
//                 <div className='edit'>
//                   <div className='edit-button'>
//                     <Button onClick={handleEditProfile}>Edit Profile</Button>
//                   </div>
                 
//                 </div>
//               ) : (
//                 <div>
//                     {Friends && <Friends user={profileUser} token={token} />}
//                   </div>
//               )}
              
//               <Dialog open={showForm} onClose={handleCancel}>
//                 <DialogTitle>Edit Profile</DialogTitle>
//                 <DialogContent>
//                   <ProfileForm token={token} profile={profile} onCancel={handleCancel} onUpdate={handleUpdate} />
//                 </DialogContent>
//                 <DialogActions className="my-button">
//                   <Button onClick={handleCancel}>Cancel</Button>
//                 </DialogActions>
//               </Dialog>
//             </div>
//           </div>
//         </div>
//         <section className="profile-details">
//           <div className="about">
//             <h3>About</h3>
//             <ul>
//               <li><PersonOutline /> {profile?.gender}</li>
//               <li><CakeOutlined /> {profile?.dob}</li>
//               <li><LocationOnOutlined /> {profile?.city}</li>
//             </ul>
//           </div>
//           <div className="posts">
//             {userId === userIdp && (
//               <CreatePostForm token={token} userId={userIdp} onPostCreated={handlePostCreated} />
//             )}
//             <UserPosts userId={userId} postUpdated={postUpdated} />
//             </div>
           
       
//           <div className="suggestions">
//             <FriendsList user={profileUser} token={token} />
//           </div>
//         </section>
//            </div>

      
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
import { PersonOutline, CakeOutlined, LocationOnOutlined } from '@mui/icons-material';
import './ProfilePage.css'; // Import the CSS for styles
import UserPosts from './UserPosts';
import './Friends.css'; 
import FriendsList from './FriendsList';
import './style.css';
import CreatePostForm from './CreatePostForm';

function Profile() {
  const [postUpdated, setPostUpdated] = useState(false);
  const handlePostCreated = () => {
    setPostUpdated(!postUpdated);
  };

  const [friendUpdated, setFriendUpdated] = useState(false);
  const handleCreatedfriend = () => {
    setFriendUpdated(!friendUpdated);
  };
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [profileUser, setProfileUser] = useState(null); // State to store the user with the profile's user ID
  const { userId } = useParams();
  const userIdp = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const [showFriend, setShowFriend] = useState(false);

  useEffect(() => {
    fetchAllProfiles();
    fetchUsers();
  }, [userId, token]);

  const fetchAllProfiles = async () => {
    try {
      const response = await fetch('http://localhost:8080/users/1/profiles', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch profiles');
      }
      const data = await response.json();
      console.log(data)
      const userProfile = data._embedded.profileList.find(profile => profile.user.id === parseInt(userId));
      if (userProfile) {
        fetchProfile(userProfile.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
      setLoading(false);
    }
  };

  const fetchProfile = async (profileId) => {
    try {
      const response = await fetch(`http://localhost:8080/users/${userId}/profiles/${profileId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    
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

  if (!profile && userId === userIdp) {
    return (
      <div>
        <h2>Create Profile</h2>
        <ProfileForm profile={null} token={token} onUpdate={handleUpdate} />
      </div>
    );
  }

  return (
    <div className="grid-container">
      <div className="top"><TopBar/></div>
      <div className="side"><Side></Side></div>
      <div className="mid">
        <div className="profile-header">
          <img src="\images\images.jpg" alt="Profile" className="profile-pic"/>
          <div className="profile-info">
            <div className="profile-details-left">
              <h1 style={{ fontFamily: 'Poppins, sans-serif' }}>{getUserName()}</h1>
              <h4>{profile?.bio}</h4>
            </div>
            <div className="profile-actions">
              {userId === userIdp ? (
                <div className='edit'>
                  <div className='edit-button'>
                    <Button onClick={handleEditProfile}>Edit Profile</Button>
                  </div>
                </div>
              ) : (
                <div>
                  {Friends && <Friends user={profileUser} token={token} onfriendUpdated={handleCreatedfriend}/>}
                </div>
              )}
              
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
            {userId === userIdp && (
              <CreatePostForm token={token} userId={userIdp} onPostCreated={handlePostCreated} />
            )}
            <UserPosts userId={userId} postUpdated={postUpdated} />
          </div>
          <div className="suggestions">
            <FriendsList user={profileUser} token={token}  friendUpdated={friendUpdated}/>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
