import React from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref as dbRef, push, set } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import Layout from "../../components/Layout";
import PostForm from "../../components/PostForm";

const NewPost = () => {
  const navigate = useNavigate();

  const handleSubmit = async (post) => {
    const storage = getStorage();
    const imageRef = storageRef(storage, "images/" + post.image.name);
    const snapshot = await uploadBytes(imageRef, post.image);
    const imageUrl = await getDownloadURL(snapshot.ref);

    const database = getDatabase();
    const blogRef = dbRef(database, "blog");
    const newPostRef = push(blogRef);
    const newPost = {
      id: newPostRef.key,
      title: post.title,
      body: post.body,
      imgSrc: imageUrl
    };
    set(newPostRef, newPost).then(() => {
      navigate("/blog");
    });
  };

  return (
    <Layout>
      <h1>New post</h1>
      <PostForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default NewPost;