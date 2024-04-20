import React from "react";
import { Field, FieldProps } from "formik";
import { TextField } from "@mui/material";

export interface RegisterInputProps {
  name: string;
  label: string;
  type: "text" | "date" | "time";
}

const InputField: React.FC<RegisterInputProps> = ({ name, label, type }) => {
  var inputLabelProps: { shrink: boolean } | undefined = undefined;
  if (type === "time" || type === "date") {
    inputLabelProps = { shrink: true };
  }

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <TextField
          {...field}
          label={label}
          type={type}
          fullWidth
          margin="dense"
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error ? meta.error : ""}
          InputLabelProps={inputLabelProps}
        />
      )}
    </Field>
  );
};

export default InputField;
