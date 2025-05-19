import "./globals.css";
import "leaflet/dist/leaflet.css";
import NavSidebar from "@/components/layout/NavSidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-50 text-gray-900">
        <NavSidebar />
        <main className="flex-1 p-6">
          <header className="flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm rounded-md mb-6">
            <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
              Система контролю
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                Адміністратор
              </span>
            </div>
          </header>

          {children}
        </main>
      </body>
    </html>
  );
}
