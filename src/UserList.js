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
  //const token ='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb3RheiIsImlhdCI6MTcxNjAyNzg4MiwiZXhwIjoxNzE2MTE0MjgyfQ.lSe66wEVfw07us5BNUTuDFcTFL54p8HKrM7IZAxYJjI';
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
      <div className="top" style={{ marginBottom: '100px'}}><TopBar /></div>
      <div className="side" style={{marginLeft:'80px'}}> <Side></Side></div>
      <div className="mid">
      <div className='container'>
        <div className='posts-section'>
          
           <CreatePostForm  userId={userId} onPostCreated={handlePostCreated}/>
        <div>
              {users.map(user => (

                <UserPosts key={user.id} userId={user.id} token={token} postUpdated={postUpdated} />

              ))}
            </div></div>
       
        <div className='recommended-friends-section'>

<RecommendedFriends userId={userId} token={token} />
</div>
</div>

    </div>
    </div>
  );
}


export default UserList;
