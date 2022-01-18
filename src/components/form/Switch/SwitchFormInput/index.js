// Libs
import React from "react";
import clsx from "clsx";

// Components
import { useSwitch } from '@mui/base/SwitchUnstyled';
import SwitchInput from "components/form/Switch/SwitchInput"
import SwitchRoot from "components/form/Switch/SwitchRoot"
import SwitchThumb from "components/form/Switch/SwitchThumb"
import SwitchTrack from "components/form/Switch/SwitchTrack"

export default function SwitchFormInput() {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

  const stateClasses = {
    checked,
    disabled,
    focusVisible,
  };
  return (
    <SwitchRoot className={clsx(stateClasses)}>
      <SwitchTrack>
        <SwitchThumb className={clsx(stateClasses)} />
      </SwitchTrack>
      <SwitchInput {...getInputProps()} aria-label="Demo switch" />
    </SwitchRoot>
  );
}
