import { Button, TextField, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {authActions} from "../store/index.js"
import {useNavigate} from "react-router-dom";
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = React.useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type) => {
    const res = await axios
      .post(`http://localhost:5001/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => {
        console.log(err);
      });

    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    } else {
      sendRequest("login")
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          margin={"auto"}
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h4" padding={3} textAlign={"center"}>
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              placeholder="Name"
              value={inputs.name}
              type="text"
              margin="normal"
            />
          )}
          <TextField
            name="email"
            onChange={handleChange}
            placeholder="Email"
            value={inputs.email}
            type="email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            placeholder="Password"
            value={inputs.password}
            type="password"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: 3, borderRadius: 3 }}
            color="success"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 1 }}
          >
            Change to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
