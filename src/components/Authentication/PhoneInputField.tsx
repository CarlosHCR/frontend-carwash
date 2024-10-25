import React, { useState } from "react";
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
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    setInputValue(formattedPhoneNumber);
    helpers.setValue(event.target.value.replace(/[^\d]/g, ""));
  };

  return (
    <TextField
      {...field}
      value={inputValue}
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
