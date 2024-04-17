import React from "react";
import { Field } from "formik";
import { TextField } from "@mui/material";

export interface RegisterInputProps {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "date";
}

const TextInputField: React.FC<RegisterInputProps> = ({
  name,
  label,
  type,
}) => {
  return (
    <Field name={name}>
      {({ field, meta }: any) => (
        <TextField
          {...field}
          label={label}
          type={type}
          fullWidth
          margin="dense"
          error={meta.touched && meta.error !== undefined}
          helperText={meta.touched && meta.error ? meta.error : ""}
        />
      )}
    </Field>
  );
};

export default TextInputField;
