import CommandForm from "@/components/CommandForm";

export default function CreateCommandPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Створити команду</h1>
      <CommandForm mode={"create"} />
    </main>
  );
}
