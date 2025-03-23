import React from 'react';
import "./sidebar.css";
import blogSidebar from "../Image/blog sidebar.jpg";

function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img src={blogSidebar} height="350px" alt='' />
                <p className="sidebarP">Welocme to my couples travel blog. Where couples all around can explore beautiful places around the world! Connecting with your soulmate with breath taking views. These destinantions are where the heart is for new love.</p>
            </div>
            <div classsName="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className="sidebarList">
                <li className="sidebarListItem">Las Vegas</li>
                <li className="sidebarListItem">Paris</li>
                <li className="sidebarListItem">Body of Water</li>
                <li className="sidebarListItem">Beaches</li>
                <li className="sidebarListItem">Animals</li>
                <li className="sidebarListItem">Hiking in nature</li>
            </ul>

            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
        <i className="sidebarIcon fa-brands fa-facebook"></i>
        <i className="sidebarIcon fa-brands fa-square-twitter"></i>
        <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
        <i className="sidebarIcon fa-brands fa-square-instagram"></i>
        </div>
            </div>
        </div>

    )
}

export default Sidebar;