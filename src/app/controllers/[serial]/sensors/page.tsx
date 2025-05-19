import { sensorsApi } from "@/api/sensors";
import { EntityTable } from "@/components/entity/EntityTable";
import Link from "next/link";

type Props = {
  params: {
    serial: string;
  };
};

export default async function ControllerSensorsPage({ params }: Props) {
  const sensors = await sensorsApi.getByControllerSN(params.serial);
  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Сенсори</h1>
        <Link href="/checkpoints/create" className="btn-primary">
          ➕ Створити
        </Link>
      </div>
      <EntityTable
        data={sensors}
        columns={[
          { key: "localId", label: "Локальний ідентифікатор" },
          { key: "pin", label: "Пін" },
          { key: "controller", label: "Контролер" },
          { key: "parameter", label: "Параметр" },
          { key: "parameter.unit", label: "Од. вимірювання" },
          { key: "isEnabled", label: "Стан" },
        ]}
        actions={(item) => (
          <Link
            href={`/controllers/${params.serial}/sensors/${item.localId}/edit`}
            className="text-blue-600 hover:underline"
          >
            Редагувати
          </Link>
        )}
      />
    </main>
  );
}
