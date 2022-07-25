// Libs
import React from "react";
import clsx from "clsx";

// Components
import { useSwitch } from "@mui/base/SwitchUnstyled";
import SwitchInput from "components/form/Switch/SwitchInput";
import SwitchRoot from "components/form/Switch/SwitchRoot";
import SwitchThumb from "components/form/Switch/SwitchThumb";
import SwitchTrack from "components/form/Switch/SwitchTrack";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { InputProps, SvgIconTypeMap } from "@mui/material";

interface ISwitchFormInputProps extends InputProps {
  checked: boolean;
  LeftIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  RightIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

export default function SwitchFormInput(props: ISwitchFormInputProps) {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);
  const { LeftIcon, RightIcon } = props;

  const stateClasses = {
    checked,
    disabled,
    focusVisible,
  };
  return (
    <SwitchRoot className={clsx(stateClasses)}>
      <SwitchTrack>
        <SwitchThumb className={clsx(stateClasses)}>
          {LeftIcon && !checked && (
            <LeftIcon className="colorWhite iconAsBackground" />
          )}
          {RightIcon && checked && (
            <RightIcon className="colorWhite iconAsBackground" />
          )}
        </SwitchThumb>
      </SwitchTrack>
      <SwitchInput {...getInputProps()} aria-label="generic-switch-input" />
    </SwitchRoot>
  );
}
