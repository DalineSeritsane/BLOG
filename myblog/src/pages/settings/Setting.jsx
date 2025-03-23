import React from 'react'
import "./setting.css";
import Sidebar from "../../sidebar/Sidebar";
import profile from "../../Image/profile.jpg";

 function Setting() {
  return (
    <div className="setting">
      <div className="settingWrapper">
        <div className="settingTitle">
          <span className="settingUpdateTitle">Update Your Account</span>
          <span className="settingDeleteTitle">Delete Account</span>
        </div>
      </div>
      <form className="settingForm">
        <label>Profile Picture</label>
        <div className="settingPP">
          <img  src={profile} alt='' />
          <label htmlFor="fileInput">
          <i className="settingPPIcon fa-solid fa-user"></i>
          </label>
          <input type="file" id="fileInput" style={{display:'none'}} />
        </div>
        <label>Username</label>
        <input type="text" placeholder='Swarts' />
        <label>Email</label>
        <input type="text" placeholder='swarts1@gmail.com' />
        <label>Password</label>
        <input type="password"/>
        <button className="settingSubmit">Update</button>
      </form>
      <Sidebar />
    </div>
  )
}
export default Setting;