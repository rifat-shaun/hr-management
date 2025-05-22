import { Box, Typography } from '@mui/material';
import { ThemeToggle } from '../components/ThemeToggle';

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Theme Toggle */}
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        <ThemeToggle />
      </Box>

      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to your HR Management dashboard!
      </Typography>
    </Box>
  );
};

export default Dashboard; 