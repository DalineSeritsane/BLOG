import React from 'react'
import "./Navbar.css";
import profile from "../Image/profile.jpg";
import { Link } from 'react-router-dom';

function Navbar() {
  const user = false;
  return (
    <div className="nav">
      <div className="navLeft">
        <i className="navIcon fa-brands fa-facebook"></i>
        <i className="navIcon fa-brands fa-square-twitter"></i>
        <i className="navIcon fa-brands fa-square-pinterest"></i>
        <i className="navIcon fa-brands fa-square-instagram"></i>
      </div>
      <div className="navCenter">
        <ul className="navList">
            <li className="navListItem">
              <Link className="link" to="/">HOME</Link>
            </li>
            <li className="navListItem">
               <Link className="link" to="/about">ABOUT</Link></li>
            <li className="navListItem">
            <Link className="link" to="/contact">CONTACT</Link>
            </li>
            <li className="navListItem">
            <Link className="link" to="/write">WRITE</Link>
            </li>
            <li className="navListItem">
              {user && "LOGOUT"}
            </li>
        </ul>
      </div>
      <div className="navRight">
        {
          user ? (
            <img className="navImg"
         src={profile}  
        alt=''></img>
          ) : (
            <ul className="navList">
              <li className="navListItem">
            <Link className="link" to="/login">
            LOGIN
            </Link>
          </li>
          <li className="navListItem">
            <Link className="link" to="/register">
            REGISTER
            </Link>
          </li>
            </ul>
          )
        }
        
        <i className="searchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  )
}

export default Navbar
