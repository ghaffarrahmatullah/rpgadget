import Link from "next/link"
import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import LogoutButton from "@/components/logout-button"

export default async function AdminProductsPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <main className="min-h-screen bg-black text-white">
      
      {/* Navbar */}
      <div className="border-b border-zinc-800 px-10 py-6">
        <div className="flex items-center justify-between">
          
          <div>
            <p className="text-zinc-400 text-sm mb-2">
              RpGadget Dashboard
            </p>

            <h1 className="text-4xl font-bold">
              Admin Products
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="border border-zinc-700 px-5 py-3 rounded-xl font-semibold hover:bg-zinc-900 transition"
            >
              Back to Website
            </Link>

            <Link
              href="/admin/products/create"
              className="bg-white text-black px-5 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              Add Product
            </Link>

            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-10">
        {products.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-16 text-center">
            <h2 className="text-3xl font-bold mb-4">
              No Products Found
            </h2>

            <p className="text-zinc-400 mb-8">
              Start adding your first iPhone product.
            </p>

            <Link
              href="/admin/products/create"
              className="bg-white text-black px-8 py-4 rounded-full font-semibold"
            >
              Add Product
            </Link>
          </div>
        ) : (
          <div className="grid gap-5">
            {products.map((product: typeof products[number]) => (
              <div
                key={product.id}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 hover:border-zinc-700 transition"
              >
                
                {/* Product Info */}
                <div className="flex items-center gap-5">
                  <img
                    loading="lazy"
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-28 h-28 rounded-2xl object-cover border border-zinc-800"
                  />

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-full">
                        {product.condition}
                      </span>

                      <span className="text-zinc-500 text-sm">
                        Battery {product.battery}%
                      </span>
                    </div>

                    <h2 className="text-3xl font-bold mb-2">
                      {product.name}
                    </h2>

                    <p className="text-zinc-400 mb-1">
                      Storage: {product.storage}
                    </p>

                    <p className="text-zinc-400 mb-3">
                      Color: {product.color}
                    </p>

                    <p className="text-2xl font-semibold">
                      Rp {product.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <Link
                    href={`/products/${product.id}`}
                    className="border border-zinc-700 px-5 py-3 rounded-xl hover:bg-zinc-800 transition"
                  >
                    View
                  </Link>

                  <Link
                    href={`/admin/products/edit/${product.id}`}
                    className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-xl transition font-semibold"
                  >
                    Edit
                  </Link>

                  <form
                    action={async () => {
                      "use server"

                      await db.product.delete({
                        where: {
                          id: product.id,
                        },
                      })
                    }}
                  >
                    <button
                      className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl transition font-semibold"
                    >
                      Delete
                    </button>
                  </form>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}