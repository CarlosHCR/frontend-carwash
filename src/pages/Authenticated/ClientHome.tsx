import React, { useState } from "react";
import moment from "moment";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const availableDatesStrings = [
  "2024-05-27T07:00:00Z",
  "2024-05-27T13:00:00Z",
  "2024-05-28T07:00:00Z",
  "2024-05-28T13:00:00Z",
  "2024-05-29T07:00:00Z",
  "2024-05-29T13:00:00Z",
  "2024-05-30T07:00:00Z",
  "2024-05-30T13:00:00Z",
  "2024-05-31T07:00:00Z",
  "2024-05-31T13:00:00Z",
  "2024-06-01T07:00:00Z",
  "2024-06-01T13:00:00Z",
  "2024-06-02T07:00:00Z",
  "2024-06-02T13:00:00Z",
  "2024-06-03T07:00:00Z",
  "2024-06-03T13:00:00Z",
];

const MyComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleChange = (event: SelectChangeEvent<string | null>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth margin="dense">
        <InputLabel>Select a date</InputLabel>
        <Select
          value={selectedDate}
          onChange={handleChange}
          fullWidth
        >
          {availableDatesStrings.map((dateString, index) => {
            const formattedDate = moment
              .utc(dateString)
              .format("DD-MM-YYYY HH[h]");
            return (
              <MenuItem key={index} value={dateString}>
                {formattedDate}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default MyComponent;
