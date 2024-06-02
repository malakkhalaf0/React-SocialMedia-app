import React, { useState, useEffect } from 'react';
import Post from './Post';
import TopBar from './TopBar';
import Side from './Side';
import { Link } from 'react-router-dom';
import './AllHashtags.css';
import './UserStyle.css'; // Import the CSS file
import { Menu as MenuIcon } from '@mui/icons-material';
import {  Button } from '@mui/material';

function AllHashtags() {
  const [posts, setPosts] = useState([]);
  const [allHashtags, setAllHashtags] = useState([]);
  const token = localStorage.getItem('token');
  const [menuOpen, setMenuOpen] = useState(false);
  const [buttonToggled, setButtonToggled] = useState(false);
 
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setButtonToggled(!buttonToggled);
  };
  
    // Fetch posts related to all hashtags
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/hashtags/posts`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        const postList = data._embedded ? data._embedded.postList : data.postList;
        setPosts(postList || []);
      } catch (error) {
        console.error('Error fetching friends posts:', error);
      }
    };


    useEffect(() => {
      fetchPosts();
  }, [token]);
  const handlePostChange = () => {
    fetchPosts();
  };
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

      <div className="mid" style={{minHeight:'900px'}}>
        <div className="content">

          
          <div className="posts-section">
          <h2 className="section-title" style={{ color: '#FF9B00', fontFamily: 'Poppins, sans-serif' }}>Posts</h2>
          {posts.map(post => (
              <div key={post.id} className="post">
                <Post key={post.id} post={post} userId={post._links.user.href.split('/').pop()}  onPostChange={handlePostChange}/>
              </div>
            ))}
             </div>
          
            <div className="hashtags-section">
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

export default AllHashtags;
