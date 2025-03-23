import React from 'react'
import "./single.css";
import Sidebar from "../../sidebar/Sidebar";
import SinglePost from "../single/SinglePost"

 function Single() {
  return (
    <div className="single">
      <SinglePost />
      <Sidebar />
    </div>
  )
}
 export default Single;