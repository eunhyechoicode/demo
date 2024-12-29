import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { useMyFormContext } from './MyForm/MyFormContext';

const MyTextField = ({ name, label, rules, ...props }) => {
  const control = useMyFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          label={label}
          variant="outlined"
          fullWidth
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default MyTextField;
