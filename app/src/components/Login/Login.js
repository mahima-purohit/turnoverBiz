import React, { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "../Header/Header";
import { api_base_url } from "../../config";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginFormData, setloginFormData] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginFormData({ ...loginFormData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api_base_url}/turnoverBiz/users/login`,
        {
          email: loginFormData.email,
          password: loginFormData.password
        }
      )
      const token = response.data.token;
      console.log(token);
      localStorage.setItem("token", token);
      alert("loggedIn successfully");
      setIsLoggedIn(true);
      navigate("/interests")
    } catch (error) {
      console.error("Login error: ", error);
    }
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="50vh"
    >
      <Header />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <h4 className="subHeading1">Welcome Back to ECOMMERCE</h4>
          <p className="subHeading2">The next gen business marketplace</p>
          <TextField
            name="email"
            id="Email"
            label="Enter Email"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            name="password"
            type="password"
            id="password"
            label="Enter password"
            variant="outlined"
            onChange={handleChange}
          />

          <Button
            className="button"
            variant="contained"
            onClick={handleSubmit}

          >
            LOGIN TO TurnoverBiz
          </Button>
          {/* {isLoggedIn && <div className="linkToInterests"><Link to="/interests">Browse your Interests</Link></div>} */}
          <p className="secondary-action">Don’t have an account?  <Link to="/register">Sign up</Link></p>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
