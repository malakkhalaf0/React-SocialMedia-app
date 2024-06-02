import React, { useState, useEffect } from 'react';
import ProfileForm from './ProfileForm';
import TopBar from './TopBar';
import Side from './Side';
import { useParams } from 'react-router-dom';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Friends from './Friends';
import { PersonOutline, CakeOutlined, LocationOnOutlined, Menu as MenuIcon } from '@mui/icons-material';
import './ProfilePage.css'; // Import the CSS for styles
import UserPosts from './UserPosts';
import './Friends.css';
import FriendsList from './FriendsList';
import './style.css';
import CreatePostForm from './CreatePostForm';
import SideChat from "./SideChat";
import "./UserStyle.css"; // Import the CSS file

function Profile() {
  const [postUpdated, setPostUpdated] = useState(false);
  const [postp, setPostUpdatedp] = useState(true);
  const [friendUpdated, setFriendUpdated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [profileUser, setProfileUser] = useState(null);
  const { userId } = useParams();
  const userIdp = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const [menuOpen, setMenuOpen] = useState(false);
  const [buttonToggled, setButtonToggled] = useState(false);

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

  
  // Define the handleFriendUpdated function
  const handleFriendUpdated = () => {
    setFriendUpdated(!friendUpdated);
  };

  // Define the handlePostCreated function
  const handlePostCreated = () => {
    setPostUpdated(!postUpdated);
  };

  const handleUpdate = updatedProfileData => {
    setProfile(updatedProfileData);
    setShowForm(false);
  };

  const handleDialogOpen = () => {
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const getUserName = () => {
    const user = users.find(user => user.id === parseInt(userId));
    return user ? user.username : 'Unknown';
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setButtonToggled(!buttonToggled);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile && userId === userIdp) {
    return (
      <div className="grid-container" style={{height:'100vh'}}>
        <div className="top"><TopBar /></div>
        <div className="side"><Side /></div>
        <div className="mid">
          <ProfileForm profile={null} onUpdate={handleUpdate} />
        </div>
      </div>
    );
  } else if (!profile && userId !== userIdp) {
    return (
      <div className="grid-container" style={{height:'100vh'}}>
        <div className="top"><TopBar /></div>
        <div className="side"><Side /></div>
        <div className="sideee"><SideChat /></div>
        <div className="mid">
          <h1 style={{color:'#c0bcbc',textAlign:'center',fontSize:'70px'}}> Profile Not Found </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="grid-container" style={{height:'auto'}}>
      <div className="top"><TopBar /></div>
      <div className="side-toggle-button">
        <Button 
          onClick={toggleMenu} 
          style={{ 
            backgroundColor: buttonToggled ? "" : "",
            color: buttonToggled ? "transparent" : "#490057",
            width: buttonToggled ? "100px" : "30px",
            height: buttonToggled ? "100px" : "30px",
          }}
        >
          <MenuIcon style={{ width:"30px", height:"30px"}}/>
        </Button>
      </div>
      <div className={`side ${menuOpen ? 'open' : ''}`}><Side /></div>
      <div className="mid">
        <div className="profile-header">
          <img src="\images\images.jpg" alt="Profile" className="profile-pic" style={{marginLeft:'140px'}}/>
          {/* <Avatar className="profile-pic" style={{backgroundColor:'#490057', marginLeft:'140px', width:'100px',  // Set the desired width
    height: '100px', // Set the desired height
    fontSize: '50px'}}> */}
                                        {/* {getUserName().charAt(0)} </Avatar> {/* Displaying first character of username */}
                                    
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
                  <div className="suggestions22">
                    <button className='sugBtn' onClick={handleDialogOpen}>Show Friends</button>
                  </div>
                </div>
              ) : (
                <div>
                  {profileUser && <Friends user={profileUser} token={token} onfriendUpdated={handleFriendUpdated} />}
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
            <Dialog open={showDialog} onClose={handleDialogClose}>
              <DialogContent>
                <FriendsList user={profileUser} token={token} friendUpdated={friendUpdated} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose}>Close</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <div className="profile-details">
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
            <UserPosts userId={userId} postUpdated={postUpdated} postp={postp} />
          </div>
          <div className="suggestions">
            <FriendsList user={profileUser} token={token} friendUpdated={friendUpdated} />
          </div>
          <Dialog open={showDialog} onClose={handleDialogClose}>
            <DialogContent>
              <FriendsList user={profileUser} token={token} friendUpdated={friendUpdated} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Profile;
