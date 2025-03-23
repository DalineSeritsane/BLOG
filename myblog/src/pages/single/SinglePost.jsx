import React from 'react'
import "./singlePost.css";
import paris from "../../Image/paris.jpg";

function SinglePost() {
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img className="singlePostImg" src={paris} alt='' />
        <h1 className="singlePostTitle">Lorem ipsum dolor si.
            <div className="singlePostEdit">
             <i className="singlePostIcon fa-solid fa-pen-to-square"></i>
             <i className="singlePostIcon fa-solid fa-trash"></i>
            </div>
        </h1>
        <div className="singlePostInfo">
            <span className="singlePostAuthor">Author: <b>Swarts</b></span>
            <span className="singlePostDate"> 1 hour ago</span>
        </div>
        <p className="singlePostDesc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga mollitia debitis voluptate vitae minus voluptatem magni, harum deserunt atque itaque. Ea officia nesciunt delectus cum! Ipsum, ullam. Tempora, dignissimos a.
        em ipsum dolor sit amet consectetur adipisicing elit. Fuga mollitia debitis voluptate vitae minus voluptatem magni, harum deserunt atque itaque. Ea officia nesciunt delectus cum! Ipsum, ullam. Tempora, dignissimos a.
        em ipsum dolor sit amet consectetur adipisicing elit. Fuga mollitia debitis voluptate vitae minus voluptatem magni, harum deserunt atque itaque. Ea officia nesciunt delectus cum! Ipsum, ullam. Tempora, dignissimos a.
        em ipsum dolor sit amet consectetur adipisicing elit. Fuga mollitia debitis voluptate vitae minus voluptatem magni, harum deserunt atque itaque. Ea officia nesciunt delectus cum! Ipsum, ullam. Tempora, dignissimos a.
        em ipsum dolor sit amet consectetur adipisicing elit. Fuga mollitia debitis voluptate vitae minus voluptatem magni, harum deserunt atque itaque. Ea officia nesciunt delectus cum! Ipsum, ullam. Tempora, dignissimos a.
        em ipsum dolor sit amet consectetur adipisicing elit. Fuga mollitia debitis voluptate vitae minus voluptatem magni, harum deserunt atque itaque. Ea officia nesciunt delectus cum! Ipsum, ullam. Tempora, dignissimos a.
        </p>
      </div>
    </div>
  )
}
export default SinglePost;