import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="menu">
          <Link className="link music" to="/?cat=music">
            <h6>Music</h6>
          </Link>
          <Link className="link elec" to="/?cat=electronic">
            <h6>Electronic</h6>
          </Link>
          <Link className="link healbea" to="/?cat=health">
            <h6>Health & Beauty</h6>
          </Link>
          <Link className="link furni" to="/?cat=furniture">
            <h6>Furniture</h6>
          </Link>
          <Link className="link cloth" to="/?cat=clothing">
            <h6>Clothing</h6>
          </Link>
          <Link className="link other" to="/?cat=other">
            <h6>Other</h6>
          </Link>
        </div>
        <div className="links">
        {currentUser && !currentUser.isAdmin && <span><FaUserAlt /> <Link className="link" to={`/profile/${currentUser?.id}`}> {currentUser?.username}</Link></span>}
        {currentUser && currentUser.isAdmin && (
  <span>
    <FaUserAlt />
    <span className="link">
      {currentUser?.username}
    </span>
  </span>
)}


          {currentUser?.username ? (
            <span className="logout" onClick={logout}>Logout</span>
          ) : (
            <Link className="link login" to="/login">
              Login
            </Link>
          )}
          
          {currentUser && !currentUser.isAdmin && (
  <Link className="link" to="/sell">
    <span className="sell">SELL</span>
  </Link>
)}

          {/* {currentUser && 
            <Link className="link" to="/sell">
              <span className="sell">
                SELL
              </span>
            </Link>
          } */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;