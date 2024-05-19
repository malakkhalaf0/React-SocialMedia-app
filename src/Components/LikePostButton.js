
// import React, { useState , useEffect } from 'react';
// import PostLikes from './PostLikes';

// function LikePostButton({ postId, userId, token }) {
//     const [isLiked, setIsLiked] = useState(false);
//     const [likeId, setLikeId] = useState(null); // Track the id of the like
//     const [updated, setUpdated] = useState(false);

//     useEffect(() => {
//         const fetchLikes = async () => {
//             try {
//                 const response = await fetch(`http://localhost:8080/posts/${postId}/likes`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
        
//                 if (response.ok) {
//                     const data = await response.json();
//                     const postLikes = data._embedded && data._embedded.postLikeList ? data._embedded.postLikeList : [];
//                     //console.log(postLikes);
//                     const userLike = postLikes.find(like => like._links.user.href === `http://localhost:8080/users/${userId}`);
//                  //   console.log(userLike.id);
//                     setIsLiked(!!userLike);
//                     console.log("hi shahd "+!!userLike);
//                     if (userLike) {

//                         setLikeId(userLike.id);
//                         console.log("hi "+ isLiked);
//                     }

//                 } 
                
//                 else {
//                     setIsLiked(false);
//                     setLikeId(null);
//                 }
//             } catch (error) {
//                 console.error('Error fetching likes:', error);
//             }
//         };
        

//         fetchLikes();
//     }, [postId, userId, token, updated]);

//     const handleLikePost = async () => {
//         try {
//             if (isLiked) {
//                 // Unlike the post
//                 const response = await fetch(`http://localhost:8080/posts/${postId}/likes/${likeId}`, {
//                     method: 'DELETE',
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to unlike post');
//                 }

//                 setIsLiked(!isLiked);
//                 setLikeId(null);
//                 setUpdated(!updated); // Trigger re-fetch of likes after unliking
//             } else {
//                 // Like the post
//                 const response = await fetch(`http://localhost:8080/posts/${postId}/users/${userId}/likes`, {
//                     method: 'POST',
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to like post');
//                 }

//                 const responseData = await response.json();
//                 setIsLiked(!isLiked);
//                 setLikeId(responseData.id);
//                 setUpdated(!updated); // Trigger re-fetch of likes after liking
//             }
//         } catch (error) {
//             console.error('Error liking/unliking post:', error);
//         }
//     };

//     return (

//              <>
//             <PostLikes postId={postId} token={token} onLikeAdded={updated} />

//             <button onClick={handleLikePost}>
//                 {isLiked ? 'Unlike' : 'Like'}
//             </button>
//         </>
//     );
// }

// export default LikePostButton;
  


import React, { useState, useEffect } from 'react';
import PostLikes from './PostLikes';
import './style.css'; // Ensure this CSS file includes the provided CSS styles for the heart button

function LikePostButton({ postId, userId, token }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(`http://localhost:8080/posts/${postId}/likes`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          const postLikes = data._embedded?.postLikeList || [];
          const userLike = postLikes.find(like => like._links.user.href === `http://localhost:8080/users/${userId}`);
          setIsLiked(!!userLike);
          if (userLike) {
            setLikeId(userLike.id);
          } else {
            setLikeId(null);
          }
        } else {
          setIsLiked(false);
          setLikeId(null);
        }
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    fetchLikes();
  }, [postId, userId, token, updated]);

  const handleLikePost = async () => {
    try {
      if (isLiked) {
        const response = await fetch(`http://localhost:8080/posts/${postId}/likes/${likeId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to unlike post');
        }

        setIsLiked(false);
        setLikeId(null);
      } else {
        const response = await fetch(`http://localhost:8080/posts/${postId}/users/${userId}/likes`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to like post');
        }

        const responseData = await response.json();
        setIsLiked(true);
        setLikeId(responseData.id);
        console.log(responseData);
      }

      setUpdated(!updated); // Trigger re-fetch of likes after liking/unliking
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  return (
    <>
    <div className="post-interaction">
      <PostLikes postId={postId} token={token} onLikeAdded={updated} />
      <div style={{ color:'#490057'}}>|
      </div>
      <label className="ui-like">
        <input 
          type="checkbox" 
          checked={isLiked}
          onChange={handleLikePost}
        />
        <div className="like">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="">
            <path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z"></path>
          </svg>
        </div>
      </label>
    </div>
  </>
  );
}

export default LikePostButton;