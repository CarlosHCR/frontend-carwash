import React from "react";
import { useField } from "formik";
import TextField from "@mui/material/TextField";
import { formatPhoneNumber } from "utils/Formats";

interface PhoneInputFieldProps {
  name: string;
  label: string;
}

export const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  name,
  label,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/[^\d]/g, "");
    const formattedValue = formatPhoneNumber(rawValue);
    helpers.setValue(rawValue);
    event.target.value = formattedValue;
  };

  return (
    <TextField
      {...field}
      value={formatPhoneNumber(field.value || "")}
      onChange={handleChange}
      onBlur={() => helpers.setTouched(true)}
      label={label}
      type="text"
      fullWidth
      inputProps={{ maxLength: 15 }}
      margin="dense"
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error ? meta.error : ""}
    />
  );
};
