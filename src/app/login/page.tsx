"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Ingresa usuario y contraseña para continuar.");
      return;
    }

    setError(null);
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-6 w-full">
          <div className="w-full max-w-xs">
            <Image
              src="/logo-fadeco.png"
              alt="FADECO"
              width={500}
              height={210}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-red-600">
          FADECO ERP
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Accede al panel administrativo.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="correo@empresa.com"
              className="w-full border border-slate-200 rounded-lg p-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              className="w-full border border-slate-200 rounded-lg p-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </main>
  );
}
