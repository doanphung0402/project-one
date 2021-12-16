import { Checkbox } from "@material-ui/core";
import React from "react";

const Check = (props) => {
  const status = props.status;
  if (status === true) {
    return (
      <Checkbox
        defaultChecked
        color="primary"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
    );
  } else {
    return (
      <Checkbox
        color="primary"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
    );
  }
};

export default Check;
