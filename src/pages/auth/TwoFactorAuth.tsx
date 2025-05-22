import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { AuthLayout } from '../../layouts/AuthLayout';
import { useNavigate } from 'react-router-dom';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAuth } from '../../contexts/AuthContext';

// Dummy API functions
const dummyVerify2FA = async (code: string): Promise<boolean> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return code === '123456'; // For demo purposes, accept only '123456'
};

const dummyResend2FACode = async (): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
};

export const TwoFactorAuth = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => setCountdown(c => c - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const isValid = await dummyVerify2FA(code);
      if (isValid) {
        login(); // Set authenticated state
        navigate('/'); // Navigate to dashboard
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError('Failed to verify code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError('');
    try {
      await dummyResend2FACode();
      setCountdown(30);
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    }
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setCode(value);
  };

  return (
    <AuthLayout
      title="Two-Factor Authentication"
      subtitle="Please enter the 6-digit code sent to your device"
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
          id="code"
          label="Verification Code"
          name="code"
          autoComplete="one-time-code"
          autoFocus
          value={code}
          onChange={handleCodeChange}
          inputProps={{
            maxLength: 6,
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleResendCode}
                  disabled={countdown > 0}
                  edge="end"
                >
                  <RefreshIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {countdown > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Resend code in {countdown}s
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={code.length !== 6 || isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </Button>
      </Box>
    </AuthLayout>
  );
}; 