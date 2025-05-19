import { EntityTable } from "@/components/entity/EntityTable";
import { controllersApi } from "@/api/controllers";
import Link from "next/link";

export default async function ControllersPage() {
  const controllers = await controllersApi.getAll();

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Мікроконтролери</h1>
      </div>
      <EntityTable
        data={controllers}
        columns={[
          { key: "serialNumber", label: "Серійний номер" },
          { key: "firmwareVersion", label: "Версія прошивки" },
          { key: "checkpoint", label: "Контрольна точка" },
          { key: "ip", label: "IP-адреса" },
          { key: "status", label: "Стан" },
          { key: "createdAt", label: "Створено" },
          { key: "updatedAt", label: "Оновлено" },
          { key: "lastSyncedAt", label: "Синхронізовано" },
        ]}
        actions={(item) => (
          <>
            <Link
              href={`/controllers/${item.serialNumber}/edit`}
              className="text-blue-600 hover:underline"
            >
              Редагувати
            </Link>{" "}
            <Link
              href={`/controllers/${item.serialNumber}/sensors`}
              className="text-blue-600 hover:underline"
            >
              Сенсори
            </Link>{" "}
            <Link
              href={`/controllers/${item.serialNumber}/devices`}
              className="text-blue-600 hover:underline"
            >
              Пристрої
            </Link>
          </>
        )}
      />
    </main>
  );
}
