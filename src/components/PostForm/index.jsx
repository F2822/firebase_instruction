import React, { useState } from "react";

import "./index.css";

/**
 * @typedef PostFormProps
 * @property {string} [title]
 * @property {string} [body]
 * @property {string} [imgSrc]
 * @property {(post: Object) => void} onSubmit
 */

/**
 * @param {PostFormProps} props
 * @return {JSX.Element}
 * @constructor
 */
const PostForm = (props) => {
  const [isReplaceImage, setIsReplaceImage] = useState(!props.imgSrc);

  const handleSubmit = (event) => {
    event.preventDefault();

    const postUpdates = {
      title: event.target.elements.title.value,
      body: event.target.elements.body.value
    };

    const newImage = event.target.elements.image?.files[0];
    if (newImage) {
      postUpdates.image = newImage;
    }

    props.onSubmit(postUpdates);
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <label htmlFor="post-title">Title</label>
      <input id="post-title" type="text" name="title" defaultValue={props.title} />
      <label htmlFor="post-text">Body</label>
      <input id="post-text" type="text" name="body" defaultValue={props.body} />
      <label htmlFor="post-image">Image</label>
      {isReplaceImage ? (
        <input
          id="post-image"
          type="file"
          name="image"
          accept="image/*"
        />
      ) : (
        <div className="post-form__image-src">
          <span>{props.imgSrc}</span>
          <button type="button" onClick={() => setIsReplaceImage(!isReplaceImage)}>Replace</button>
        </div>
      )}
      <button className="post-form__save-button" type="submit">Save</button>
    </form>
  );
};

export default PostForm;