import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5001/api/blog")
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data.blogs);
    
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  return <div>
  {blogs && blogs.map((blog, index) => (
    <Blog
      title={blog.title}
      description={blog.description}
      imageUrl={blog.image}
      userName={blog.user.name}
      editable={false}
      userId={blog._id}
      key={index}
    />
  ))}
</div>
};

export default Blogs;
