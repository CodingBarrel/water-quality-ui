type EntityTableProps<T> = {
  data: T[];
  columns: { key: keyof T; label: string }[];
  actions?: (item: T) => React.ReactNode;
};

export function EntityTable<T>({ data, columns, actions }: EntityTableProps<T>) {
  return (
    <div className="overflow-x-auto border rounded-md shadow-sm bg-white dark:bg-neutral-900">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 dark:bg-neutral-800 font-semibold text-xs tracking-wide text-gray-600 uppercase">
          <tr>
            {columns.map((col) => (
              <th key={col.key as string} className="px-4 py-2 border-b">
                {col.label}
              </th>
            ))}
            {actions && <th className="px-4 py-2 border-b">Дії</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className={`border-b transition hover:bg-gray-50 dark:hover:bg-neutral-800 ${
                i % 2 === 1 ? "bg-gray-50 dark:bg-neutral-900" : ""
              }`}
            >
              {columns.map((col) => (
                <td key={col.key as string} className="px-4 py-2 font-mono text-[13px]">
                  {String(row[col.key] ?? "—")}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-2 whitespace-nowrap">{actions(row)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}
