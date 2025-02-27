import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PublishIcon from "@mui/icons-material/Publish";
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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogsDetail = () => {
  const [blog, setBlog] = useState();
  const [inputs, setInputs] = useState({});
  const id = useParams().id;
  console.log(id);
  const fetchBlog = async () => {
    const res = await axios
      .get(`http://localhost:5001/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = res.data;
    return data;
  };
  useEffect(() => {
    fetchBlog().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        image: data.blog.image,
      });
    });
  }, [id]);

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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, borderRadius: "10px" }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: "gray" }} gutterBottom>
          Edit Blog
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Stack spacing={3}>
          {/* Title Input */}
          <TextField
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

export default BlogsDetail;
