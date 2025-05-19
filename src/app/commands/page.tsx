import { EntityTable } from "@/components/entity/EntityTable";
import Link from "next/link";
import { commandsApi } from "@/api/commands";

export default async function CommandsPage() {
  const commands = await commandsApi.getAll();

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Команди</h1>
        <Link href="/commands/create" className="btn-primary">
          ➕ Створити
        </Link>
      </div>
      <EntityTable
        data={commands}
        columns={[
          { key: "controller", label: "Контролер" },
          { key: "deviceLocalId", label: "Локальний ідентифікатор пристрою" },
          { key: "action", label: "Дія" },
          { key: "level", label: "Рівень активації" },
          { key: "createdAt", label: "Створено" },
          { key: "sentAt", label: "Надіслано" },
        ]}
        actions={(item) => (
          <Link
            href={`/commands/${item.id}/edit`}
            className="text-blue-600 hover:underline"
          >
            Редагувати
          </Link>
        )}
      />
    </main>
  );
}
