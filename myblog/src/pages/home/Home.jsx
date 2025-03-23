import React from "react";
import "./Home.css";
import Header from "../../header/Header";
import Sidebar from "../../sidebar/Sidebar";
import Posts from "../../posts/Posts";

function Home() {
  return (
    <>
    <Header />
    <div className="home">
      <Posts />
      <Sidebar />
        
        
      
    </div>
    </>
    
  );
};


export default Home;