import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { MyFormContext } from './MyFormContext';

export default function MyForm({ children, defaultValues, onSubmit }) {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues || {},
  });

  const handleFormSubmit = data => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <MyFormContext.Provider value={control}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>{children}</form>
    </MyFormContext.Provider>
  );
}

MyForm.propTypes = {
  children: PropTypes.node,
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func,
};
