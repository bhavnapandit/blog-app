import React, { use, useEffect, useState } from 'react'
import axios from "axios";
import Blog from './Blog';

const UserBlogs = () => {
  const [blogs,setBlogs]=useState()
  const id=localStorage.getItem("userId");
  const sendRequest=async()=>{
    const res= await axios.get(`http://localhost:5001/api/blog/user/${id}`)
    const data =await res.data;
    return data;
  }
  useEffect(()=>{
   sendRequest().then((data)=>setBlogs(data.blogs.blogs));
  },[])
  console.log(blogs);
  
  return (
    <div>
     {blogs && blogs.map((blog, index) => (
         <Blog
           title={blog.title}
           description={blog.description}
           imageUrl={blog.image}
           userName={blog.user.name}
           editable={true}
           userId={blog._id}
           key={index}
         />
       ))}
    </div>
  )
}

export default UserBlogs
