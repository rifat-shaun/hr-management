import { Box, Typography } from '@mui/material';

const Profile = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Profile
      </Typography>
      <Typography variant="body1">
        View and manage your profile information.
      </Typography>
    </Box>
  );
};

export default Profile; 