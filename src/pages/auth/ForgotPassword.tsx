import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Link,
  Alert,
} from '@mui/material';
import { AuthLayout } from '../../layouts/AuthLayout';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    try {
      // TODO: Implement password reset request logic
      console.log('Password reset requested for:', email);
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <AuthLayout
        title="Check Your Email"
        subtitle="If an account exists with the email you entered, you will receive a password reset link shortly."
      >
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link href="/login" variant="body2">
            Return to Sign In
          </Link>
        </Box>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email address and we'll send you instructions to reset your password."
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Send Reset Link
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Link href="/login" variant="body2">
            Back to Sign In
          </Link>
        </Box>
      </Box>
    </AuthLayout>
  );
}; 