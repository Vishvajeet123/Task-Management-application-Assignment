import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCookieValue } from "../utils/tasksUtility";
import { BrowserRouter as Router, Link } from 'react-router-dom';

const Login = ({settoken}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let route = process.env.ROUTE || "http://localhost:5000";
    try {
      const response = await axios.post(`${route}/auth/login`, formData, { withCredentials: true });
      if(response.data.user){
        const tokenFromCookie = getCookieValue("token");
        settoken(tokenFromCookie)
      }
    
      alert("User login");
      navigate("/");
    } catch (error) {
      alert("Login error");

      console.error(error);
    }
  };
  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          sx={{
            height: "60%",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
          }}
        >
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={5}
            md={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px 0 0 8px",
            }}
          />
          <Grid
            item
            xs={12}
            sm={7}
            md={5}
            square
            sx={{
              borderRadius: "0 8px 8px 0",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Login
                </Typography>
                <Box

                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    name="username"
                    autoFocus
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login
                  </Button>
                  <Link to="/register">Register here</Link>
                </Box>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Box>
      


    </Container>


    
  );
};

export default Login;
