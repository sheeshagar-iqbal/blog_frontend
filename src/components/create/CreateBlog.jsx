import React, { useContext, useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  styled,
} from "@mui/material";

import { Usercontext } from "../../context/Dataprovide";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Image = styled("img")({
  height: "50vh",
  objectFit: "cover",
  width: "100%",
  borderRadius: "5px",
});

const Container = styled(Box)`
  margin: 50px 100px;
`;

const FormContainer = styled(Box)`
  margin: 30px 100px;
`;

const category = [
  { id: 1, type: "Music" },
  { id: 2, type: "Tech" },
  { id: 3, type: "Movies" },
  { id: 4, type: "Sports" },
  { id: 5, type: "Fashion" },
];

const CreateBlog = () => {

  const { user,account } = useContext(Usercontext);
  const navigate = useNavigate()
  const defaultImage =
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  const [formData, setFormData] = useState({
    title: "",
    img: "",
    description: "",
    category: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  // console.log(user);
  // console.log(account);
  
    // Date + User ID automatically add
    const blogData = {
      ...formData,
      nowdate: new Date(),
      user: user?._id,
      username: user?.username,
    };

    axios.post("https://blog-backend-81ee.onrender.com/blog", blogData)
        .then((res) => alert("blog inserted"))
        .catch((err) => console.log(err));

    console.log("Blog Data:", blogData);
    navigate('/')
  };

  return (
    <>
      {/* IMAGE */}
      <Container>
        <Image
          src={formData.img || defaultImage}
          alt="blog"
        />
      </Container>

      {/* FORM */}
      <FormContainer>

        <form onSubmit={submitHandler}>

          {/* TITLE + BUTTON SAME LINE */}
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
              label="Title"
              name="title"
              value={formData.title}
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
              Post Blog
            </Button>
          </Box>

          {/* IMAGE URL */}
          <TextField
            fullWidth
            label="Image URL"
            name="img"
            value={formData.img}
            onChange={changeHandler}
            placeholder="Paste image URL"
            margin="normal"
            required
          />

          {/* DESCRIPTION */}
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={changeHandler}
            multiline
            rows={6}
            margin="normal"
            required
          />

          {/* CATEGORY */}
          <TextField
            fullWidth
            select
            label="Category"
            name="category"
            value={formData.category}
            onChange={changeHandler}
            margin="normal"
            required
          >
            {category.map((item) => (
              <MenuItem
                key={item.id}
                value={item.type}
              >
                {item.type}
              </MenuItem>
            ))}
          </TextField>

        </form>

      </FormContainer>
    </>
  );
};

export default CreateBlog;