"use client";

import { alertsApi } from "@/api/alerts";
import { EntityTable } from "@/components/entity/EntityTable";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Alert } from "@/types/alerts";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    alertsApi.getAll().then(setAlerts);
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Ви впевнені, що хочете видалити це сповіщення?")) {
      await alertsApi.delete(id);
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Сповіщення</h1>
      </div>
      <EntityTable
        data={alerts}
        columns={[
          { key: "controller", label: "Контролер" },
          { key: "level", label: "Рівень важливості" },
          { key: "createdAt", label: "Створено" },
          { key: "readAt", label: "Прочитано" },
        ]}
        actions={(item) => (
          <div className="flex gap-4">
            <Link
              href={`/alerts/${item.id}/edit`}
              className="text-blue-600 hover:underline"
            >
              Детальніше
            </Link>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-600 hover:underline"
            >
              Видалити
            </button>
          </div>
        )}
      />
    </main>
  );
}
