import RuleTemplateForm from "@/components/RuleTemplateForm";

export default function CreateRuleTemplatePage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Створити шаблон правила</h1>
      <RuleTemplateForm mode={"create"} />
    </main>
  );
}
