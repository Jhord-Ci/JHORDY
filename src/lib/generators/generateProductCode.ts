import { prisma } from "@/lib/prisma";

export async function generateProductCode() {
  const lastProduct = await prisma.producto.findFirst({
    orderBy: {
      id: "desc",
    },
  });

  const nextNumber = (lastProduct?.id ?? 0) + 1;

  return `PRO-${String(nextNumber).padStart(6, "0")}`;
}