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
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { authServices } from '@/services';
import { HTTPError } from '@/services/model';
import { toast } from 'react-toastify';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await authServices.login(formData);
      if (response.success) {
        if (response.data.requires2FA) {
          // Redirect to 2FA page if required
          navigate('/2fa');
        } else {
          // Direct login if 2FA not required
          login(response.data.token);
          toast.success('Successfully logged in!');
          navigate('/');
        }
      } else {
        // Handle API response with success: false
        toast.error(response.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      // Handle HTTP errors (network errors, 4xx, 5xx status codes)
      if (err instanceof HTTPError) {
        toast.error(err.message || 'Login failed. Please check your credentials.');
      } else if (err instanceof Error) {
        toast.error(err.message || 'An unexpected error occurred. Please try again.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
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
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
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