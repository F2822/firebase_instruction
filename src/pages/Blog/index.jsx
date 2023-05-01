import React, { useState, useEffect } from "react";
import { getDatabase, ref, get, remove } from "firebase/database";
import Layout from "../../components/Layout";
import BlogPost from "../../components/BlogPost";

import "./index.css";

const Blog = () => {
  const [postList, setPostList] = useState(null);

  useEffect(() => {
    const database = getDatabase();
    const blogRef = ref(database, "blog");
    get(blogRef).then((snapshot) => {
      if (snapshot.exists()) {
        const blog = snapshot.val();
        setPostList(Object.values(blog));
      }
    });
  }, []);

  const handleDeleteClick = (id) => {
    const database = getDatabase();
    const postRef = ref(database, "blog/" + id);
    remove(postRef).then(() => {
      setPostList((prevState) => prevState?.filter((item) => item.id !== id));
    });
  };

  return (
    <Layout>
      <h1>Blog</h1>
      <div className="blog__posts">
        {postList?.map((post) => (
          <BlogPost
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            imgSrc={post.imgSrc}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Blog;