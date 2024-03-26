import React from "react";
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import VerificationInput from "react-verification-input";
import "./Verify.css"
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";

const Verify = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState("");
    // base url can be moved to environment file 
    const verifyApiEndPoint = "http://localhost:8000/turnoverBiz/users/verify"
    const email = location.state ? location.state.email : null;
    const handleVerificationInputChange = (value) => {
        setVerificationCode(value);
    }
    const handleVerification = async () => {
        console.log(email);
        try {
            const response = await axios.post(verifyApiEndPoint,
                {
                    email: email,
                    code: verificationCode
                })
            alert(response.data.message)
            console.log(response.data);
            navigate("/login")
        }
        catch (error) {
            alert("wrong code")
            console.log("verification error:", error);
        }
    }
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            minHeight="100vh"
        >
            <Header />
            <Box className="content">
                <Stack spacing={2} className="form">
                    <h2 className="title">Verify Your Email</h2>
                    <p className="subHeading2">Enter The 8 digit code you have received on {email}</p>
                    <div className="verificationCode">
                        <VerificationInput length={8}
                            onChange={handleVerificationInputChange} />
                    </div>

                    <Button
                        className="button"
                        variant="contained"
                        onClick={handleVerification}
                    >
                        verify
                    </Button>

                    <p className="secondary-action">
                        Verify Later?
                        <Link to="/login" >
                            Login here
                        </Link>
                        {/* <TurnOverBixTootltip /> */}
                    </p>
                </Stack>
            </Box>
        </Box>
    );
};

export default Verify;
