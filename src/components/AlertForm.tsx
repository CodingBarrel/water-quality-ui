"use client";

import { alertsApi } from "@/api/alerts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputField from "./form/InputField";
import { Alert } from "@/types/alerts";

type Props = {
  initialData?: Partial<Alert>;
};

export default function AlertForm({ initialData }: Props) {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      alertsApi.updateSeenAt(initialData.id);
      router.push("/alerts");
    } catch (err) {
      console.error(err);
      setError("❌ Помилка при збереженні параметру сенсора");
    }
  };

  return (
    <div className="form-div">
      <form onSubmit={handleSubmit} className="form">
        <InputField
          label="Повідомлення"
          value={initialData?.message ?? ""}
          readOnly
        />
        <InputField
          label="Контролер"
          value={initialData?.controller?.serialNumber ?? ""}
          readOnly
        />
        <InputField
          label="Рівень важливості"
          value={initialData?.level ?? ""}
          readOnly
        />
        <InputField
          label="Пов'язана інформація"
          value={JSON.stringify(initialData?.relatedData) ?? ""}
          readOnly
        />
        <InputField
          label="Створено"
          value={initialData?.createdAt ?? ""}
          readOnly
        />
        <InputField
          label="Прочитано"
          value={initialData?.readAt ?? ""}
          readOnly
        />

        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="btn btn-blue ml-auto">
          {"✅ Прочитано"}
        </button>
      </form>
    </div>
  );
}
