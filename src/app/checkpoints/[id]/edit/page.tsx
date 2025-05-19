import { checkpointsApi } from "@/api/checkpoints";
import CheckpointForm from "@/components/CheckpointForm";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function EditCheckpointPage({ params }: Props) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return notFound();

  const checkpoint = await checkpointsApi.getOne(id);
  if (!checkpoint) return notFound();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Редагувати контрольну точку</h1>
      <CheckpointForm mode="edit" initialData={checkpoint} />
    </main>
  );
}
