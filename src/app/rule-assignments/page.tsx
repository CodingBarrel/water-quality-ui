import { ruleAssignmentsApi } from "@/api/rule-assignments";
import { EntityTable } from "@/components/entity/EntityTable";
import Link from "next/link";

export default async function RuleAssignmentsPage() {
  const ruleAssingments = await ruleAssignmentsApi.getAll();

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Присвоєння правил</h1>
        <Link href="/rule-assignments/create" className="btn-primary">
          ➕ Створити
        </Link>
      </div>
      <EntityTable
        data={ruleAssingments}
        columns={[
          { key: "controller", label: "Контролер" },
          { key: "template", label: "Шаблон" },
          { key: "parameterMap", label: "Мапа параметрів" },
          { key: "isEnabled", label: "Стан" },
          { key: "createdAt", label: "Створено" },
          { key: "updatedAt", label: "Оновлено" },
        ]}
        actions={(item) => (
          <Link
            href={`/rule-assignments/${item.id}/edit`}
            className="text-blue-600 hover:underline"
          >
            Редагувати
          </Link>
        )}
      />
    </main>
  );
}
