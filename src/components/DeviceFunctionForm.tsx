"use client";

import { deviceFunctionsApi } from "@/api/device-functions";
import { DeviceFunction } from "@/types/device-function";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputField from "./form/InputField";

type Props = {
  mode: "create" | "edit";
  initialData?: Partial<DeviceFunction>;
};

export default function DeviceFunctionForm({ mode, initialData }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<DeviceFunction>>({
    name: initialData?.name || "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    key: keyof DeviceFunction,
    value: string | number | boolean
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        await deviceFunctionsApi.create(form);
      } else if (initialData?.id) {
        await deviceFunctionsApi.update(initialData.id, form);
      }
      router.push("/device-functions");
    } catch (err) {
      console.error(err);
      setError("❌ Помилка при збереженні функції пристрою");
    }
  };

  return (
    <div className="form-div">
      <form onSubmit={handleSubmit} className="form">
        <InputField
          label="Назва"
          value={form.name ?? ""}
          onChange={(val) => handleChange("name", val)}
          required
        />

        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="btn btn-blue ml-auto">
          {mode === "create" ? "✅ Створити" : "💾 Зберегти зміни"}
        </button>
      </form>
    </div>
  );
}
