import React from "react";
import { Field, FieldInputProps, FieldMetaProps } from "formik";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { formatDateAndTime } from "utils";

export interface CustomSelectProps {
  name: string;
  label: string;
  options: string[];
}

const SelectFieldDate: React.FC<CustomSelectProps> = ({
  name,
  label,
  options,
}) => {
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
          <Select
            {...field}
            label={label}
            value={field.value ? field.value : ""}
          >
            {options.map((dateString, index) => {
              const formattedDate = formatDateAndTime(dateString);
              return (
                <MenuItem key={index} value={dateString}>
                  {formattedDate}
                </MenuItem>
              );
            })}
          </Select>
          {meta.touched && meta.error ? (
            <FormHelperText>{meta.error}</FormHelperText>
          ) : null}
        </FormControl>
      )}
    </Field>
  );
};

export default SelectFieldDate;
