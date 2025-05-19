import DeviceFunctionForm from "@/components/DeviceFunctionForm";

export default function CreateDeviceFunctionPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Створити функцію пристрою</h1>
      <DeviceFunctionForm mode={"create"} />
    </main>
  );
}
