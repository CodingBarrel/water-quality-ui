"use client";

import { sensorsApi } from "@/api/sensors";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InputField from "./form/InputField";
import { Sensor } from "@/types/sensors/sensor";
import FormSelect from "./form/FormSelect";
import { sensorParametersApi } from "@/api/sensor-parameters";
import { SensorDto } from "@/types/sensors/sensor.dto";
import FormSwitch from "./form/FormSwitch";

type Props = {
  mode: "create" | "edit";
  initialData?: Partial<Sensor>;
};

export default function SensorForm({ mode, initialData }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<SensorDto>({
    parameterId: initialData?.parameter?.id || 0,
    isEnabled: initialData?.isEnabled || false,
    delayMS: initialData?.delayMS || 0,
  });

  const [sensorParametersOptions, setsensorParametersOptions] = useState<
    { label: string; value: number }[]
  >([]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    sensorParametersApi
      .getAll()
      .then((sensorParameters) =>
        setsensorParametersOptions(
          sensorParameters.map((sp) => ({ label: sp.name, value: sp.id }))
        )
      );
  }, []);

  const handleChange = (
    key: keyof SensorDto,
    value: string | number | boolean
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        await sensorsApi.create(form);
      } else if (initialData?.id) {
        await sensorsApi.updateByControllerSNAndLocalId(
          initialData.controller?.serialNumber,
          initialData.localId,
          form
        );
      }
      router.push(`/controllers/${initialData?.controller?.serialNumber}/sensors`);
    } catch (err) {
      console.error(err);
      setError("❌ Помилка при збереженні параметру сенсора");
    }
  };

  return (
    <div className="form-div">
      <form onSubmit={handleSubmit} className="form">
        <InputField
          label="Локальний ідентифікатор"
          value={initialData?.localId ?? ""}
          readOnly
        />
        <InputField label="Пін" value={initialData?.pin ?? ""} readOnly />
        <FormSelect
          label="Параметр"
          value={form.parameterId}
          options={sensorParametersOptions}
          onChange={(val) => handleChange("parameterId", Number(val))}
        />
        <InputField
          label="Затримка"
          type="number"
          value={form.delayMS ?? 0}
          onChange={(val) => handleChange("delayMS", val)}
          required
        />
        <FormSwitch
          label="Активний"
          checked={form.isEnabled ?? false}
          onChange={(val) => handleChange("isEnabled", val)}
        />

        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="btn btn-blue ml-auto">
          {mode === "create" ? "✅ Створити" : "💾 Зберегти зміни"}
        </button>
      </form>
    </div>
  );
}
