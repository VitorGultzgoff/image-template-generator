// Libs
import React, { forwardRef } from "react";

// Models
import { ICurrencyInput } from "models/components/Input.model";
import { InputBaseComponentProps } from "@mui/material";

export const CurrencyInput: React.ElementType<InputBaseComponentProps> =
  forwardRef(({ component: Component, setValue, ...other }: ICurrencyInput) => {
    return (
      <Component
        {...other}
        thousandSeparator="."
        decimalSeparator=","
        isNumericString
        prefix="R$ "
        onValueChange={({ floatValue }) => setValue(floatValue)}
      />
    );
  });

export default CurrencyInput;
