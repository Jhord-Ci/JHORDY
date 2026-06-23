"use client";

import { useState } from "react";

export default function DateFilter({ start, end, onChange }: { start?: string; end?: string; onChange: (s?: string, e?: string) => void }) {
  const [s, setS] = useState(start ?? '');
  const [e, setE] = useState(end ?? '');

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm text-slate-600">Desde</label>
      <input type="date" value={s} onChange={(ev) => setS(ev.target.value)} className="px-2 py-1 border rounded-md" />

      <label className="text-sm text-slate-600">Hasta</label>
      <input type="date" value={e} onChange={(ev) => setE(ev.target.value)} className="px-2 py-1 border rounded-md" />

      <button className="px-3 py-1 bg-slate-100 rounded-md" onClick={() => onChange(s || undefined, e || undefined)}>Aplicar</button>
      <button className="px-3 py-1 text-sm text-slate-500" onClick={() => { setS(''); setE(''); onChange(undefined, undefined); }}>Limpiar</button>
    </div>
  );
}
