"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { controllersApi } from "@/api/controllers";
import { configurationsApi } from "@/api/configurations";
import { checkpointsApi } from "@/api/checkpoints";
import { Controller } from "@/types/controllers/controller";
import FormSelect from "@/components/form/FormSelect";
import InputField from "@/components/form/InputField";
import { UpdateControllerDto } from "@/types/controllers/controller.dto";

type Props = {
  initialData: Controller;
};

export default function ControllerForm({ initialData }: Props) {
  const router = useRouter();

  const [form, setForm] = useState<UpdateControllerDto>({
  configurationId: initialData?.configuration?.id || 0,
  checkpointId: initialData?.checkpoint?.id || 0,
  status: initialData?.status || "",
});

  const [configurationOptions, setConfigurationOptions] = useState<
    { label: string; value: number }[]
  >([]);
  const [checkpointOptions, setCheckpointOptions] = useState<
    { label: string; value: number }[]
  >([]);
  const [statusOptions, setStatusOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    configurationsApi
      .getAll()
      .then((configs) =>
        setConfigurationOptions(
          configs.map((cfg) => ({ label: cfg.name, value: cfg.id }))
        )
      );
    checkpointsApi
      .getAll()
      .then((cps) =>
        setCheckpointOptions(
          cps.map((cp) => ({ label: cp.name, value: cp.id }))
        )
      );
    controllersApi
      .getStatuses()
      .then((statusesEnum) =>
        setStatusOptions(
          Object.entries(statusesEnum).map(([k, v]) => ({ label: k, value: v }))
        )
      );
  }, []);

  const handleChange = <K extends keyof UpdateControllerDto>(
  key: K,
  value: UpdateControllerDto[K]
) => {
  setForm((prev) => ({ ...prev, [key]: value }));
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await controllersApi.update(initialData.serialNumber, form);
    router.push("/controllers");
  };

  return (
    <div className="form-div">
    <form onSubmit={handleSubmit} className="form">
      <InputField label="ID" value={initialData.id} readOnly />
      <InputField
        label="Serial Number"
        value={initialData.serialNumber}
        readOnly
      />
      <InputField
        label="Firmware Version"
        value={initialData.firmwareVersion}
        readOnly
      />
      <InputField label="IP" value={initialData.ip || ""} readOnly />
      <InputField label="Створено" value={initialData.createdAt} readOnly />
      <InputField label="Оновлено" value={initialData.updatedAt} readOnly />
      <InputField label="Синхронізовано" value={initialData.lastSyncedAt || ""} readOnly />

      <FormSelect
        label="Конфігурація"
        value={form.configurationId}
        onChange={(val) => handleChange("configurationId", Number(val))}
        options={configurationOptions}
      />

      <FormSelect
        label="Контрольна точка"
        value={form.checkpointId}
        onChange={(val) => handleChange("checkpointId", Number(val))}
        options={checkpointOptions}
      />

      <FormSelect
        label="Статус"
        value={form.status}
        onChange={(val) => handleChange("status", val)}
        options={statusOptions}
      />

      <button
        type="submit"
        className="btn btn-blue ml-auto"
      >
        💾 Зберегти зміни
      </button>
    </form>
    </div>
  );
}
