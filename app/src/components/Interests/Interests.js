import React, { useEffect, useState } from "react";
import { Button, Stack, TextField, FormControlLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import Header from "../Header/Header";
import "./Interests.css"
import { api_base_url } from "../../config";
const Interests = () => {
    const token = localStorage.getItem('token');
    const [interests, setInterests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const interestsPerPage = 6;
    const [checkedInterests, setCheckedInterests] = useState({});
    useEffect(() => {
        fetchInterests();
    }, [])

    const fetchInterests = async () => {
        try {
            const response = await axios.get(`${api_base_url}/turnoverBiz/interests`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            const interestsWithChecked = response.data
            setInterests(interestsWithChecked);
        }
        catch (error) {
            console.error("Error fetching categories:", error);
        }
    }
    const addInterest = async (interest) => {
        try {
            await axios.post(`${api_base_url}/turnoverBiz/user/interests`,
                { interest: interest },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
        }
        catch (error) {
            console.error("Error adding interest:", error);
        }
    }

    const removeInterest = async (interest) => {
        try {
            await axios.delete(`${api_base_url}/turnoverBiz/user/interests/${interest}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
        }
        catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    const handleCheckboxToggle = (index) => {
        const updatedInterests = [...interests];
        const isChecked = !updatedInterests[index].checked;
        updatedInterests[index].checked = isChecked;
        setInterests(updatedInterests);

        // Update checked interests state
        const updatedCheckedInterests = { ...checkedInterests };
        updatedCheckedInterests[index] = !updatedCheckedInterests[index];
        setCheckedInterests(updatedCheckedInterests);

        // persist the value in backend 
        if (isChecked) {
            addInterest(updatedInterests[index].name);
        } else {
            removeInterest(updatedInterests[index].name);
        }
    }

    // Get current Interests to display based on pagination
    const indexOfLastInterest = currentPage * interestsPerPage;
    const indexOfFirstInterest = indexOfLastInterest - interestsPerPage;
    const currentInterests = interests.slice(indexOfFirstInterest, indexOfLastInterest)// New state for checked interests
    console.log(currentInterests, "currentInts");
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
                    <h2 className="title">Please mark your interests!</h2>
                    <p className="subHeading2">We will keep you notified </p>
                    <h4 className="categoryHeading">My saved interests</h4>
                    <div className="interests">
                        {
                            currentInterests.map((interest, index) => {
                                return (
                                    <FormControlLabel
                                        key={index}
                                        control={
                                            <Checkbox
                                                checked={interest.checked || false}
                                                onChange={() => handleCheckboxToggle(indexOfFirstInterest + index)}
                                            />
                                        }
                                        label={interest.name}
                                    />
                                )

                            })
                        }
                    </div>

                    <Pagination
                        count={Math.ceil(interests.length / interestsPerPage)}
                        page={currentPage}
                        onChange={(event, value) => {
                            setCurrentPage(value)
                        }}
                        showFirstButton
                        showLastButton
                        size="small"
                    />
                    {/* <Link to="/register">Register now</Link> */}
                </Stack>
            </Box>
        </Box>
    );
};

export default Interests;
