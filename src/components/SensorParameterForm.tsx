"use client";

import { sensorParametersApi } from "@/api/sensor-parameters";
import { SensorParameter } from "@/types/sensor-parameter";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputField from "./form/InputField";

type Props = {
  mode: "create" | "edit";
  initialData?: Partial<SensorParameter>;
};

export default function SensorParameterForm({ mode, initialData }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<SensorParameter>>({
    name: initialData?.name || "",
    unit: initialData?.unit || "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    key: keyof SensorParameter,
    value: string | number | boolean
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        await sensorParametersApi.create(form);
      } else if (initialData?.id) {
        await sensorParametersApi.update(initialData.id, form);
      }
      router.push("/sensor-parameters");
    } catch (err) {
      console.error(err);
      setError("❌ Помилка при збереженні параметру сенсора");
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
        <InputField
          label="Одиниця вимірювання"
          value={form.unit ?? ""}
          onChange={(val) => handleChange("unit", val)}
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
