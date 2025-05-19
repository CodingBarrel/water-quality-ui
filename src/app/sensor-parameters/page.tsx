import { sensorParametersApi } from "@/api/sensor-parameters";
import { EntityTable } from "@/components/entity/EntityTable";
import Link from "next/link";

export default async function SensorParametersPage() {
  const sensorParameters = await sensorParametersApi.getAll();

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Параметри сенсору</h1>
        <Link href="/sensor-parameters/create" className="btn-primary">
          ➕ Створити
        </Link>
      </div>
      <EntityTable
        data={sensorParameters}
        columns={[
          { key: "name", label: "Назва" },
          { key: "unit", label: "Од. вимірювання" },
        ]}
        actions={(item) => (
          <Link
            href={`/sensor-parameters/${item.id}/edit`}
            className="text-blue-600 hover:underline"
          >
            Редагувати
          </Link>
        )}
      />
    </main>
  );
}