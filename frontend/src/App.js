
import './App.css';

import React from 'react';

import SinglePost from './Components/SinglePost';
import HashtagPosts from './Components/HashtagPosts';
import Profile from './Components/Profile';
import User from './Components/User';
import { useParams } from 'react-router-dom';
import {  Routes, Route } from 'react-router-dom';
import UserList from './UserList';
import Register from './Components/Register';
import LogIn from './Components/LogIn';
import ProtectedRoute from './Components/ProtectedRoute';


import PostList from './Components/PostList';
  const App = () => {
    const user = localStorage.getItem('username');

    function UserWrapper() {
      const { userId } = useParams();
    
      return <User userId={userId} />;
     
    }

    return (
    
      <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/signup" element={<Register />} />
    
      <Route
        path="/home/*"
        element={
          <ProtectedRoute
            element={
        <div>
                  <UserList />
                  </div>
              
            }
          />
        }
      />
      <Route
          path="/users/:userId/profiles/:profileId"
          element={<ProtectedRoute element={<Profile />} />}
        />
         <Route
          path="/users/:userId/posts/:postId"
          element={<ProtectedRoute element={<SinglePost />} />}
        /> <Route
        path="/hashtags/:hashtag"
        element={<ProtectedRoute element={<HashtagPosts />} />}
      /> <Route
      path="/users/:userId" 
      element={<ProtectedRoute element={<UserWrapper  />} />}
    /> <Route
    path="/postlist"
    element={<ProtectedRoute element={<PostList />} />}
  />
    </Routes>
    
   // <AboutUs></AboutUs>


    );
    
  };


  export default App;

