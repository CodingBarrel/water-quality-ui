import MonitoringMapClientWrapper from "@/wrapper/MonitoringMapClientWrapper";

export default function MonitoringMapPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">🗺️ Карта моніторингу</h1>
      <MonitoringMapClientWrapper />
    </main>
  );
}
