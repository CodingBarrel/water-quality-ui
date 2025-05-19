"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { controllersApi } from "@/api/controllers";
import { RuleAssignment } from "@/types/rule-assignments/rule-assignment";
import { UpdateRuleAssignmentDto } from "@/types/rule-assignments/rule-assignment.dto";
import { ruleTemplatesApi } from "@/api/rule-templates";
import { ruleAssignmentsApi } from "@/api/rule-assignments";
import FormSelect from "./form/FormSelect";
import FormSwitch from "./form/FormSwitch";
import { sensorsApi } from "@/api/sensors";
import { Sensor } from "@/types/sensors/sensor";
import { Device } from "@/types/devices";

type Props = {
  mode: "create" | "edit";
  initialData?: RuleAssignment;
};

export default function RuleAssignmentForm({ mode, initialData }: Props) {
  const router = useRouter();

  const [form, setForm] = useState<UpdateRuleAssignmentDto>({
    controllerId: initialData?.controller.id || 0,
    templateId: initialData?.template.id || 0,
    parameterMap: initialData?.parameterMap || { sensors: {}, devices: {} },
    isEnabled: initialData?.isEnabled || false,
  });

  const [ruleTemplateOptions, setRuleTemplateOptions] = useState<
    { label: string; value: number }[]
  >([]);

  const [controllerOptions, setControllersOptions] = useState<
    { label: string; value: number }[]
  >([]);

  const [templateParams, setTemplateParams] = useState<{
    sensors: string[];
    devices: string[];
  }>({
    sensors: [],
    devices: [],
  });

  const [availableSensors, setAvailableSensors] = useState<Sensor[]>([]);
  const [availableDevices, setAvailableDevices] = useState<Device[]>([]); // поки можеш заглушкою

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ruleTemplatesApi
      .getAll()
      .then((ruleTemplates) =>
        setRuleTemplateOptions(
          ruleTemplates.map((rt) => ({ label: rt.name, value: rt.id }))
        )
      );

    controllersApi
      .getAll()
      .then((controllers) =>
        setControllersOptions(
          controllers.map((c) => ({ label: c.serialNumber, value: c.id }))
        )
      );
  }, []);

  useEffect(() => {
    if (form.templateId) {
      ruleTemplatesApi.getParameters(form.templateId).then((data) => {
        setTemplateParams(data);
        console.log(data);
      });
    }
  }, [form.templateId]);

  useEffect(() => {
    if (form.controllerId) {
      console.log(`Changed controller id to ${form.controllerId}`);
      const selectedController = controllerOptions.find(
        (c) => c.value === form.controllerId
      );
      if (selectedController) {
        const serialNumber = selectedController.label;
        console.log(`Found label to ${form.controllerId} as ${serialNumber}`);

        sensorsApi.getByControllerSN(serialNumber).then((data) => {
          setAvailableSensors(data);
          console.log(data);
        });

        console.log(`Available sensors: ${availableSensors}`);
      }
    }
  }, [form.controllerId, controllerOptions]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      parameterMap: {
        sensors: Object.fromEntries(
          templateParams.sensors.map((key) => [
            key,
            prev.parameterMap.sensors?.[key] || "",
          ])
        ),
        devices: Object.fromEntries(
          templateParams.devices.map((key) => [
            key,
            prev.parameterMap.devices?.[key] || "",
          ])
        ),
      },
    }));
  }, [templateParams]);

  const handleChange = (
    key: keyof UpdateRuleAssignmentDto,
    value: string | number | boolean
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        await ruleAssignmentsApi.create(form);
      } else if (initialData?.id) {
        await ruleAssignmentsApi.update(initialData.id, form);
      }
      router.push("/rule-assignments");
    } catch (err) {
      console.error(err);
      setError("❌ Помилка при збереженні присвоєння правила");
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

        <FormSelect
          label="Шаблон"
          value={form.templateId}
          onChange={(val) => handleChange("templateId", Number(val))}
          options={ruleTemplateOptions}
        />

        <div>
          <h3 className="text-lg font-semibold mt-4 mb-2">🧪 Сенсори</h3>
          {templateParams.sensors.map((param) => (
            <FormSelect
              key={param}
              label={param}
              value={form.parameterMap.sensors?.[param] || ""}
              onChange={(val) =>
                setForm((prev) => ({
                  ...prev,
                  parameterMap: {
                    ...prev.parameterMap,
                    sensors: {
                      ...prev.parameterMap.sensors,
                      [param]: val,
                    },
                  },
                }))
              }
              options={availableSensors.map((s) => ({
                value: s.localId,
                label: `${s.localId} (pin: ${s.pin})`,
              }))}
            />
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold mt-4 mb-2">⚙️ Девайси</h3>
          {templateParams.devices.map((param) => (
            <FormSelect
              key={param}
              label={param}
              value={form.parameterMap.devices?.[param] || ""}
              onChange={(val) =>
                setForm((prev) => ({
                  ...prev,
                  parameterMap: {
                    ...prev.parameterMap,
                    devices: {
                      ...prev.parameterMap.devices,
                      [param]: val,
                    },
                  },
                }))
              }
              options={availableDevices.map((d) => ({
                value: d.localId,
                label: `${d.localId}`,
              }))}
            />
          ))}
        </div>

        <FormSwitch
          label="Увімкнене"
          checked={form.isEnabled ?? false}
          onChange={(val) => handleChange("isEnabled", val)}
        />

        {error && <p className="text-red-600">{error}</p>}

        <button type="submit" className="btn btn-blue">
          💾 Зберегти зміни
        </button>
      </form>
    </div>
  );
}
