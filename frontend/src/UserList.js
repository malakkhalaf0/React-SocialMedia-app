import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom'; 
import TopBar from './Components/TopBar';
import Side from './Components/Side';
import './Components/style.css';
import CreatePostForm from './Components/CreatePostForm';
import Logout from './Components/Logout';
import UserPosts from'./Components/UserPosts';
import RecommendedFriends from './Components/RecommendedFriends';
function UserList() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  
  const [postUpdated, setPostUpdated] = useState(false);
  
  const handlePostCreated = () => {
    setPostUpdated(!postUpdated);
  };

  useEffect(() => {
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
      
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [token]);





  return (
    <div className="grid-container">
      <div class="top" style={{ marginBottom: '100px'}}><TopBar /></div>
      <div class="side" style={{marginLeft:'80px'}}> <Side></Side></div>
      <div class="mid">
      <div className='container'>
        <div className='posts-section'>
          
           <CreatePostForm token={token} userId={userId} onPostCreated={handlePostCreated}/>
        <div>
              {users.map(user => (

                <UserPosts key={user.id} userId={user.id} token={token} postUpdated={postUpdated} />

              ))}
            </div>
        </div>
       
        <div className='recommended-friends-section'>

<RecommendedFriends userId={userId} token={token} />
</div>
</div>

{users.map(user => (
  <div key={user.id}>
    <h1>User: {user.username}</h1>
   
    <Link to={`/users/${user.id}/profiles/1`}>View Profile</Link>
    <br></br>
    <Link to={`/users/${user.id}`}>View user account</Link>

  </div>
  
))}
  
  <Link to={`/users/1/profiles/1`}>View </Link>
    </div>
    </div>
  );
}


export default UserList;
