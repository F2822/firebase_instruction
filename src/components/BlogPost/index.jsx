import React from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";

/**
 * @typedef BlogPostProps
 * @property {string} id
 * @property {string} title
 * @property {string} body
 * @property {string} imgSrc
 * @property {(id: string) => void} onDelete
 */

/**
 * @param {BlogPostProps} props
 * @return {JSX.Element}
 * @constructor
 */
const BlogPost = (props) => {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate("/blog/" + props.id);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    props.onDelete(props.id);
  };

  return (
    <div className="blog-post" onClick={handlePostClick}>
      {props.imgSrc && <img className="blog-post__image" src={props.imgSrc} alt={props.title} />}
      <div>
        <h4>{props.title}</h4>
        <p>{props.body}</p>
      </div>
      <span className="blog-post__delete-button" onClick={handleDeleteClick}>x</span>
    </div>
  );
};

export default BlogPost;