import React from "react";
import { Usercontext } from "../../context/Dataprovide";
import { useContext } from "react";
import Bannner from "../banner/Bannner";
import Category from "./Category";
import { Grid ,Typography } from "@mui/material";
import BlogAll from "../show/BlogAll";
import { useParams, useSearchParams } from "react-router-dom";

const Home = () => {
  const { account } = useContext(Usercontext);
  // const {category}= useParams()
   const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  return (
    <>
      <h2>{account.email}</h2>
      <Bannner />

    <Grid container spacing={2}>

  <Grid size={{ xs: 12, sm: 3, md: 3, lg: 2 }}>
    <Category />
  </Grid>

  <Grid size={{ xs: 12, sm: 9, md: 9, lg: 10 }} spacing={5}>
    <Typography variant="h4" sx={{ m: 3 }}>
       {category ? `${category} Blogs` : "New Blog"} 
    </Typography>

    <BlogAll category={category} />
  </Grid>

</Grid>
    </>
  );
};

export default Home;
