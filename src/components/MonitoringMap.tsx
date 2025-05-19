"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Reading = {
  localId: string;
  parameter: string | null;
  value: number;
  unit?: string;
  timestamp: string;
};

type MonitoringCheckpoint = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  readings: Reading[];
};

export default function MonitoringMap() {
  const [points, setPoints] = useState<MonitoringCheckpoint[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/monitoring/all-latest")
      .then((res) => res.json())
      .then(setPoints);
  }, []);

  return (
    <MapContainer
      center={[50.45, 30.52]}
      zoom={6}
      scrollWheelZoom
      className="h-[600px] w-full rounded shadow"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {points.map((cp) => (
        <Marker key={cp.id} position={[cp.latitude, cp.longitude]}>
          <Popup>
            <div>
              <h3 className="font-bold mb-1">{cp.name}</h3>
              {cp.readings.length === 0 ? (
                <p className="text-sm text-gray-500">Немає даних</p>
              ) : (
                <ul className="text-sm">
                  {cp.readings.map((r, i) => (
                    <li key={i}>
                      <strong>{r.parameter ?? r.localId}:</strong> {r.value}{" "}
                      {r.unit}{" "}
                      <span className="text-gray-500 text-xs">
                        ({new Date(r.timestamp).toLocaleString()})
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
