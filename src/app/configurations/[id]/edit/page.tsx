import { configurationsApi } from "@/api/configurations";
import ConfigurationForm from "@/components/ConfigurationForm";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function EditConfigurationPage({ params }: Props) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return notFound();

  const config = await configurationsApi.getOne(id);
  if (!config) return notFound();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Редагувати конфігурацію</h1>
      <ConfigurationForm mode="edit" initialData={config} />
    </main>
  );
}
