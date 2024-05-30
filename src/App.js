
import './App.css';

import React from 'react';

import SinglePost from './Components/SinglePost';
import HashtagPosts from './Components/HashtagPosts';
import Profile from './Components/Profile';
import User from './Components/User';
import { useParams } from 'react-router-dom';

import {  Routes, Route , useLocation } from 'react-router-dom';
import UserList from './UserList';
import Register from './Components/Register';
import LogIn from './Components/LogIn';

import CreatePostForm from './Components/CreatePostForm';

import ProtectedRoute from './Components/ProtectedRoute';
import OAuthRedirect from './Components/OAuthRedirect';

import PostList from './Components/PostList';
import FriendsPosts from './Components/FriendsPosts';
import AllHashtags from './Components/AllHashtags';

import Chat from './Components/Chat';
  const App = () => {
    const user = localStorage.getItem('username');
 
   // const token ='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb3RheiIsImlhdCI6MTcxNjAyNzg4MiwiZXhwIjoxNzE2MTE0MjgyfQ.lSe66wEVfw07us5BNUTuDFcTFL54p8HKrM7IZAxYJjI';
    function UserWrapper() {
      const { userId } = useParams();
    
      return <User userId={userId} />;
     
    }

    return (

      
    

    
      <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/login/oauth2/code/google" element={<OAuthRedirect />} />
    
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

<Route
        path="/FriendsPosts"
        element={<ProtectedRoute element={<FriendsPosts />} />}
      />


<Route
        path="/popular-hashtags"
        element={<ProtectedRoute element={<AllHashtags />} />}
      />


<Route path="/chat" element={<ProtectedRoute element={<Chat  />} />}
 />
    </Routes>


    
    


     
        
      

  );
}

// const ChatWrapper = () => {
//   const location = useLocation();
//   const { loggedInUser } = location.state || {}; // Retrieve loggedInUser from state

//   return <Chat loggedInUser={loggedInUser} />;
// };

  


  export default App;

