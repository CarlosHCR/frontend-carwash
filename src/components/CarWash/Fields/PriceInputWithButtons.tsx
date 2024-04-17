import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, InputAdornment } from "@mui/material";
import { Field, FieldProps, useFormikContext } from "formik";

interface FormValues {
  [key: string]: string;
}

export interface PriceInputProps {
  name: string;
  label: string;
  type: "text";
}

const PriceInputWithButtons: React.FC<PriceInputProps> = ({
  name,
  label,
  type,
}) => {
  const { setFieldValue, values } = useFormikContext<FormValues>();
  const [number, setNumber] = useState("");

  useEffect(() => {
    const fieldValue = values[name] || "";
    setNumber(fieldValue.toString().replace(/,/g, "."));
  }, [values, name]);
  const handleChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/,/g, ".");
    setNumber(value);
    setFieldValue(name, value);
  };

  const addValue = (valueToAdd: number) => {
    const currentNumber = parseFloat(number.replace(/,/g, ".")) || 0;
    const newValue = (currentNumber + valueToAdd).toString();
    setNumber(newValue.replace(/\./g, ","));
    setFieldValue(name, newValue.replace(/\./g, ","));
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <Field name={name}>
          {({ field, meta }: FieldProps) => (
            <TextField
              {...field}
              label={label}
              type={type}
              value={number}
              fullWidth
              margin="dense"
              onChange={handleChange}
              error={meta.touched && !!meta.error}
              helperText={meta.touched && meta.error ? meta.error : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              }}
            />
          )}
        </Field>
      </Grid>
      <Grid item xs={12} container justifyContent="space-evenly" padding={2}>
        <Button variant="outlined" onClick={() => addValue(10)}>
          +10
        </Button>
        <Button variant="outlined" onClick={() => addValue(50)}>
          +50
        </Button>
        <Button variant="outlined" onClick={() => addValue(100)}>
          +100
        </Button>
      </Grid>
    </Grid>
  );
};

export default PriceInputWithButtons;
