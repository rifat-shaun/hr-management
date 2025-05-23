import { Box, Typography } from '@mui/material';

const Attendance = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Attendance
      </Typography>
      <Typography variant="body1">
        Track your attendance and time records.
      </Typography>
    </Box>
  );
};

export default Attendance; 