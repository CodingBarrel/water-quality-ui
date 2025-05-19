"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ruleTemplatesApi } from "@/api/rule-templates";
import { RuleTemplateDto } from "@/types/rule-templates/rule-template.dto";
import { RuleTemplate } from "@/types/rule-templates/rule-template";
import InputField from "./form/InputField";

import ReactJsonPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";

type Props = {
  mode: "create" | "edit";
  initialData?: RuleTemplate;
};

export default function RuleTemplateForm({ mode, initialData }: Props) {
  const router = useRouter();

  const [form, setForm] = useState<RuleTemplateDto>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    logic: initialData?.logic || {
      if: { all: [] },
      then: [],
    },
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = <K extends keyof RuleTemplateDto>(
    key: K,
    value: RuleTemplateDto[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        await ruleTemplatesApi.create(form);
      } else if (initialData?.id) {
        await ruleTemplatesApi.update(initialData.id, form);
      }
      router.push("/rule-templates");
    } catch (err) {
      console.error(err);
      setError("❌ Помилка при збереженні шаблону правила");
    }
  };
  return (
    <div className="form-div">
    <form onSubmit={handleSubmit} className="form">
      <InputField
        label="Назва шаблону"
        value={form.name ?? ""}
        onChange={(val) => handleChange("name", val)}
        required
      />

      <InputField
        label="Опис"
        value={form.description ?? ""}
        onChange={(val) => handleChange("description", val)}
        type="textarea"
      />
      <InputField
        label="Логіка (JSON)"
        type="textarea"
        value={JSON.stringify(form.logic, null, 2)}
        onChange={(val) => {
          try {
            handleChange("logic", JSON.parse(val));
            setError(null);
          } catch (e) {
            setError("❌ JSON некоректний");
          }
        }}
      />

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        className="btn btn-blue"
      >
        {mode === "create" ? "✅ Створити" : "💾 Зберегти зміни"}
      </button>
    </form>
    </div>
  );
}
