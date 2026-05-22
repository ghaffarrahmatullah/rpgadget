import { db } from "@/lib/db"
import { redirect } from "next/navigation"

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params

  const product = await db.product.findUnique({
    where: { id },
  })

  if (!product) {
    redirect("/admin/products")
  }

  async function updateProduct(formData: FormData) {
    "use server"

    await db.product.update({
      where: { id },
      data: {
        name: String(formData.get("name") || ""),
        price: Number(formData.get("price") || 0),
        imageUrl: String(formData.get("imageUrl") || ""),
        storage: String(formData.get("storage") || ""),
        color: String(formData.get("color") || ""),
        condition: String(formData.get("condition") || ""),
        battery: Number(formData.get("battery") || 0),
      },
    })

    redirect("/admin/products")
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-20">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-black mb-10">
          Edit Product
        </h1>

        <form action={updateProduct} className="space-y-4">

          <input name="name" defaultValue={product.name ?? ""} className="w-full p-3 bg-zinc-900 rounded" />
          <input name="price" type="number" defaultValue={product.price ?? 0} className="w-full p-3 bg-zinc-900 rounded" />
          <input name="imageUrl" defaultValue={product.imageUrl ?? ""} className="w-full p-3 bg-zinc-900 rounded" />
          <input name="storage" defaultValue={product.storage ?? ""} className="w-full p-3 bg-zinc-900 rounded" />
          <input name="color" defaultValue={product.color ?? ""} className="w-full p-3 bg-zinc-900 rounded" />
          <input name="condition" defaultValue={product.condition ?? ""} className="w-full p-3 bg-zinc-900 rounded" />
          <input name="battery" type="number" defaultValue={product.battery ?? 100} className="w-full p-3 bg-zinc-900 rounded" />

          <button
            type="submit"
            className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
          >
            Save Changes
          </button>

        </form>
      </div>
    </main>
  )
}