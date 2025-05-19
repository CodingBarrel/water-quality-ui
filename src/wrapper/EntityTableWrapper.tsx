"use client";

import { useState } from "react";
import { Alert } from "@/types/alerts";
import { EntityTable } from "@/components/entity/EntityTable";
import Link from "next/link";
import { alertsApi } from "@/api/alerts";

type Props = {
  alerts: Alert[];
};

export function EntityTableWrapper({ alerts: initialAlerts }: Props) {
  const [alerts, setAlerts] = useState(initialAlerts);

  const handleDelete = async (id: number) => {
    if (confirm("Видалити сповіщення?")) {
      await alertsApi.delete(id);
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <EntityTable
      data={alerts}
      columns={[
        { key: "controller", label: "Контролер" },
        { key: "level", label: "Рівень важливості" },
        { key: "createdAt", label: "Створено" },
        { key: "readAt", label: "Відправлено" },
      ]}
      actions={(item) => (
        <div className="flex gap-2">
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
  );
}
