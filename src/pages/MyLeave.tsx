import { Box, Typography } from '@mui/material';

const MyLeave = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Leave
      </Typography>
      <Typography variant="body1">
        View and manage your leave requests.
      </Typography>
    </Box>
  );
};

export default MyLeave; 