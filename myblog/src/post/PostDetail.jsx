import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './postDetail.css';

import beach from "../Image/beach.jpg";
import LasVegas from "../Image/LasVegas.jpg";
import paris from "../Image/paris.jpg";
import BodyWater from "../Image/BodyWater.jpg";
import france from "../Image/france.jpg";
import pool from "../Image/pool.jpg";
  

const posts = [
  { id: "beach", img: beach, title: "Beautiful Couples Day Beach", description: "Come to a world of relaxation and amazing sight to see at the beach "},
  { id: "LasVegas", img: LasVegas, title: "The city of lights", description: "Home to the biggest hotels in US, with the MGM Grand being the largest hotel best for couples "},
  { id: "paris", img: paris, title: "The city of true love", description: "Famous Monuments, Eiffel Tower and many more, streets of Paris overflow with culture, art, beauty and love "},
  { id: "BodyWater", img: BodyWater, title: "Travel on ships Couple", description: "Come to a world of relaxation and amazing sight to see oceans, lakes and wetlands "},
  { id: "france", img: france, title: "The Louvre Museum", description: "The roots of France romantic identity trace back to middle age, concept of courtly love"},
  { id: "pool", img: pool, title: "Beautiful Couples Day pool", description: "Come to a world of relaxation and amazing sight to see at the pool "},
];

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === postId);

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      <img src={post.img} alt={post.title} />
      <p>{post.description}</p>
      <button onClick={() => navigate('/')} className="back-button">
        Back to Blog
      </button>
    </div>
  );
};
   

export default PostDetail;
