import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import BlogCard from "./BlogCard";
import axios from "axios";

const BlogAll = ({category}) => {

  const [blogs,setBlogs]=useState([])

  useEffect(()=>{
    axios.get("http://localhost:5000/blog")
        .then((res) => setBlogs(res.data))
        .catch((err) => console.log(err));
  },[])

    const filterBlogs = category
    ? blogs.filter(
        (blog) =>
          blog.category.toLowerCase() === category.toLowerCase()
      )
    : blogs;
  return (
    <Box
      sx={{
        // display: "flex",
        // flexWrap: "wrap",
        // gap: 3,
        // justifyContent: "center",
        margin: "30px",
      }}
    >
      <Grid container spacing={2}>
      {filterBlogs.map((blog, index) => (
      (index<6)? <Grid  size={{lg:4, md:6, sm:8, xs:12}} key={blog._id}>
        <BlogCard
          key={index}
          blog={blog}
        />
        </Grid>:null
      ))}
      </Grid>
    </Box>
  );
};

export default BlogAll;