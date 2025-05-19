"use client";

import dynamic from "next/dynamic";

const MonitoringMap = dynamic(() => import("@/components/MonitoringMap"), {
  ssr: false,
});

export default function MonitoringMapClientWrapper() {
  return <MonitoringMap />;
}
