import { deviceFunctionsApi } from "@/api/device-functions";
import { EntityTable } from "@/components/entity/EntityTable";
import Link from "next/link";

export default async function SensorParametersPage() {
  const deviceFunctions = await deviceFunctionsApi.getAll();

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Функції пристроїв</h1>
        <Link href="/device-functions/create" className="btn-primary">
          ➕ Створити
        </Link>
      </div>
      <EntityTable
        data={deviceFunctions}
        columns={[
          { key: "name", label: "Назва" },
        ]}
        actions={(item) => (
          <Link
            href={`/device-functions/${item.id}/edit`}
            className="text-blue-600 hover:underline"
          >
            Редагувати
          </Link>
        )}
      />
    </main>
  );
}