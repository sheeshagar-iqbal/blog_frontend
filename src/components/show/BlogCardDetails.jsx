import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Chip, CircularProgress, colors } from "@mui/material";
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
// import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import SecurityUpdateGoodTwoToneIcon from '@mui/icons-material/SecurityUpdateGoodTwoTone';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Usercontext } from "../../context/Dataprovide";
import Comment from "../comment/Comment";
import ShowComment from "../comment/ShowComment";


const BlogCardDetails = () => {
  const { id } = useParams();
  const {account}= useContext(Usercontext)
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate()

  const deleteblog =()=>{
     axios
      .delete(`http://localhost:5000/blog/${id}`)
      .then((res) => {
        alert(`delete ${blog.title} blog `)
        navigate('/')
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    axios
      .get(`http://localhost:5000/blog/${id}`)
      .then((res) => {
        // console.log(res.data);
        // console.log(account);
        
        setBlog(res.data);
      })
      .catch((err) => {
        console.log(err);
      });




  }, [id,account.id]);

  if (!blog) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
    <Box
      sx={{
        maxWidth: "900px",
        margin: "50px auto",
        padding: "20px",
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={blog.img}
        alt={blog.title}
        sx={{
          width: "100%",
          height: "450px",
          objectFit: "cover",
          borderRadius: 3,
        }}
      />
 {/* update and trash */}
     {
      (blog.user === account.id)?
         <Box 
      sx={{
        display:"flex",
        justifyContent:"end",
        marginTop:'20px'
      }}
      >
        <SecurityUpdateGoodTwoToneIcon style={{color:'black',fontSize:'1.7rem',cursor:'pointer'}}
         onClick={()=>navigate(`/updateblog/${blog._id}`)}

         />
       <DeleteOutlineTwoToneIcon style={{color:'red',fontSize:'1.7rem',cursor:'pointer'}} 
       onClick={deleteblog}
       />
      </Box>: ''
      
     }

      {/* Category + User */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 3,
        }}
      >
        <Chip label={blog.category} />

        <Typography color="text.secondary">@{blog.username}</Typography>
      </Box>

      {/* Title */}
      <Typography variant="h3" fontWeight="bold" sx={{ mt: 3 }}>
        {blog.title}
      </Typography>

      {/* Description */}
      <Typography
        variant="body1"
        sx={{
          mt: 3,
          lineHeight: 1.8,
        }}
      >
        {blog.description}
      </Typography>
      <Box
      sx={{
        margin:'20px 0'
      }}>
        {
          (account.id)?
          <Comment blog={blog} account={account} />
          : null
        }
      
    <ShowComment blog={blog} account={account}/>
    </Box>
    </Box>

    
    </>
  );
};

export default BlogCardDetails;
