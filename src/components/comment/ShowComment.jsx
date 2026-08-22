import React from "react";
import { Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import { useNavigate } from "react-router-dom";
import {TextField,Button} from '@mui/material';


const ShowComment = ({ blog, account }) => {
  
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
    e.preventDefault();

    const comData = {
      ...commentData,
      nowdate: new Date(),
      username: account?.username,
      blog: blog?._id,
    };
    
    console.log(account);
    
    axios.post("https://blog-backend-81ee.onrender.com/comment", comData)
        .then((res) => {alert("comment inserted")
         getcomment()
        })
        .catch((err) => console.log(err));

    console.log("comment Data:", comData);
    
  };


  // show  comment 




  const [comment, setComment] = useState([]);
  const navigate = useNavigate();
  function deletecomment(id) {
    // console.log(id);

    axios
      .delete(`https://blog-backend-81ee.onrender.com/comment/${id}`)
      .then((res) => {
        alert("comment deleted");
        // navigate(`/blog/${blog._id}`)
        getcomment();
      })
      .catch((err) => console.log(err));
  }

  function getcomment() {
    axios
      .get(`https://blog-backend-81ee.onrender.com/comment?comment=${blog._id}`)
      .then((res) => setComment(res.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getcomment();
  }, [blog._id]);
  return (
    <>
   { (account.id) &&  <Box>
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
              background: "gray",
              borderRadius: "100%",
              color: "black",
              width: "40px",
              height: "40px",
            }}
          />
          <Typography variant="h5">{account.username}</Typography>
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
      </Box>}
      <Box>
        {comment.map((comment) => (
          <div key={comment._id}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                // mb: 2,
                justifyContent: "space-between",
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

              {comment.username === account.username ? (
                <DeleteOutlineTwoToneIcon
                  style={{
                    color: "black",
                    fontSize: "1.7rem",
                    cursor: "pointer",
                  }}
                  onClick={() => deletecomment(comment._id)}
                />
              ) : null}
            </Box>
            <Typography
              variant="h6"
              sx={{
                bgcolor: "gray",
                margin: "10px 0",
                padding: "10px",
                border: "1px solid black",
                borderRadius: "8px",
              }}
            >
              {comment.comment}
            </Typography>
          </div>
        ))}
      </Box>
    </>
  );
};

export default ShowComment;
