import { prisma } from "@/lib/prisma";

export default async function StockAlmacenPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const almacen = await prisma.almacen.findUnique({
    where: {
      id: Number(id),
    },

    include: {
      stocks: {
        include: {
          producto: true,
        },
      },
    },
  });

  if (!almacen) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">
          Almacén no encontrado
        </h1>
      </main>
    );
  }

  return (
    <main className="p-8 bg-slate-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-slate-800">
          {almacen.nombre}
        </h1>

        <div className="mt-4 space-y-2">
          <p>
            <strong>Código Sistema:</strong>{" "}
            {almacen.codigoSistema}
          </p>

          <p>
            <strong>Ubicación:</strong>{" "}
            {almacen.ubicacion}
          </p>

          <p>
            <strong>Responsable:</strong>{" "}
            {almacen.responsable}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm mt-8">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">
            Productos del Almacén
          </h2>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b">
              <th className="text-left p-4">
                Código
              </th>

              <th className="text-left p-4">
                Producto
              </th>

              <th className="text-left p-4">
                Stock
              </th>
            </tr>
          </thead>

          <tbody>
            {almacen.stocks.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="p-8 text-center text-slate-500"
                >
                  No existen productos asignados
                  a este almacén.
                </td>
              </tr>
            ) : (
              almacen.stocks.map((stock) => (
                <tr
                  key={stock.id}
                  className="border-b"
                >
                  <td className="p-4 font-mono">
                    {stock.producto.codigoSistema}
                  </td>

                  <td className="p-4">
                    {stock.producto.nombre}
                  </td>

                  <td className="p-4">
                    {Number(stock.stockActual)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}