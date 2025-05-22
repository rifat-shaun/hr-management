import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Link,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { AuthLayout } from '../../layouts/AuthLayout';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Implement login logic
    console.log('Login attempt with:', formData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value,
    }));
  };

  return (
    <AuthLayout
      title="Sign In"
      subtitle="Welcome back! Please enter your credentials to continue."
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="rememberMe"
              color="primary"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
          }
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Link href="/forgot-password" variant="body2">
            Forgot password?
          </Link>
        </Box>
      </Box>
    </AuthLayout>
  );
}; 