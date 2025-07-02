import { useState } from 'react';
import MyPage from '../components/Mypage';
import MyButton from '../components/MyButton';
import { Typography, Stack } from '@mui/material';
import useAnalytics from "../analytics/useAnalytics.jsx";

export default function Home() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    setCount(prev => prev - 1);
  };

  const analytics = useAnalytics()
  console.log(analytics)

  return (
    <MyPage>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h1">Home Page</Typography>

        <Typography variant="h4">Count: {count}</Typography>

        <Stack direction="row" spacing={2}>
          <MyButton onClick={handleDecrement}>Decrease</MyButton>
          <MyButton onClick={handleIncrement}>Increase</MyButton>
        </Stack>
      </Stack>
    </MyPage>
  );
}
