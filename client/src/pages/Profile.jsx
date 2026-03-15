import React from "react";
import { useSelector } from "react-redux";
import { Container, Typography, Avatar, Box, Paper, Divider, Grid } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BadgeIcon from "@mui/icons-material/Badge";

const Profile = () => {
  // authSlice.jsx'teki doğru değişken adlarını (currentUser, email) çekiyoruz
  const { currentUser, email } = useSelector((state) => state.auth);

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
        <Box sx={{ bgcolor: "primary.main", height: 140, display: "flex", justifyContent: "center", position: "relative" }}>
          <Avatar
            sx={{
              width: 130,
              height: 130,
              border: "5px solid white",
              bgcolor: "secondary.main",
              fontSize: "3.5rem",
              position: "absolute",
              bottom: -65,
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
            }}
          >
            {currentUser ? currentUser.charAt(0).toUpperCase() : "U"}
          </Avatar>
        </Box>

        <Box sx={{ pt: 10, pb: 5, px: 4, textAlign: "center" }}>
          {/* İsim alanı şu an backend'den firstName olarak gelmediği için username'i büyük yazdırıyoruz */}
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ textTransform: "capitalize" }}>
            {currentUser || "User"}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <AccountCircleIcon fontSize="small" /> @{currentUser || "unknown"}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3} sx={{ textAlign: "left", px: 2 }}>
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ bgcolor: "primary.light", color: "primary.dark" }}><EmailIcon /></Avatar>
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight="bold">Email Address</Typography>
                <Typography variant="body1" fontWeight="500">{email || "No email provided"}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ bgcolor: "secondary.light", color: "secondary.dark" }}><BadgeIcon /></Avatar>
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight="bold">Role</Typography>
                <Typography variant="body1" fontWeight="500">Author</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;