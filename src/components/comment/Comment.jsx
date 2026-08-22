import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { Box ,TextField,Button, Typography} from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Comment = ({blog,account}) => {
    const navigate =useNavigate()
    const [commentData, setcommentData] = useState({
    comment: "",
   
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setcommentData({
      ...commentData,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    // e.preventDefault();

    const comData = {
      ...commentData,
      nowdate: new Date(),
      username: account?.username,
      blog: blog?._id,
    };
    
    console.log(account);
    
    axios.post("https://blog-backend-81ee.onrender.com/comment", comData)
    // https://blog-backend-81ee.onrender.com
        .then((res) => {alert("comment inserted")
    // navigate(`/blog/${blog._id}`)

        })
        .catch((err) => console.log(err));

    console.log("comment Data:", comData);
    
  };
  useEffect(()=>{
    console.log('blog');
    
  },[])
  return (
    <Box
        
    >
        <Box
        sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              mb: 2,
            }}
        >
            <PersonIcon 
        sx={{
            // padding:"20px",
            background:"gray",
            borderRadius:"100%",
            color:'black',
            width:'40px',
            height:"40px"
        }}
        />
        <Typography
        variant="h5"
        >
            {account.username}
        </Typography>
        </Box>
        <form action="" onSubmit={submitHandler}>
              <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              mb: 2,
            }}
          >
            <TextField
              fullWidth
              label="Comment"
              name="comment"
              value={commentData.comment}
              onChange={changeHandler}
              required
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                height: "56px",
                minWidth: "150px",
              }}
            >
              Comment
            </Button>
          </Box>
        </form>
    </Box>
  )
}

export default Comment