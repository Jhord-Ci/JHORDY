"use client";
import BuscadorProducto from "@/components/BuscadorProducto";
import { useEffect, useState } from "react";

interface Almacen {
  id: number;
  nombre: string;
}

export default function NuevaCompraPage() {
   const [almacenes, setAlmacenes] =
  useState<Almacen[]>([]);

const [
  productoSeleccionado,
  setProductoSeleccionado,
] = useState("");
const [cantidad, setCantidad] =
  useState(0);

const [
  precioUnitario,
  setPrecioUnitario,
] = useState(0);

const subtotal =
  cantidad * precioUnitario;
  async function cargarAlmacenes() {
  try {
    const response = await fetch(
      "/api/compras/almacenes"
    );

    const data = await response.json();

    setAlmacenes(data);
  } catch (error) {
    console.error(error);
  }
}useEffect(() => {
  cargarAlmacenes();
}, []);
  return (
    <main className="p-8 bg-slate-100 min-h-screen">

      <div className="bg-white rounded-2xl shadow-sm p-8">

        <h1 className="text-3xl font-bold text-slate-800">
          Nueva Compra
        </h1>

        <p className="text-slate-600 mt-2">
          Registro de compras.
        </p>

        <div className="grid grid-cols-3 gap-6 mt-8">

          <div className="border rounded-lg p-3 bg-slate-100">
            Código Compra: Automático
          </div>

          <input
            type="date"
            className="border rounded-lg p-3"
          />

          <input
            type="time"
            className="border rounded-lg p-3"
          />

        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">

          <select className="border rounded-lg p-3">
            <option>
              Seleccione Tipo Documento
            </option>

            <option>
              Boleta
            </option>

            <option>
              Factura
            </option>

            <option>
              Nota de Venta
            </option>

            <option>
              Guía
            </option>
          </select>

          <input
            placeholder="Número Documento"
            className="border rounded-lg p-3"
          />

        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">
            Datos del Proveedor
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-4">

          <input
            placeholder="RUC"
            className="border rounded-lg p-3"
          />

          <input
            placeholder="Razón Social"
            className="border rounded-lg p-3"
          />

          <input
            placeholder="Teléfono"
            className="border rounded-lg p-3"
          />

          <input
            placeholder="Correo"
            className="border rounded-lg p-3"
          />

        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">
            Destino de la Compra
          </h2>
        </div>

      <select className="border rounded-lg p-3 mt-4 w-full">

  <option value="">
    Seleccione Almacén
  </option>

  {almacenes.map((almacen) => (
    <option
      key={almacen.id}
      value={almacen.id}
    >
      {almacen.nombre}
    </option>
  ))}

</select>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">
            Documento Adjunto
          </h2>
        </div>

        <input
          type="file"
          className="border rounded-lg p-3 mt-4 w-full"
        />

        <div className="mt-10">
          <h2 className="text-xl font-semibold">
            Detalle de Productos
          </h2>
        </div>

        <div className="bg-slate-50 rounded-xl border p-6 mt-4">

  <div className="mb-6">
  <BuscadorProducto
  onSelect={(producto) => {
    setProductoSeleccionado(
      producto.nombre
    );
  }}
/>
  </div>

  <div className="bg-white rounded-xl border p-6">

    <div className="grid grid-cols-4 gap-4">

      <div>
        <label className="block mb-2 font-medium">
          Producto
        </label>

       <input
  value={
    productoSeleccionado ||
    "Seleccione un producto"
  }
  readOnly
  className="border rounded-lg p-3 w-full bg-slate-100"
/>
      </div>

      <div>
       <label className="block mb-2 font-medium">
  Cantidad
</label>

<input
  type="number"
  value={cantidad}
  onChange={(e) =>
    setCantidad(
      Number(e.target.value)
    )
  }
  className="border rounded-lg p-3 w-full"
/>
      </div>

      <div>
        <label className="block mb-2 font-medium">
  Precio Unitario
</label>

<input
  type="number"
  value={precioUnitario}
  onChange={(e) =>
    setPrecioUnitario(
      Number(e.target.value)
    )
  }
  className="border rounded-lg p-3 w-full"
/>
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Subtotal
        </label>

        <div className="border rounded-lg p-3 bg-slate-100">
  S/ {subtotal.toFixed(2)}
</div>
      </div>

    </div>

  </div>

</div>

        <div className="bg-white border rounded-xl p-6 mt-8">

          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <strong>S/ 0.00</strong>
          </div>

          <div className="flex justify-between mb-2">
            <span>IGV:</span>
            <strong>S/ 0.00</strong>
          </div>

          <div className="flex justify-between text-xl">
            <span>Total:</span>
            <strong>S/ 0.00</strong>
          </div>

        </div>

        <div className="mt-8 flex gap-4">

          <button
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl"
          >
            Guardar Compra
          </button>

          <button
            className="bg-slate-500 hover:bg-slate-600 text-white px-8 py-3 rounded-xl"
          >
            Cancelar
          </button>

        </div>

      </div>

    </main>
  );
}