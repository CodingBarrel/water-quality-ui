import ControllerForm from "@/components/ControllerForm";
import { controllersApi } from "@/api/controllers";

type Props = {
  params: { serial: string };
};

export default async function EditControllersPage({ params }: Props) {
  const controller = await controllersApi.getBySN(params.serial);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Редагувати контрольну точку</h1>
      <ControllerForm initialData={controller} />
    </main>
  );
}
