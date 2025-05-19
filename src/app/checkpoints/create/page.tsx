import CheckpointForm from "@/components/CheckpointForm";

export default function CreateCheckpointPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Створити точку контролю</h1>
      <CheckpointForm mode={"create"} />
    </main>
  );
}
