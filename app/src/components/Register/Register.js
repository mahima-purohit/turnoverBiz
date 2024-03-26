import React from "react";
import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import "./Register.css";
import { useSnackbar } from "notistack";
import Alert from '@mui/material/Alert';
import Header from "../Header/Header";

function Register() {
  const [verificationWindow, setVerificationWindow] = useState(false);

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [bannerValue, setBannerValue] = useState(null)
  const { enqueueSnackbar } = useSnackbar();
  /** register Function: function to be invoked when the register now button in clicked
 * @param {{name:string, email:string, password:string}}
 * API endpoint- "POST /users/register"
 * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "message: 'User registered successfully. Please verify your email."
   * 
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
           "message": "Email is already registered, please login"
      }
 */
  const register = async (formData) => {
    try {
      const response = await axios.post("http://localhost:8000/turnoverBiz/users/register", { name: formData.name, email: formData.email, password: formData.password })
      console.log("response", response.data);
      if (response.status === 201) {
        setBannerValue({
          value: "201",
          alertMessage: "Registered Successfully,Please verify you email",
          severity: "success"
        })
        alert("Registered Successfully,Please verify you email");
        navigate('/verify', { state: { email: formData.email } });
      }
    } catch (error) {
      console.log("coming inside catch");
      if (error && error.response && error.response.status && error.response.status === 400) {
        setBannerValue({
          value: "400",
          alertMessage: error.response.data.message,
          severity: "warning"
        })
      }
    }
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="50vh"
    > <Header />
      <Box className="content">
        <Stack spacing={2} className="form">
          <div className="title">
            <h2>Create your Account</h2>
          </div>

          <div>
            <p>Name</p>
            <TextField
              id="username"
              label="Enter"
              variant="outlined"
              title="Username"
              name="username"
              value={userData.name}
              onChange={(event) => { setUserData({ ...userData, name: event.target.value }) }}
              fullWidth
              placeholder="Enter Name"
            />
          </div>
          <div>
            <p>Email</p>
            <TextField
              id="Email"
              variant="outlined"
              label="Email"
              name="Email"
              value={userData.email}
              onChange={(event) => { setUserData({ ...userData, email: event.target.value }) }}
              type="Email"
              fullWidth
            />
          </div>
          <div>
            <p>Password</p>
            <TextField
              id="password"
              variant="outlined"
              label="Password"
              name="password"
              value={userData.password}
              onChange={(event) => { setUserData({ ...userData, password: event.target.value }) }}
              type="password"
              fullWidth
              placeholder="Enter a password with minimum 6 characters"
            />
          </div>
          <Button
            className="button"
            variant="contained"
            onClick={() => {
              console.log(userData, "userData");
              register(userData)
            }}
          >
            Register Now
          </Button>
          <p className="secondary-action">
            Already have an account?
            <Link to="/login" >
              Login here
            </Link>
          </p>
        </Stack>
      </Box>
      {bannerValue && <Alert variant="filled" severity={bannerValue.severity}>{bannerValue.alertMessage}</Alert>}
    </Box>
  );
}

export default Register;
