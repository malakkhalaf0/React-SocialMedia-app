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
  const [allHashtags, setAllHashtags] = useState([]);
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

  useEffect(() => {
    // Fetch all hashtags
    const fetchAllHashtags = async () => {
      try {
        const response = await fetch(`http://localhost:8080/hashtags/all`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch all hashtags');
        }
        const data = await response.json();
        setAllHashtags(data);
      } catch (error) {
        console.error('Error fetching all hashtags:', error);
      }
    };

    fetchAllHashtags();
  }, [token]);




  return (
    <div className="grid-container">
      <div className="top" style={{ marginBottom: '100px'}}><TopBar /></div>
      <div className="side"> <Side></Side></div>
      <div className="mid">
      <div className='container'>
        <div className='posts-section'>
          
           <CreatePostForm  userId={userId} onPostCreated={handlePostCreated}/>
        <div>
              {users.map(user => (

                <UserPosts key={user.id} userId={user.id} token={token} postUpdated={postUpdated} />

              ))}
            </div>
        </div>
       
        <div className='recommended-friends-section'>

<RecommendedFriends userId={userId} token={token} />
<br></br>
<h2 className="section-title" style={{ color: '#FF9B00', fontFamily: 'Poppins, sans-serif' }}>Popular Hashtags</h2>
<ul className="hashtags-list">
              {allHashtags.map(tag => (
                <li key={tag.id}><Link to={`/hashtags/${tag.name}`}> <span className="hashtag-circle">#</span>{tag.name}</Link></li>
              ))}
            </ul>
      
</div>
</div>

    </div>
    </div>
  );
}


export default UserList;
