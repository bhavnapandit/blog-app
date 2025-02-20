import { Button, TextField, Typography ,Box} from "@mui/material";
import React from "react";

const Auth = () => {
  return (
    <div>
      <form>
        <Box display="flex" flexDirection={"column"} alignItems="center">
          <Typography>Login</Typography>
          <TextField />
          <TextField />
          <TextField />
          <Button>Submit</Button>
          <Button>Change to Signup</Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
