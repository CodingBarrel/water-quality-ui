import { alertsApi } from "@/api/alerts";
import AlertForm from "@/components/AlertForm";

type Props = {
  params: { id: number };
};

export default async function EditAlertPage({ params }: Props) {
  const alert = await alertsApi.getOne(params.id);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Переглянути сповіщення</h1>
      <AlertForm initialData={alert} />
    </main>
  );
}
