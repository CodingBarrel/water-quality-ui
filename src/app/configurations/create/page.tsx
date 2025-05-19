import ConfigurationForm from "@/components/ConfigurationForm";

export default function CreateConfigurationPage() {
  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Створення конфігурації</h1>
        <p className="text-sm text-gray-500 mt-1">
          Заповніть форму нижче, щоб додати нову конфігурацію.
        </p>
      </div>
      <ConfigurationForm mode={"create"} />
    </main>
  );
}
