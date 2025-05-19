import { sensorsApi } from "@/api/sensors";
import SensorForm from "@/components/SensorForm";

type Props = {
  params: { serial: string; localId: string };
};

export default async function EditSensorPage({ params }: Props) {
  const sensor = await sensorsApi.getByControllerSNAndLocalId(
    params.serial,
    params.localId
  );

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Редагувати сенсор</h1>
      <SensorForm initialData={sensor} mode={"edit"} />
    </main>
  );
}
