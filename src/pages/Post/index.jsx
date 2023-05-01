import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get, getDatabase, ref as dbRef, update } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import Layout from "../../components/Layout";
import PostForm from "../../components/PostForm";

import "./index.css";

const Post = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [post, setPost] = useState(null);

  let { postId } = useParams();

  useEffect(() => {
    const database = getDatabase();
    const postRef = dbRef(database, "blog/" + postId);
    get(postRef).then((snapshot) => {
      if (snapshot.exists()) {
        const post = snapshot.val();
        setPost(post);
      }
    });
  }, [postId]);

  const handleSubmit = async (postUpdates) => {
    let imgSrc = post.imgSrc;

    if (postUpdates.image) {
      const storage = getStorage();

      if (post.imgSrc) {
        const oldImageName = post.imgSrc.match(/%2F(.+?)\?/)[1];
        const oldImageRef = storageRef(storage, "images/" + oldImageName);
        await deleteObject(oldImageRef);
      }

      const newImageRef = storageRef(storage, "images/" + postUpdates.image.name);
      const snapshot = await uploadBytes(newImageRef, postUpdates.image);
      imgSrc = await getDownloadURL(snapshot.ref);
    }

    const database = getDatabase();
    const postRef = dbRef(database, "blog/" + postId);
    const updatedPost = {
      id: postId,
      title: postUpdates.title,
      body: postUpdates.body,
      imgSrc: imgSrc
    };
    update(postRef, updatedPost).then(() => {
      setPost(updatedPost);
      setIsEditMode(false);
    });
  };

  return (
    <Layout>
      {isEditMode ? (
        <>
          <h1>Edit post</h1>
          <PostForm
            title={post?.title}
            body={post?.body}
            imgSrc={post?.imgSrc}
            onSubmit={handleSubmit}
          />
        </>
      ) : (
        <div className="post">
          <button className="post__edit-button" onClick={() => setIsEditMode(true)}>Edit</button>
          <div className="post__content">
            {post?.imgSrc && <img className="post__image" src={post.imgSrc} alt={post?.title} />}
            <div>
              <h3>{post?.title}</h3>
              <p>{post?.body}</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Post;