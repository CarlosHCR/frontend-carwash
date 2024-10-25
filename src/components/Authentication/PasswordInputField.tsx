import React, { useState } from "react";
import { Field } from "formik";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export interface RegisterInputProps {
  name: string;
  label: string;
  type: "password";
}

const PasswordInputField: React.FC<RegisterInputProps> = ({
  name,
  label,
  type,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Field name={name}>
      {({ field, meta }: any) => (
        <TextField
          {...field}
          label={label}
          type={type === "password" && !showPassword ? "password" : "text"}
          fullWidth
          margin="dense"
          error={meta.touched && meta.error !== undefined}
          helperText={meta.touched && meta.error ? meta.error : ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleToggleShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    </Field>
  );
};

export default PasswordInputField;
