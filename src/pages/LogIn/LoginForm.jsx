import { Button, Stack } from '@mui/material';
import MyForm from '../../components/MyForm';
import MyTextField from '../../components/MyTextField';

const LoginForm = () => {
  const defaultValues = {
    email: '',
    password: '',
  };

  const onSubmit = data => {
    console.log('Login data:', data);
  };

  return (
    <MyForm defaultValues={defaultValues} onSubmit={onSubmit}>
      <Stack spacing={3} padding={3}>
        <MyTextField
          name="email"
          label="Email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
        />

        <MyTextField
          name="password"
          label="Password"
          type="password"
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          }}
        />

        <Button type="submit" variant="contained" size="large">
          Log In
        </Button>
      </Stack>
    </MyForm>
  );
};

export default LoginForm;
