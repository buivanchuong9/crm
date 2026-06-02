import React from "react";
import Switch from "components/switch/switch";

interface ButtonOnOffProps {
  checked?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  id?: string;
}

export default function ButtonOnOff({ checked, onChange, disabled, id }: ButtonOnOffProps) {
  return (
    <Switch
      id={id}
      checked={checked}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        if (!disabled && onChange) onChange(e.target.checked);
      }}
    />
  );
}
