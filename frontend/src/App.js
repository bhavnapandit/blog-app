import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth.jsx";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogsDetail";
import AddBlog from "./components/AddBlog";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/index.js";

function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();
  console.log(isLoggedIn);
   useEffect(() => {
     const storedUserId = localStorage.getItem("userId");
     if (storedUserId) {
       dispatch(authActions.login());
     }
   },[dispatch])
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? <Route path="/auth" element={<Auth />} /> : <>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/add" element={<AddBlog />} />
            <Route path="/myBlogs" element={<UserBlogs />} />
            <Route path="/myBlogs/:id" element={<BlogDetail />} /></>}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
