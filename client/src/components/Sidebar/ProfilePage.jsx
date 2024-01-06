import React, { useState } from "react";
import {
  Paper,
  Avatar,
  Typography,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useAuth } from "../../context/AuthProvider";
import svgImage from "../../../public/images/profile-user.svg";

const ProfilePage = () => {
  const { userData } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    bio: userData?.bio || "",
  });

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Updated Data:", editData);
    setIsEditMode(false);
  };

  const formatName = (name, lastName) => {
    const formattedFirstName = name
      ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
      : "";

    if (!lastName) {
      return formattedFirstName;
    }

    const formattedLastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
    return `${formattedFirstName} ${formattedLastName}`;
  };
  return (
    <Grid
      container
      spacing={2}
      gap="4rem"
      justifyContent="center"
      alignItems="center"
      style={{ maxWidth: "2000px", margin: "auto" }}
    >
      <Grid item>
        <img src={svgImage} alt="Profile Icon" style={{ maxHeight: "400px" }} />
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper elevation={4} style={{ padding: "40px", borderRadius: "15px" }}>
          <Grid container direction="column" alignItems="center" spacing={3}>
            <Grid item>
              <Avatar
                src={userData?.avatarUrl}
                alt={`${userData?.name} ${userData?.lastName}`}
                sx={{ bgcolor: deepPurple[500], width: 80, height: 80 }}
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
                    rows={4}
                    fullWidth
                  />
                </>
              ) : (
                <>
                  <Typography
                    variant="h4"
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
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "20px", borderRadius: "20px" }}
              onClick={isEditMode ? handleSubmit : handleEditToggle}
            >
              {isEditMode ? "Save Changes" : "Edit Profile"}
            </Button>
            {isEditMode && (
              <Button
                variant="outlined"
                color="secondary"
                sx={{ marginTop: "10px", borderRadius: "20px" }}
                onClick={() => setIsEditMode(false)}
              >
                Cancel
              </Button>
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
