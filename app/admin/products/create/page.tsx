import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function CreateProductPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  async function createProduct(formData: FormData) {
    "use server"

    try {
      await db.product.create({
        data: {
          name: String(formData.get("name") || ""),
          price: Number(formData.get("price") || 0),
          storage: String(formData.get("storage") || ""),
          color: String(formData.get("color") || ""),
          battery: Number(formData.get("battery") || 0),
          condition: String(formData.get("condition") || ""),
          description: String(formData.get("description") || ""),
          imageUrl: String(formData.get("imageUrl") || ""),
        },
      })
    } catch (err) {
      console.error("Create product error:", err)
      throw new Error("Failed to create product")
    }

    redirect("/admin/products")
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-8">Create Product</h1>

      <form action={createProduct} className="grid gap-4 max-w-xl">
        <input name="name" placeholder="Name" className="p-3 bg-zinc-900 rounded" />

        <input name="price" type="number" placeholder="Price" className="p-3 bg-zinc-900 rounded" />

        <input name="storage" placeholder="Storage" className="p-3 bg-zinc-900 rounded" />

        <input name="color" placeholder="Color" className="p-3 bg-zinc-900 rounded" />

        <input name="battery" type="number" placeholder="Battery %" className="p-3 bg-zinc-900 rounded" />

        <input name="condition" placeholder="Condition" className="p-3 bg-zinc-900 rounded" />

        <textarea name="description" placeholder="Description" className="p-3 bg-zinc-900 rounded" />

        <input name="imageUrl" placeholder="Image URL" className="p-3 bg-zinc-900 rounded" />

        <button className="bg-white text-black p-3 rounded font-semibold">
          Create Product
        </button>
      </form>
    </main>
  )
}