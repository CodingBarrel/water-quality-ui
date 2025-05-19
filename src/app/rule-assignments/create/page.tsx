import RuleAssignmentForm from "@/components/RuleAssignmentForm";

export default function CreateRuleAssignmentPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Створити присвоєння правил</h1>
      <RuleAssignmentForm mode={"create"} />
    </main>
  );
}
