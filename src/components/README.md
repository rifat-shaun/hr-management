# Toast Notifications

This project uses `react-toastify` for toast notifications. The implementation includes a service layer and custom hooks for easy usage throughout the application.

## Features

- ✅ Success, Error, Warning, and Info toast types
- ✅ Customizable positioning and timing
- ✅ Dark/Light theme support
- ✅ Draggable toasts
- ✅ Progress bars
- ✅ Auto-dismiss functionality
- ✅ Manual dismiss options

## Usage

### Using the Toast Service

```typescript
import { toastService } from '@/services';

// Success toast
toastService.success('Operation completed successfully!');

// Error toast
toastService.error('Something went wrong!');

// Warning toast
toastService.warning('Please check your input!');

// Info toast
toastService.info('Here is some information!');

// Custom toast with options
toastService.custom('Custom message', {
  position: 'bottom-center',
  autoClose: 3000,
});

// Dismiss all toasts
toastService.dismiss();

// Dismiss specific toast
toastService.dismissToast(toastId);
```

### Using the useToast Hook

```typescript
import { useToast } from '@/hooks/useToast';

const MyComponent = () => {
  const { success, error, warning, info, custom, dismiss } = useToast();

  const handleSuccess = () => {
    success('Success message!');
  };

  const handleError = () => {
    error('Error message!');
  };

  // ... other handlers
};
```

## Toast Options

You can customize toasts with the following options:

```typescript
interface ToastOptions {
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
  autoClose?: number | false;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  progress?: number;
  theme?: 'light' | 'dark' | 'colored';
}
```

## Default Configuration

The toast container is configured with these defaults:

- **Position**: Top-right
- **Auto Close**: 5 seconds
- **Theme**: Automatically matches app theme (dark/light)
- **Progress Bar**: Visible
- **Draggable**: Enabled
- **Pause on Hover**: Enabled

## Examples

### Basic Usage in Components

```typescript
import { useToast } from '@/hooks/useToast';

const LoginForm = () => {
  const { success, error } = useToast();

  const handleSubmit = async (formData) => {
    try {
      const response = await loginAPI(formData);
      if (response.success) {
        success('Successfully logged in!');
        // Navigate to dashboard
      } else {
        error(response.message || 'Login failed');
      }
    } catch (err) {
      error('An unexpected error occurred');
    }
  };
};
```

### Custom Toast with Different Position

```typescript
const { custom } = useToast();

custom('This toast appears at the bottom center', {
  position: 'bottom-center',
  autoClose: 3000,
  theme: 'colored'
});
```

## Testing

Use the `ToastDemo` component to test different toast types:

```typescript
import { ToastDemo } from '@/components/ToastDemo';

// Add to any page for testing
<ToastDemo />
```

## Styling

The toast styling automatically adapts to your app's theme. You can customize the appearance by modifying the CSS or using the theme options in the ToastContainer component. 