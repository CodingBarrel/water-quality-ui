import RuleTemplateForm from "@/components/RuleTemplateForm";
import { notFound } from "next/navigation";
import { ruleTemplatesApi } from "@/api/rule-templates";

type Props = {
  params: { id: string };
};

export default async function RuleTemplatesEditPage({ params }: Props) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return notFound();

  const ruleTemplate = await ruleTemplatesApi.getOne(id);
  if (!ruleTemplate) return notFound();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Редагувати шаблон правила</h1>
      <RuleTemplateForm mode="edit" initialData={ruleTemplate} />
    </main>
  );
}
