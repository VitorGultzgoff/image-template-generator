// Libs imports
import React from "react";
import { NumberFormatProps } from "react-number-format";

export interface ICurrencyInput {
  component: React.ComponentClass<NumberFormatProps>;
  setValue: (value: number | undefined) => void;
}
