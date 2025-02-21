import { Button, TextField, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import {} from "axios";
const Auth = () => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
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
