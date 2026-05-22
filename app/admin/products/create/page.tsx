import { db } from "@/lib/db"
import { redirect } from "next/navigation"

export default function CreateProductPage() {
  async function createProduct(formData: FormData) {
    "use server"

    await db.product.create({
      data: {
        name: formData.get("name") as string,
        price: Number(formData.get("price")),
        storage: formData.get("storage") as string,
        color: formData.get("color") as string,
        battery: Number(formData.get("battery")),
        condition: formData.get("condition") as string,
        description: formData.get("description") as string,
        imageUrl: formData.get("imageUrl") as string,
      },
    })

    redirect("/admin/products")
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-10">
        Add Product
      </h1>

      <form
        action={createProduct}
        className="max-w-2xl space-y-5"
      >
        <input
          name="name"
          placeholder="Product Name"
          className="w-full p-4 rounded-xl bg-zinc-900"
        />

        <input
          name="price"
          placeholder="Price"
          type="number"
          className="w-full p-4 rounded-xl bg-zinc-900"
        />

        <input
          name="storage"
          placeholder="Storage"
          className="w-full p-4 rounded-xl bg-zinc-900"
        />

        <input
          name="color"
          placeholder="Color"
          className="w-full p-4 rounded-xl bg-zinc-900"
        />

        <input
          name="battery"
          placeholder="Battery Health"
          type="number"
          className="w-full p-4 rounded-xl bg-zinc-900"
        />

        <input
          name="condition"
          placeholder="Condition"
          className="w-full p-4 rounded-xl bg-zinc-900"
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-4 rounded-xl bg-zinc-900"
        />

        <input
          name="imageUrl"
          placeholder="Image URL"
          className="w-full p-4 rounded-xl bg-zinc-900"
        />

        <button
          className="bg-white text-black px-8 py-4 rounded-xl font-bold"
        >
          Create Product
        </button>
      </form>
    </main>
  )
}