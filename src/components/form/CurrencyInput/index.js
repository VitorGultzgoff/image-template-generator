// Libs
import React, { forwardRef } from 'react'

// Components
import NumberFormat from 'react-number-format'
import PropTypes from 'prop-types'

const CurrencyInput = forwardRef(function CurrencyInputCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props?.name,
            value: values?.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      isNumericString
      prefix="R$ "
    />
  );
});

CurrencyInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CurrencyInput