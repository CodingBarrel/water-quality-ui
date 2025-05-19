import { ruleAssignmentsApi } from "@/api/rule-assignments";
import RuleAssignmentForm from "@/wrapper/RuleAssignmentFormWrapper";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function EditRuleAssignmentPage({ params }: Props) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return notFound();

  const ruleAssignments = await ruleAssignmentsApi.getOne(id);
  if (!ruleAssignments) return notFound();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Редагувати присвоєння правил</h1>
      <RuleAssignmentForm mode="edit" initialData={ruleAssignments} />
    </main>
  );
}
