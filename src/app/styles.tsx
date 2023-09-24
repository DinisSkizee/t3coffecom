"use client";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

export const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#3E4A59",
    opacity: "70%",
  },
  "& label": {
    color: "#4B5461",
    opacity: "45%",
  },
  "& .MuiInput-input": {
    color: "#24272B",
    opacity: "80%",
    marginTop: "3px",
    marginBottom: "4px",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#c28e79",
  },

  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#c28e79",
    },
  },
});
