import { Box, Typography } from '@mui/material';

const Documents = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Documents
      </Typography>
      <Typography variant="body1">
        Access and manage your important documents.
      </Typography>
    </Box>
  );
};

export default Documents; 