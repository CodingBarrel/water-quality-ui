"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";
import { useMounted } from "@/hooks/useMounted";

const controllerSubmenu = [
  { href: "/controllers", label: "Контролери" },
  { href: "/configurations", label: "Конфігурації" },
  { href: "/checkpoints", label: "Точки контролю" },
  { href: "/commands", label: "Команди" },
];

const ruleSubmenu = [
  { href: "/rule-templates", label: "Шаблони правил" },
  { href: "/rule-assignments", label: "Присвоєння правил" },
];

const otherLinks = [
  { href: "/sensor-parameters", label: "Параметри сенсорів" },
  { href: "/device-functions", label: "Функцій пристроїв" },
  { href: "/alerts", label: "Сповіщення" },
  { href: "/logs", label: "Логи" },
];

export default function NavSidebar() {
  const mounted = useMounted();

  if (!mounted) return null;
  return (
    <aside className="w-64 bg-blue-900 text-white p-4">
      <h2 className="text-xl font-semibold mb-6">AquaRegula</h2>
      <nav className="space-y-2">
        <NavLink key={"/"} href={"/map"} label="Карта"></NavLink>
        <Expandable label="Контролери">
          {controllerSubmenu.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              indent
            />
          ))}
        </Expandable>

        <Expandable label="Правила">
          {ruleSubmenu.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              indent
            />
          ))}
        </Expandable>

        {otherLinks.map((link) => (
          <NavLink key={link.href} href={link.href} label={link.label} />
        ))}
      </nav>
    </aside>
  );
}

function NavLink({
  href,
  label,
  indent = false,
}: {
  href: string;
  label: string;
  indent?: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded-md font-medium transition hover:bg-blue-800 hover:pl-4 ${
        isActive ? "bg-blue-800 font-semibold shadow-inner" : ""
      } ${indent ? "ml-4 text-sm" : ""}`}
    >
      {label}
    </Link>
  );
}

function Expandable({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        type="button"
        className="flex items-center justify-between w-full hover:text-blue-200"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`${open ? "block" : "hidden"} mt-1 ml-1 space-y-1`}>
        {children}
      </div>
    </div>
  );
}
