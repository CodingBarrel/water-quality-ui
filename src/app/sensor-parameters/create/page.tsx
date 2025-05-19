import SensorParameterForm from "@/components/SensorParameterForm";

export default function CreateSensorParameterPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Створити одиницю вимірювання</h1>
      <SensorParameterForm mode={"create"} />
    </main>
  );
}
