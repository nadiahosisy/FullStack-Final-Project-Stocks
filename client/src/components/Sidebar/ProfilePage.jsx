import React, { useState } from "react";
import {
  Paper,
  Avatar,
  Typography,
  Button,
  Grid,
  TextField,
} from "@mui/material";

import { useAuth } from "../../context/AuthProvider";
import svgImage from "../../../public/images/profile-user.svg";
import { updateUserData } from "../../api/apiServices";
import Modal from "../Modal/Modal";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const { userData, setUserData } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: userData?.name || "",
    lastName: userData?.lastName || "",
    email: userData?.email || "",
    bio: userData?.bio || "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const updatedData = await updateUserData(userData._id, editData);
      setUserData(updatedData.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error updating user data", error);
    } finally {
      setIsEditMode(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formatName = (name, lastName) => {
    const formattedFirstName = name
      ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
      : "";
    const formattedLastName = lastName
      ? lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()
      : "";
    return `${formattedFirstName} ${formattedLastName}`;
  };

  const paperStyle = isEditMode
    ? { padding: "10px", borderRadius: "15px", maxHeight: "50%" }
    : { padding: "50px", borderRadius: "15px", maxHeight: "30%" };

  return (
    <motion.div
      className="grid-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.01 } }}
    >
      <Sidebar />
      <Grid
        container
        spacing={2}
        display={"flex"}
        justifyContent="center"
        alignContent={"center"}
        gap={"2rem"}
        alignItems="center"
        style={{
          maxWidth: "1700px",
          height: "600px",
          margin: "auto",
          marginTop: "70px",
          marginRight: "700px",
        }}
      >
        <Grid item display={"flex"} justifyContent="center">
          <img
            src={svgImage}
            alt="Profile Icon"
            style={{ maxHeight: "500px" }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={4} style={paperStyle}>
            <Grid container direction="column" alignItems="center" spacing={3}>
              <Grid item>
                <Avatar
                  src={userData?.avatarUrl}
                  alt={`${userData?.name} ${userData?.lastName}`}
                  sx={{ bgcolor: "#6c63ff", width: 60, height: 60 }}
                />
              </Grid>
              <Grid item xs style={{ textAlign: "center" }}>
                {isEditMode ? (
                  <>
                    <TextField
                      label="Name"
                      name="name"
                      value={editData.name}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    <TextField
                      label="Last Name"
                      name="lastName"
                      value={editData.lastName}
                      onChange={handleInputChange}
                      margin="dense"
                      fullWidth
                    />
                    <TextField
                      label="Email"
                      name="email"
                      value={editData.email}
                      onChange={handleInputChange}
                      margin="dense"
                      fullWidth
                    />
                    <TextField
                      label="Bio"
                      name="bio"
                      value={editData.bio}
                      onChange={handleInputChange}
                      margin="dense"
                      multiline
                      rows={3}
                      fullWidth
                    />
                  </>
                ) : (
                  <>
                    <Typography
                      variant="h5"
                      style={{ fontFamily: "Normal", fontWeight: "bold" }}
                    >
                      {userData
                        ? formatName(userData.name, userData.lastName)
                        : "N/A"}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      style={{ fontFamily: "Normal" }}
                    >
                      {userData?.email || "N/A"}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{ fontFamily: "Normal", marginTop: "20px" }}
                    >
                      {userData?.bio || "No bio available"}
                    </Typography>
                  </>
                )}
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    marginTop: "20px",
                    borderRadius: "20px",
                    bgcolor: "#6c63ff",
                    "&:hover": {
                      bgcolor: "#6c63ff",
                    },
                  }}
                  onClick={isEditMode ? handleSubmit : handleEditToggle}
                >
                  {isEditMode ? "Save Changes" : "Edit Profile"}
                </Button>
              </Grid>
              {isEditMode && (
                <Grid item>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                      borderRadius: "20px",
                      borderColor: "#6c63ff",
                      color: "#6c63ff",
                      "&:hover": {
                        bgcolor: "transparent",
                        borderColor: "#6c63ff",
                      },
                    }}
                    onClick={() => setIsEditMode(false)}
                  >
                    Cancel
                  </Button>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>

        <Modal
          show={showModal}
          message="Profile Updated Successfully!"
          onClose={handleCloseModal}
          iconType="success"
        />
      </Grid>
    </motion.div>
  );
};

export default ProfilePage;
