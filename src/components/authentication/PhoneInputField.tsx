import React, { useState } from "react";
import { useField } from "formik";
import TextField from "@mui/material/TextField";

const formatPhoneNumber = (value: string): string => {
  let numbers = value.replace(/[^\d]/g, "");
  let formattedNumber = "";

  if (numbers.length > 2) {
    formattedNumber += `(${numbers.substring(0, 2)})`;
    numbers = numbers.substring(2);
  }

  if (numbers.length) {
    if (numbers.length > 5) {
      formattedNumber += ` ${numbers.substring(0, 5)}-${numbers.substring(
        5,
        9
      )}`;
    } else {
      formattedNumber += ` ${numbers.substring(0, 4)}${
        numbers.length > 4 ? "-" + numbers.substring(4) : ""
      }`;
    }
  }

  return formattedNumber;
};

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
