import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { FormikProps } from 'formik';

interface FormFieldProps {
  id: string;
  isNum?: boolean;
  type?: string;
  formik: FormikProps<any>;
}

export function FormField({ id, isNum = false, type = 'text', formik }: FormFieldProps) {
  let title = id.charAt(0).toUpperCase() + id.slice(1);
  if (title === 'Title') title = 'Quiz Title';
  return (
    <FormControl>
      <FormLabel htmlFor={id} mb={0}>
        {title}
      </FormLabel>
      <Input
        id={id}
        name={id}
        type={isNum ? 'number' : type}
        onChange={formik.handleChange}
        value={formik.values[id]}
      />
    </FormControl>
  );
}
