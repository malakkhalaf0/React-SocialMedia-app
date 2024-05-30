import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { ref, onValue, push } from 'firebase/database';
import './Chat.css';
import TopBar from './TopBar';
import SideChat from './SideChat';
import { Avatar } from '@mui/material';
import TopChat from './TopChat';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [receiver, setReceiver] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const loggedInUser = localStorage.getItem('username');

    useEffect(() => {
        const messageRef = ref(db, 'messages');
        onValue(messageRef, (snapshot) => {
            const messages = snapshot.val();
            const messageList = [];
            for (let id in messages) {
                messageList.push({ id, ...messages[id] });
            }
            setMessages(messageList);
        });

        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:8080/users", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                setUsers(data._embedded.userList);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [loggedInUser]);

    const sendMessage = (e) => {
        e.preventDefault();
        const messageRef = ref(db, 'messages');
        const newMessage = {
            sender: loggedInUser,
            receiver: receiver,
            message,
        };
        push(messageRef, newMessage);
        setMessage('');
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="gridd" style={{gap:'5px'}}>
            <div className="topp"><TopChat sx={{width:'1000px'}}/></div>
            <div className="sidee"><SideChat /></div>
            <div className="midd" style={{marginTop:'0'}}>
                <div className="chat-container">
                    <div className="chat-sidebar">
                        <div className="chat-sidebar-header">
                            <h2 style={{ color: '#FF9B00', fontFamily: 'Poppins, sans-serif' }}>chats</h2>
                            <input
                                type="text"
                                placeholder="Search chats..."
                                className="chat-search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="chat-sidebar-users">
                            {filteredUsers.map(user => (
                                <div key={user.id} className="chat-user" onClick={() => setReceiver(user.username)}>
                                    <Avatar style={{backgroundColor:'#490057'}}>
                                        {user.username.charAt(0)} {/* Displaying first character of username */}
                                    </Avatar>
                                    <div>
                                        <strong style={{fontFamily: 'Poppins, sans-serif' }}>{user.username}</strong>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="chat-main">
                        <div className="chat-header">
                            <div style={{display:'flex',  alignItems: 'center' ,gap:'3px'}}>
                                {receiver ? (
                                    <>
                                        <Avatar style={{backgroundColor:'#490057'}}>{receiver.charAt(0)}</Avatar>
                                        <h3 style={{fontFamily: 'Poppins, sans-serif' }}>{receiver}</h3>
                                    </>
                                ) : (
                                    'Choose a user to message'
                                )}
                            </div>
                        </div>
                        {receiver ? (
                            <>
                                <div className="chat-messages">
                                    {messages
                                        .filter(msg => (msg.sender === loggedInUser && msg.receiver === receiver) || (msg.sender === receiver && msg.receiver === loggedInUser))
                                        .map((msg) => (
                                            <div key={msg.id} className={`chat-message ${msg.sender === loggedInUser ? 'sent' : 'received'}`}>
                                                <strong>{msg.sender}:</strong> {msg.message}
                                            </div>
                                        ))}
                                </div>
                                <form className="chat-form" onSubmit={sendMessage}>
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type a message"
                                    />
                                    <button className='send'>
                                        <div className="svg-wrapper-1">
                                            <div className="svg-wrapper">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                    height="24"
                                                >
                                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                                    <path
                                                        fill="currentColor"
                                                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <span>Send</span>
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="no-receiver">
                                <p>Please select a user to start messaging.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;