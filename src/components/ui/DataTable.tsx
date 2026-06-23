"use client";

import { useMemo, useState } from "react";
import { useRef } from "react";

type Column<T> = { key: keyof T; label: string };

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
};

export default function DataTable<T extends Record<string, any>>({ columns, data, pageSize = 8 }: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortOrders, setSortOrders] = useState<Array<{ key: keyof T; dir: "asc" | "desc" }>>([]);
  const tableRef = useRef<HTMLTableElement | null>(null);

  const filtered = useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => String(row[col.key] ?? "").toLowerCase().includes(q))
    );
  }, [data, query, columns]);

  const sorted = useMemo(() => {
    if (!sortOrders.length) return filtered;
    const arr = [...filtered];
    arr.sort((a, b) => {
      for (const s of sortOrders) {
        const av = a[s.key];
        const bv = b[s.key];
        if (av == null && bv == null) continue;
        if (av == null) return s.dir === "asc" ? -1 : 1;
        if (bv == null) return s.dir === "asc" ? 1 : -1;
        if (typeof av === "number" && typeof bv === "number") {
          if (av === bv) continue;
          return s.dir === "asc" ? av - bv : bv - av;
        }
        const cmp = String(av).localeCompare(String(bv));
        if (cmp === 0) continue;
        return s.dir === "asc" ? cmp : -cmp;
      }
      return 0;
    });
    return arr;
  }, [filtered, sortOrders]);

  const pages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageData = sorted.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <input
            placeholder="Buscar..."
            aria-label="Buscar en tabla"
            className="px-3 py-2 rounded-md border w-64"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />

          <button
            className="px-3 py-2 rounded-md bg-slate-100"
            onClick={() => {
              // export CSV
              const rows = [columns.map((c) => c.label)];
              const all = sorted.length ? sorted : filtered;
              all.forEach((r) => rows.push(columns.map((c) => String(r[c.key] ?? ""))));
              const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
              const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `export.csv`;
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Exportar CSV
          </button>
        </div>

        <div className="text-sm text-slate-500">{filtered.length} resultados</div>
      </div>

      <div className="overflow-x-auto">
        <table ref={tableRef} className="w-full text-sm" role="table" aria-label="Datos tabulares">
          <thead>
            <tr className="text-left text-slate-500 text-xs">
              {columns.map((c) => (
                <th key={String(c.key)} className="pb-2 pr-4">
                  <button
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
                    onClick={(e) => {
                      const key = c.key as keyof T;
                      const shift = (e as any).shiftKey;

                      setSortOrders((prev) => {
                        const existingIndex = prev.findIndex((p) => String(p.key) === String(key));
                        // if not holding shift, replace ordering with this column
                        if (!shift) {
                          if (existingIndex === -1) return [{ key, dir: "asc" }];
                          // toggle direction
                          const dir = prev[existingIndex].dir === "asc" ? "desc" : "asc";
                          return [{ key, dir }];
                        }

                        // shift-click: add or toggle preserving previous ones
                        const next = [...prev];
                        if (existingIndex === -1) next.push({ key, dir: "asc" });
                        else next[existingIndex].dir = next[existingIndex].dir === "asc" ? "desc" : "asc";
                        return next;
                      });
                    }}
                    aria-label={`Ordenar por ${c.label}`}
                  >
                    <span>{c.label}</span>
                    {(() => {
                      const idx = sortOrders.findIndex((p) => String(p.key) === String(c.key));
                      if (idx === -1) return null;
                      const dir = sortOrders[idx].dir;
                      return (
                        <span className="inline-flex items-center gap-1 ml-2">
                          <span className="bg-slate-200 text-slate-700 rounded-full w-5 h-5 flex items-center justify-center text-[10px]">{idx + 1}</span>
                          <span className="text-xs">{dir === "asc" ? "▲" : "▼"}</span>
                        </span>
                      );
                    })()}
                  </button>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {pageData.map((row, idx) => (
              <tr key={idx} className="border-t">
                {columns.map((c) => (
                  <td key={String(c.key)} className="py-3 pr-4">
                    {String(row[c.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div>
          <button
            className="px-3 py-1 rounded-md mr-2"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Anterior
          </button>

          <button
            className="px-3 py-1 rounded-md"
            disabled={page >= pages}
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
          >
            Siguiente
          </button>
        </div>

        <div className="text-sm text-slate-500">Página {page} / {pages}</div>
      </div>
    </div>
  );
}
