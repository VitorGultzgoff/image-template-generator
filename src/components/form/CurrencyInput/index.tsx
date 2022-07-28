// Libs
import React, { forwardRef } from "react";

// Models
import { ICurrencyInput } from "models/components/Input.model";
import { InputBaseComponentProps } from "@mui/material";

const CurrencyInput: React.ElementType<InputBaseComponentProps> = forwardRef(
  ({ component: Component, ...other }: ICurrencyInput) => {
    return (
      <Component
        {...other}
        thousandSeparator="."
        decimalSeparator=","
        isNumericString
        prefix="R$ "
      />
    );
  }
);

export default CurrencyInput;
