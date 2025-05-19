"use client";

import React from "react";

type Props = {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
};

export default function FormSwitch({
  label,
  checked,
  onChange,
  disabled,
}: Props) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <span className="text-sm">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 rounded text-blue-600 focus:ring-0"
      />
    </label>
  );
}
