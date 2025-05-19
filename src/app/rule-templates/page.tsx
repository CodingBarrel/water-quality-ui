import { ruleTemplatesApi } from "@/api/rule-templates";
import { EntityTable } from "@/components/entity/EntityTable";
import Link from "next/link";

export default async function RuleTemplatesPage() {
  const ruleTemplates = await ruleTemplatesApi.getAll();

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Шаблони правил</h1>
        <Link href="/rule-templates/create" className="btn-primary">
          ➕ Створити
        </Link>
      </div>
      <EntityTable
        data={ruleTemplates}
        columns={[
          { key: "name", label: "Назва" },
          { key: "description", label: "Опис" },
          { key: "logic", label: "Логіка" },
          { key: "createdAt", label: "Створено" },
          { key: "updatedAt", label: "Оновлено" },
        ]}
        actions={(item) => (
          <Link
            href={`/rule-templates/${item.id}/edit`}
            className="text-blue-600 hover:underline"
          >
            Редагувати
          </Link>
        )}
      />
    </main>
  );
}
