"use client";

type Option = { label: string; value: string | number };

type Props = {
  label: string;
  value?: string | number;
  onChange: (val: string | number) => void;
  options: Option[];
};

export default function FormSelect({ label, value, onChange, options }: Props) {
  const internalValue = value ?? "";

  return (
    <div className="space-y-1">
      <label className="block font-medium text-sm">{label}</label>
      <select
        value={internalValue}
        onChange={(e) => {
          const val = e.target.value;
          onChange(val === "" ? "" : val); // явно обробити порожнє значення
        }}
        className="w-full px-3 py-2 rounded-md border outline-none transition bg-[var(--input)] border-[var(--border)] focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Обрати --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
