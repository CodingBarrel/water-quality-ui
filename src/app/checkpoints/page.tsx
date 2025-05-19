import { EntityTable } from "@/components/entity/EntityTable";
import { checkpointsApi } from "@/api/checkpoints";
import Link from "next/link";

export default async function CheckpointsPage() {
  const checkpoints = await checkpointsApi.getAll();

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Точки контролю</h1>
        <Link href="/checkpoints/create" className="btn-primary">
          ➕ Створити
        </Link>
      </div>
      <EntityTable
        data={checkpoints}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Назва" },
          { key: "latitude", label: "Широта" },
          { key: "longitude", label: "Довгота" },
          { key: "isActive", label: "Активний" },
          { key: "createdAt", label: "Створено" },
        ]}
        actions={(item) => (
          <Link
            href={`/checkpoints/${item.id}/edit`}
            className="text-blue-600 hover:underline"
          >
            Редагувати
          </Link>
        )}
      />
    </main>
  );
}
