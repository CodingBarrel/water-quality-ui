"use client";

import { useState } from "react";
import { checkpointsApi } from "@/api/checkpoints";
import { Checkpoint } from "@/types/checkpoint";
import { useRouter } from "next/navigation";
import InputField from "@/components/form/InputField";
import FormSwitch from "@/components/form/FormSwitch";

type Props = {
  mode: "create" | "edit";
  initialData?: Partial<Checkpoint>;
};

export default function CheckpointForm({ mode, initialData }: Props) {
  const router = useRouter();

  const [form, setForm] = useState<Partial<Checkpoint>>({
    name: initialData?.name || "",
    latitude: initialData?.latitude || 0,
    longitude: initialData?.longitude || 0,
    description: initialData?.description || "",
    isActive: initialData?.isActive ?? true,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    key: keyof Checkpoint,
    value: string | number | boolean
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        await checkpointsApi.create(form);
      } else if (initialData?.id) {
        await checkpointsApi.update(initialData.id, form);
      }
      router.push("/checkpoints");
    } catch (err) {
      console.error(err);
      setError("❌ Помилка при збереженні точки контролю");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md dark:bg-neutral-900 p-6 rounded-xl space-y-6 max-w-xl border border-gray-200 dark:border-neutral-800">
      <InputField
        label="Назва контрольної точки"
        value={form.name ?? ""}
        onChange={(val) => handleChange("name", val)}
        required
      />

      <InputField
        label="Широта"
        type="number"
        value={form.latitude ?? ""}
        onChange={(val) => handleChange("latitude", Number(val))}
        required
      />

      <InputField
        label="Довгота"
        type="number"
        value={form.longitude ?? ""}
        onChange={(val) => handleChange("longitude", Number(val))}
        required
      />

      <InputField
        label="Опис"
        type="textarea"
        value={form.description ?? ""}
        onChange={(val) => handleChange("description", val)}
      />

      <FormSwitch
        label="Активний"
        checked={form.isActive ?? false}
        onChange={(val) => handleChange("isActive", val)}
      />

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        className="btn btn-blue"
      >
        {mode === "create" ? "✅ Створити" : "💾 Зберегти зміни"}
      </button>
    </form>
  );
}
