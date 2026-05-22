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

  if (!product) return redirect("/admin/products")

  async function updateProduct(formData: FormData) {
    "use server"

    await db.product.update({
      where: { id },
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

    redirect("/admin/products")
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-20">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-black mb-10">
          Edit Product
        </h1>

        <form action={updateProduct} className="space-y-6">

          <input name="name" defaultValue={product.name ?? ""} />
          <input name="price" defaultValue={product.price ?? 0} />
          <input name="imageUrl" defaultValue={product.imageUrl ?? ""} />
          <input name="storage" defaultValue={product.storage ?? ""} />
          <input name="color" defaultValue={product.color ?? ""} />
          <input name="condition" defaultValue={product.condition ?? ""} />
          <input name="battery" defaultValue={product.battery ?? 100} />

          <button
            type="submit"
            className="bg-white text-black px-8 py-4 rounded-full"
          >
            Save Changes
          </button>

        </form>
      </div>
    </main>
  )
}