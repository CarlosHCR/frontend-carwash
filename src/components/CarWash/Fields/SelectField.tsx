import React from "react";
import { Field, FieldInputProps, FieldMetaProps } from "formik";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { formatToBRL } from "utils/Formats";
export interface CustomSelectProps {
  name: string;
  label: string;
  options: Array<{ id: number; name: string; price: number }>;
}

const SelectField: React.FC<CustomSelectProps> = ({ name, label, options }) => {
  return (
    <Field name={name}>
      {({
        field,
        meta,
      }: {
        field: FieldInputProps<any>;
        meta: FieldMetaProps<any>;
      }) => (
        <FormControl
          fullWidth
          margin="dense"
          error={meta.touched && !!meta.error}
        >
          <InputLabel>{label}</InputLabel>
          <Select {...field} label={label}>
            {options.map(
              (option: { id: number; name: string; price: number }) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name + " " + formatToBRL(option.price)}
                </MenuItem>
              )
            )}
          </Select>
          {meta.touched && meta.error ? (
            <FormHelperText>{meta.error}</FormHelperText>
          ) : null}
        </FormControl>
      )}
    </Field>
  );
};

export default SelectField;
