import React from "react";
import { Field, FieldInputProps, FieldMetaProps } from "formik";
import { TextField } from "@mui/material";

export interface CustomTextareaProps {
  name: string;
  label: string;
  rows: number;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  name,
  label,
  rows,
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
        <TextField
          {...field}
          label={label}
          multiline
          rows={rows}
          fullWidth
          margin="dense"
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error ? meta.error : ""}
        />
      )}
    </Field>
  );
};

export default CustomTextarea;
