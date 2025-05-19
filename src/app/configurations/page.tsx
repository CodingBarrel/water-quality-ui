import { configurationsApi } from "@/api/configurations";
import { EntityTable } from "@/components/entity/EntityTable";
import Link from "next/link";

export default async function ConfigurationsPage() {
  const configurations = await configurationsApi.getAll();

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Конфігурації</h1>
        <Link href="/configurations/create" className="btn-primary">
          ➕ Створити
        </Link>
      </div>
      <EntityTable
        data={configurations}
        columns={[
          { key: "name", label: "Назва" },
          {
            key: "getConfigurationUpdateDelay",
            label: "Затримка запиту на сервер",
          },
          {
            key: "sendLogsDelay",
            label: "Затримка відправлення логів на сервер",
          },
          { key: "isDefault", label: "Початкова?" },
          { key: "createdAt", label: "Активний" },
          { key: "updatedAt", label: "Створено" },
        ]}
        actions={(item) => (
          <Link
            href={`/configurations/${item.id}/edit`}
            className="text-blue-600 hover:underline"
          >
            Редагувати
          </Link>
        )}
      />
    </main>
  );
}
