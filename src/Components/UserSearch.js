import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar'; // Import Avatar component
import './UserSearch.css';

function UserSearch({ token }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (query.trim() !== '') {
          const response = await fetch(`http://localhost:8080/users/1/search?query=${query}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('data', data);

          const postList = data._embedded && data._embedded.postList ? data._embedded.postList : [];
          const userList = data._embedded && data._embedded.userList ? data._embedded.userList : [];
          const combinedResults = [...postList, ...userList];
          
          setResults(combinedResults);
          console.log(combinedResults);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query, token]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setQuery('');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const hasPosts = results.some(result => result.caption);
  const hasUsers = results.some(result => result.username);

  return (
    <div className="search-container" ref={inputRef}>
      <div className="search-wrapper">
        <SearchIcon className="search-icon" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          className="search-input"
          style={{textDecoration:'none',  outline: 'none'}}
        />
      </div>
      <div className="search-results">
        {hasUsers && (
          <div className="user-list">
            {results
              .filter(result => result.username) // Ensure only valid users are rendered
              .map((result, index) => (
                <div className="user-card" key={index}>
                  <div className="user-info">
                    <Avatar>
                      {result.username.charAt(0)} {/* Displaying first character of username */}
                    </Avatar>
                    <Link to={`/users/${result.id}/profiles/1`}>
                      <p>{result.username}</p>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        )}
        {hasPosts && (
          <Link to={`/postlist?query=${query}`}>Search for posts that have {query}</Link>
        )}
      </div>
    </div>
  );
}

export default UserSearch;