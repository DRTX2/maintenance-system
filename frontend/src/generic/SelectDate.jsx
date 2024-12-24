import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const SelectDate = (field, error, helperText, onChange) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: "100%" }}>
      <DemoContainer components={["DesktopDatePicker"]}>
        <DatePicker
          label={"Mes, dia y año"}
          onChange={(newValue) => onChange(field.key, newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default SelectDate;
