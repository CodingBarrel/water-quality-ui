"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormSelect from "./form/FormSelect";
import { Command } from "@/types/commands/commands";
import { CommandDto } from "@/types/commands/command.dto";
import { controllersApi } from "@/api/controllers";
import { commandsApi } from "@/api/commands";
import InputField from "./form/InputField";

type Props = {
  mode: "create" | "edit";
  initialData?: Command;
};

export default function CommandForm({ mode, initialData }: Props) {
  const router = useRouter();

  const [form, setForm] = useState<CommandDto>({
    controllerId: initialData?.controller.id || 0,
    deviceLocalId: initialData?.deviceLocalId || "",
    action: initialData?.action || "",
    level: initialData?.level || 0,
    delaysMs: initialData?.delaysMs || 0,
  });

  const [controllerOptions, setControllersOptions] = useState<
    { label: string; value: number }[]
  >([]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    controllersApi
      .getAll()
      .then((controllers) =>
        setControllersOptions(
          controllers.map((c) => ({ label: c.serialNumber, value: c.id }))
        )
      );
  }, []);

  const handleChange = (
    key: keyof CommandDto,
    value: string | number | boolean
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        await commandsApi.create(form);
      } else if (initialData?.id) {
        await commandsApi.update(initialData.id, form);
      }
      router.push("/commands");
    } catch (err) {
      console.error(err);
      setError("❌ Помилка при збереженні команди");
    }
  };

  return (
    <div className="form-div">
      <form onSubmit={handleSubmit} className="form">
        <FormSelect
          label="Контролер"
          value={form.controllerId}
          onChange={(val) => handleChange("controllerId", Number(val))}
          options={controllerOptions}
        />
        <InputField
          label="Локальний ідентифікатор пристрою"
          value={form.deviceLocalId ?? ""}
          onChange={(val) => handleChange("deviceLocalId", val)}
          required
        />
        <InputField
          label="Дія"
          value={form.action ?? ""}
          onChange={(val) => handleChange("action", val)}
          required
        />
        <InputField
          label="Рівень"
          value={form.level ?? ""}
          onChange={(val) => handleChange("level", val)}
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
