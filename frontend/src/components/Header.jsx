import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  const [value, setValue] = useState();
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg, rgba(32,22,156,1) 0%, rgba(53,116,80,1) 43%, rgba(0,212,255,1) 100%)",
      }}
    >
      <Toolbar>
        <Typography variant="h4">BlogsApp</Typography>
        <Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}>
          <Tabs
            value={value}
            onChange={(e, val) => {
              setValue(val);
            }}
            textColor="inherit"
          >
            <Tab LinkComponent={Link} to="/blogs" label="Blogs" />
            <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
          </Tabs>
        </Box>
        <Box display="flex" marginLeft="auto">
          <Button
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
            color="success"
            LinkComponent={Link}
            to="/auth"
          >
            Login
          </Button>
          <Button
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
            color="success"
            LinkComponent={Link}
            to="/auth"
          >
            SignUp
          </Button>
          <Button
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
            color="success"
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
