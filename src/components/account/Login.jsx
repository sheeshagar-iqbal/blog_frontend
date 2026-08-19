import React, { useState } from "react";
import { Box, Button, styled, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useContext } from "react";
import { Usercontext } from "../../context/Dataprovide";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 350px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
  border-radius: 10px;
  padding: 20px;
`;

const Image = styled("img")({
  width: "100",
  margin: "auto",
  display: "flex",
  padding: "10px 0 0",
});

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 10px;
  }
`;
const Login = () => {
  const [login, togglelogin] = useState("login");
  const [signupdata, setSignupdata] = useState({});
  const [user, setUserdata] = useState({});
  const { setAccount, setUser } = useContext(Usercontext);
  const navigate = useNavigate();
  const imageURL =
    "https://tse4.mm.bing.net/th/id/OIP.-13b2HDEo9NYyv0QpDMktQHaE7?r=0&pid=Api&P=0&h=180";

  function changehandler(e) {
    setSignupdata({ ...signupdata, [e.target.name]: e.target.value });
    // console.log(e.target.name,e.target.value);
  }

  function submitsignup(e) {
    e.preventDefault();
    if (login === "login") {
      axios
        .post("https://blog-backend-81ee.onrender.com/login/user", signupdata)
        .then((res) => {
          console.log("LOGIN RESPONSE:", res.data);

          // Save complete API response in local Login state
          setUserdata(res.data);

          // Actual logged-in user
          const loggedUser = res.data.data;

          // Save user information in Context
          setAccount({
            email: loggedUser?.email || "",
            username: loggedUser?.username || "",
            id: loggedUser?._id || "",
          });

          // Save logged-in user in Context
          setUser(loggedUser);

          // Go Home
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // console.log(signupdata);
      axios
        .post("https://blog-backend-81ee.onrender.com/user", signupdata)
        .then((res) => alert("data inserted"))
        .catch((err) => console.log(err));

      togglelogin("login");
    }
  }

  return (
    <>
      <div style={{ marginTop: "60px" }}>
        <Component>
          <Box>
            <Image src={imageURL} alt="Login" />
            {login == "login" ? (
              <form onSubmit={submitsignup}>
                <Wrapper>
                  <TextField
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    name="email"
                    value={signupdata.email || ""}
                    onChange={changehandler}
                    required
                  />

                  <TextField
                    id="standard-basic"
                    label="Password"
                    variant="standard"
                    name="password"
                    type="password"
                    value={signupdata.password || ""}
                    onChange={changehandler}
                    required
                  />

                  {!user.data && (
                    <Typography
                      style={{
                        textAlign: "center",
                        color: "red",
                      }}
                    >
                      {user.message}
                    </Typography>
                  )}

                  <Button variant="contained" type="submit">
                    LOGIN
                  </Button>

                  <Typography style={{ textAlign: "center" }}>OR</Typography>

                  <Button type="button" onClick={() => togglelogin("signup")}>
                    CREATE AN ACCOUNT
                  </Button>
                </Wrapper>
              </form>
            ) : (
              <form onSubmit={submitsignup}>
                <Wrapper>
                  <TextField
                    id="standard-basic"
                    label="Username"
                    name="username"
                    variant="standard"
                    value={signupdata.username || ""}
                    onChange={changehandler}
                    required
                  />

                  <TextField
                    id="standard-basic"
                    label="Email"
                    name="email"
                    variant="standard"
                    value={signupdata.email || ""}
                    onChange={changehandler}
                    required
                  />

                  <TextField
                    id="standard-basic"
                    label="Password"
                    name="password"
                    type="password"
                    variant="standard"
                    value={signupdata.password || ""}
                    onChange={changehandler}
                    required
                  />

                  <Button variant="contained" type="submit">
                    Signup
                  </Button>

                  <Typography style={{ textAlign: "center" }}>OR</Typography>

                  <Button type="button" onClick={() => togglelogin("login")}>
                    Already have an account
                  </Button>
                </Wrapper>
              </form>
            )}
          </Box>
        </Component>
      </div>
    </>
  );
};

export default Login;
