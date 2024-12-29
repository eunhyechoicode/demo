import MyPage from '../../components/Mypage';
import { Stack, Typography } from '@mui/material';
import LoginForm from './LoginForm';

const LogIn = () => {
  return (
    <MyPage>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h3">Log In</Typography>
        <LoginForm />
      </Stack>
    </MyPage>
  );
};

export default LogIn;
