import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const MuiField = ({
  setFieldValue,
  name,
  label,
  type,
  errors,
  multiline,
  touched,
  values,
  submitCount,
  rows,
  capitalize,
  inputType,
  ...restProps
}) => {
  console.log("errors", errors);
  const onChange = (e) => {
    let value = e.target.value;
    if (capitalize && value) {
      if (typeof value === "string") {
        value = value.toUpperCase();
      }
    }
    setFieldValue(name, value);
  };
  return (
    <Box sx={{ pb: 3, width: "70%" }}>
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        color={"GrayText"}
      >
        {label}
      </Typography>
      <TextField
        sx={{ minWidth: 280 }}
        fullWidth
        multiline
        rows={rows}
        name={name}
        value={values[name]}
        error={submitCount > 0 && errors[name]}
        helperText={submitCount > 0 && errors[name]}
        size="small"
        onChange={onChange}
        type={type}
        {...restProps}
      />
    </Box>
  );
};
export default MuiField;

export const MuiSelectField = ({
  setFieldValue,
  name,
  label,
  type,
  errors,
  multiline,
  touched,
  values,
  submitCount,
  rows,
  inputType,
  options,
  ...restProps
}) => {
  const onChange = (e) => {
    let value = e.target.value;
    setFieldValue(name, value);
  };
  return (
    <Box sx={{ pb: 3, width: "70%" }}>
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        color={"GrayText"}
      >
        {label}
      </Typography>
      <FormControl sx={{ minWidth: 320 }}>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          value={values[name]}
          error={submitCount > 0 && errors[name]}
          helperText={submitCount > 0 && errors[name]}
          onChange={onChange}
          {...restProps}
        >
          {Array.isArray(options) &&
            options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </Select>
        {submitCount > 0 && errors[name] && (
          <FormHelperText>With label + helper text</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export const MuiDateField = ({
  setFieldValue,
  name,
  label,
  type,
  errors,
  multiline,
  touched,
  values,
  submitCount,
  rows,
  capitalize,
  inputType,
  options,
  ...restProps
}) => {
  const onChange = (v) => {
    setFieldValue(name, v);
  };
  return (
    <Box sx={{ pb: 3, width: "70%" }}>
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        color={"GrayText"}
      >
        {label}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateField"]}>
          <DatePicker
            slotProps={{
              textField: {
                size: "small",
                error: submitCount > 0 && errors[name],
                helperText: submitCount > 0 && errors[name],
              },
            }}
            value={values[name] ? values[name] : null}
            onChange={onChange}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
};
