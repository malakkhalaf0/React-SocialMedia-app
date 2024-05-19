
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

import CreatePostForm from './Components/CreatePostForm';

import ProtectedRoute from './Components/ProtectedRoute';


import PostList from './Components/PostList';
  const App = () => {
    const user = localStorage.getItem('username');
   // const token ='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb3RheiIsImlhdCI6MTcxNjAyNzg4MiwiZXhwIjoxNzE2MTE0MjgyfQ.lSe66wEVfw07us5BNUTuDFcTFL54p8HKrM7IZAxYJjI';
    function UserWrapper({ token }) {
      const { userId } = useParams();
    
      return <User userId={userId} token={token} />;
     
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
                  {/* <Routes>
                  <Route path="/users/:userId/profiles/:profileId" element={<Profile />} />
               
                    <Route path="/users/:userId/posts/:postId" element={<SinglePost />} />
                    <Route path="/hashtags/:hashtag" element={<HashtagPosts />} />
                   
                    <Route path="/users/:userId" element={<UserWrapper  />} />
                    <Route path="/postlist"element ={<PostList />}/>
                        </Routes> */}
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

