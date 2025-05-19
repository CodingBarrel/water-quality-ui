"use client";

import { useState } from "react";
import { configurationsApi } from "@/api/configurations";
import { useRouter } from "next/navigation";
import { Configuration } from "@/types/configuration";
import InputField from "./form/InputField";
import FormSwitch from "./form/FormSwitch";

type Props = {
  mode: "create" | "edit";
  initialData?: Configuration;
};

export default function ConfigurationForm({ mode, initialData }: Props) {
  const router = useRouter();

  const [form, setForm] = useState<Partial<Configuration>>({
    name: initialData?.name || "",
    getConfigurationUpdateDelay: initialData?.getConfigurationUpdateDelay || 0,
    sendLogsDelay: initialData?.sendLogsDelay || 0,
    isDefault: initialData?.isDefault || false,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    key: keyof Configuration,
    value: string | number | boolean
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        await configurationsApi.create(form);
      } else if (initialData?.id) {
        await configurationsApi.update(initialData.id, form);
      }
      router.push("/configurations");
    } catch (err) {
      console.error(err);
      setError("❌ Помилка при збереженні конфігурації");
    }
  };

  return (
    <div className="form-div">
    <form onSubmit={handleSubmit} className="form">
      <InputField
        label="Назва конфігурації"
        value={form.name ?? ""}
        onChange={(val) => handleChange("name", val)}
        required
      />
      <InputField
        label="Затримка перед перевікою оновлень на сервері"
        type="number"
        value={form.getConfigurationUpdateDelay ?? 0}
        onChange={(val) => handleChange("getConfigurationUpdateDelay", val)}
        required
      />
      <InputField
        label="Затримка перед надсилання історичних даних"
        type="number"
        value={form.sendLogsDelay ?? 0}
        onChange={(val) => handleChange("sendLogsDelay", val)}
        required
      />
      <FormSwitch
        label="Початкова конфігурація"
        checked={form.isDefault ?? false}
        onChange={(val) => handleChange("isDefault", val)}
      />

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        className="btn btn-blue ml-auto"
      >
        {mode === "create" ? "✅ Створити" : "💾 Зберегти зміни"}
      </button>
    </form>
    </div>
  );
}
