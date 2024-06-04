import React, { useState, useEffect } from "react";
import UserPosts from "./UserPosts";
import TopBar from "./TopBar";
import Side from "./Side";
import "./UserStyle.css"; // Import the CSS file
import SideChat from "./SideChat";
import { Button } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import "./ProfilePage.css";

function FriendsPosts() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [menuOpen, setMenuOpen] = useState(false);
  const [buttonToggled, setButtonToggled] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setButtonToggled(!buttonToggled);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/users/${userId}/friends-posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const postList = data._embedded
          ? data._embedded.postList
          : data.postList;
        setPosts(postList || []);
        console.log(postList);
      })
      .catch((error) => console.error("Error fetching friends posts:", error));
  }, [userId, token]);

  return (
    <div className="friends-posts">
      <div className="grid-container">
        <div className="top" style={{ marginBottom: "100px" }}>
          <TopBar />
        </div>

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
            <MenuIcon style={{ width: "30px", height: "30px" }} />
          </Button>
        </div>
        <div className={`side ${menuOpen ? "open" : ""}`}>
          <Side />
        </div>
      

        <div className="mid" style={{ minHeight: "900px" }}>
          {posts.length === 0 ? (
            <h2
              style={{
                color: "#c0bcbc",
                textAlign: "center",
                fontSize: "35px",
              }}
            >
              {" "}
              Add friends to Explore their posts{" "}
            </h2>
          ) : (
            <>
              <h2
                style={{ color: "#FF9B00", fontFamily: "Poppins, sans-serif" }}
              >
                Friends Posts
              </h2>
              {posts.map((post) => (
                <div key={post.id} className="post">
                  <UserPosts userId={post._links.user.href.split("/").pop()} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FriendsPosts;
