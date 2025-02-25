import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import PublishIcon from "@mui/icons-material/Publish";
import axios from "axios";

const AddBlog = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const addBlog = async () => {
    const res = await axios
      .post("http://localhost:5001/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    addBlog();
    setInputs({
      title: "",
      description: "",
      image: "",
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, borderRadius: "10px" }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: "gray" }} gutterBottom>
          Post Blog
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Stack spacing={3}>
          {/* Title Input */}
          <TextField
            label="Blog Title"
            variant="outlined"
            fullWidth
            name="title"
            value={inputs.title}
            onChange={handleChange}
            placeholder="Enter a catchy title"
            required
          />
          <Card variant="outlined">
            <CardContent>
              <Stack direction="column" spacing={2} alignItems="center">
                <AddPhotoAlternateIcon fontSize="large" color="primary" />
                <Typography variant="body1">Add Cover Image</Typography>
                <TextField
                  label="Image URL"
                  multiline
                  rows={1}
                  variant="outlined"
                  fullWidth
                  placeholder="Give Image url"
                  name="image"
                  value={inputs.image}
                  onChange={handleChange}
                  required
                />
              </Stack>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <TextField
            label="Blog Content"
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            placeholder="Write your blog content here..."
            name="description"
            value={inputs.description}
            onChange={handleChange}
            required
          />

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
              Discard
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              startIcon={<PublishIcon />}
            >
              Publish
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default AddBlog;
