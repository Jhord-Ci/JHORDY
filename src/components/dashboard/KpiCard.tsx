type KpiCardProps = {
  titulo: string;
  valor: string;
  change?: string; // e.g. +12%
  changeType?: "up" | "down";
};

export default function KpiCard({ titulo, valor, change, changeType = "up" }: KpiCardProps) {
  return (
    <div className="card p-5 rounded-2xl relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-500 text-sm">{titulo}</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">{valor}</h2>
        </div>

        <div className="text-right">
          {change && (
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                changeType === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {changeType === "up" ? "▲" : "▼"}
              <span className="ml-1">{change}</span>
            </span>
          )}
        </div>
      </div>

      <div className="mt-4">
        {/* Sparkline placeholder */}
        <svg width="100%" height="40" viewBox="0 0 100 40" preserveAspectRatio="none">
          <polyline
            points="0,30 20,24 40,18 60,12 80,14 100,8"
            fill="none"
            stroke="#c0262c"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        </svg>
      </div>
    </div>
  );
}