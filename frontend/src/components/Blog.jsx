import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, Box, CardHeader, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Blog({
  title,
  description,
  imageUrl,
  userName,
  editable,
  userId,
}) {
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myBlogs/${userId}`);
  };
  const onDelete = async () => {
    const res = await axios
      .delete(`http://localhost:5001/api/blog/${userId}`)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    alert("Blog Deleted");
    window.location.reload();
  };
  const icon = userName?.charAt(0).toUpperCase() || "U";
  console.log(icon);
  return (
    <Card
      sx={{
        width: "90%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": { boxShadow: "10px 10px 20px #ccc" },
        position: "relative",
      }}
    >
      {editable && (
        <Box sx={{ position: "absolute", top: 10, right: 10 }}>
          <IconButton onClick={handleEdit} aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton onClick={onDelete} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {icon}
          </Avatar>
        }
        title={title}
      />
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt="Blog Image"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
