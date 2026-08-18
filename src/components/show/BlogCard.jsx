import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {

    const navigate = useNavigate();

  const openBlog = () => {
    navigate(`/blog/${blog._id}`);
  };
  return (
    <Card
    onClick={openBlog}
      sx={{
        width: 340,
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 3,
        cursor: "pointer",

        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },

        transition: "0.3s",
      }}
    >
      {/* Image */}
      <CardMedia
        component="img"
        height="220"
        image={blog.img}
        alt={blog.title}
      />

      <CardContent>

        {/* Category + Username */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Chip
            label={blog.category}
            size="small"
          />

          <Typography variant="body2" color="text.secondary">
            @{blog.username}
          </Typography>
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          {blog.title}
        </Typography>

        {/* Description */}
        <Typography
  variant="body2"
  color="text.secondary"
  sx={{
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
  }}
>
  {blog.description}
</Typography>

      </CardContent>
    </Card>
  );
};

export default BlogCard;