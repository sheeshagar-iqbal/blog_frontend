import React from "react";
import { Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import { useNavigate } from "react-router-dom";

const ShowComment = ({ blog, account }) => {
  const [comment, setComment] = useState([]);
  const navigate=useNavigate()
 function deletecomment(id){
  // console.log(id);
  
            axios
      .delete(`http://localhost:5000/comment/${id}`)
      .then((res) => {alert('comment deleted')
    navigate(`/blog/${blog._id}`)

      })
      .catch((err) => console.log(err));


 }
  useEffect(() => {
    axios
      .get(`http://localhost:5000/comment?comment=${blog._id}`)
      .then((res) => setComment(res.data))
      .catch((err) => console.log(err));
  }, [blog._id,deletecomment]);
  return (
    <>
      <Box>
        {comment.map((comment) => (
          <div key={comment._id}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                // mb: 2,
                justifyContent:'space-between',
                // borderBottom:"1px solid black",

              }}
            >
              <Box 
               sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                // mb: 2,
              }}
              >
                <PersonIcon
                sx={{
                  // padding:"20px",
                  background: "gray",
                  borderRadius: "100%",
                  color: "black",
                  width: "40px",
                  height: "40px",
                }}
              />
              <Typography variant="h5">{comment.username}</Typography>
              </Box>

              {
                (comment.username === account.username)?
                <DeleteOutlineTwoToneIcon style={{color:'black',fontSize:'1.7rem',cursor:'pointer'}} 
       onClick={()=>deletecomment(comment._id)}
       />
       :null
              }
              
            </Box>
            <Typography variant="h6"
            sx={{
                bgcolor:"gray",
                margin:"10px 0",
                padding:"10px",
                border:'1px solid black',
                borderRadius:'8px'

            }}
            >{comment.comment}</Typography>
          </div>
        ))}
      </Box>
    </>
  );
};

export default ShowComment;
