import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const SelectDate = ({
  field,
  value,
  readOnly,
  error,
  helperText,
  onChange,
}) => {
  function handleChange(newValue) {
    const utcDate = newValue
      ? dayjs(newValue).utc().format("YYYY-MM-DDTHH:mm:ss[Z]")
      : null;

    if (field?.key) {
      onChange(field.key, utcDate);
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          sx={{ width: "100%" }}
          label={"Mes, día y año"}
          readOnly={readOnly}
          value={value ? dayjs.utc(value) : null}
          onChange={handleChange}
          slotProps={{
            textField: {
              variant: "outlined",
              error: !!error,
              helperText: helperText,
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default SelectDate;
