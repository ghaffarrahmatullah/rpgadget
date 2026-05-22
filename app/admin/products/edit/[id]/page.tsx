import { db } from "@/lib/db"
import { redirect } from "next/navigation"

export default async function EditProductPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await db.product.findUnique({
    where: { id: params.id },
  })

  if (!product) {
    redirect("/admin/products")
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-20">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-black mb-10">
          Edit Product
        </h1>

        <form
          action={async (formData) => {
            "use server"

            await db.product.update({
              where: { id: product.id },
              data: {
                name: formData.get("name") as string,
                price: Number(formData.get("price")),
                imageUrl: formData.get("imageUrl") as string,
                storage: formData.get("storage") as string,
                color: formData.get("color") as string,
                condition: formData.get("condition") as string,
                battery: Number(formData.get("battery")),
              },
            })

            // ✅ redirect setelah update berhasil
            redirect("/admin/products")
          }}
          className="space-y-6"
        >

          {/* NAME */}
          <input
            name="name"
            defaultValue={product.name ?? ""}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-white/30 transition"
            placeholder="Product Name"
          />

          {/* PRICE */}
          <input
            name="price"
            type="number"
            defaultValue={product.price ?? 0}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-white/30 transition"
            placeholder="Price"
          />

          {/* IMAGE */}
          <input
            name="imageUrl"
            defaultValue={product.imageUrl ?? ""}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-white/30 transition"
            placeholder="Image URL"
          />

          {/* STORAGE */}
          <input
            name="storage"
            defaultValue={product.storage ?? ""}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-white/30 transition"
            placeholder="Storage (e.g. 128GB)"
          />

          {/* COLOR */}
          <input
            name="color"
            defaultValue={product.color ?? ""}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-white/30 transition"
            placeholder="Color"
          />

          {/* CONDITION */}
          <input
            name="condition"
            defaultValue={product.condition ?? ""}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-white/30 transition"
            placeholder="Condition (New / Like New / Second)"
          />

          {/* BATTERY */}
          <input
            name="battery"
            type="number"
            defaultValue={product.battery ?? 100}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-white/30 transition"
            placeholder="Battery %"
          />

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">

            <button
              type="submit"
              className="bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition"
            >
              Save Changes
            </button>

            <a
              href="/admin/products"
              className="border border-white/10 px-8 py-4 rounded-full hover:bg-white/10 transition"
            >
              Cancel
            </a>

          </div>
        </form>
      </div>
    </main>
  )
}