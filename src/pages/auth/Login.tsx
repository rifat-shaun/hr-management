import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Link,
  FormControlLabel,
  Checkbox,
  Alert,
} from '@mui/material';
import { AuthLayout } from '../../layouts/AuthLayout';
import { useNavigate } from 'react-router-dom';

// Dummy API function
const dummyLogin = async (email: string, password: string): Promise<{ requires2FA: boolean }> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  // For demo purposes, trigger 2FA for specific email
  return { requires2FA: email === 'test@example.com' };
};

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { requires2FA } = await dummyLogin(formData.email, formData.password);
      
      if (requires2FA) {
        // Redirect to 2FA page if required
        navigate('/2fa');
      } else {
        // Direct login if 2FA not required
        navigate('/');
      }
    } catch (err) {
      setError('Invalid email or password');
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
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
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