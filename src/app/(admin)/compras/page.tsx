import Link from "next/link";

export default function ComprasPage() {
  return (
    <main className="p-8 bg-slate-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Compras
        </h1>

        <p className="text-slate-600 mt-2">
          Gestión de compras y recepción de productos.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-8">

        <Link href="/compras/nueva">
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg cursor-pointer transition">
            <h2 className="font-semibold text-lg">
              Nueva Compra
            </h2>

            <p className="text-slate-500 mt-2">
              Registrar una compra.
            </p>
          </div>
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-lg">
            Historial
          </h2>

          <p className="text-slate-500 mt-2">
            Consultar compras.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-lg">
            Recepciones
          </h2>

          <p className="text-slate-500 mt-2">
            Pendientes de ingreso.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-lg">
            Movimientos
          </h2>

          <p className="text-slate-500 mt-2">
            Entradas de almacén.
          </p>
        </div>

      </div>
    </main>
  );
}