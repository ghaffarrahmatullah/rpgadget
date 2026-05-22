import Link from "next/link"
import { db } from "@/lib/db"

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string
    storage?: string
    condition?: string
  }>
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams

  const search = params.search || ""
  const storage = params.storage || ""
  const condition = params.condition || ""

  const products = await db.product.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              storage: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              color: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
        storage
          ? {
              storage: {
                contains: storage,
                mode: "insensitive",
              },
            }
          : {},
        condition
          ? {
              condition: {
                contains: condition,
                mode: "insensitive",
              },
            }
          : {},
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      
      {/* Glow Background */}
      <div className="fixed top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-blue-500/10 blur-[180px] rounded-full pointer-events-none" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          
          <Link href="/" className="text-3xl font-black tracking-tight">
            RpGadget
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>

            <Link href="/products" className="text-white">
              Products
            </Link>


          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-28 text-center">
        <p className="uppercase tracking-[0.4em] text-zinc-500 text-sm mb-6">
          Premium Collection
        </p>

        <h1 className="text-6xl md:text-8xl font-black leading-tight mb-8">
          All iPhones
        </h1>

        <p className="text-zinc-400 text-xl max-w-3xl mx-auto leading-9">
          Explore premium Apple devices with verified quality,
          elegant design, and best pricing.
        </p>
      </section>

      {/* FILTER SECTION */}
      <section className="px-6 mb-16">
        <form className="max-w-7xl mx-auto grid md:grid-cols-4 gap-4">
          
          {/* SEARCH */}
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search iPhone..."
            className="w-full bg-zinc-900 text-white placeholder:text-zinc-500 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition"
          />

          {/* STORAGE */}
          <select
            name="storage"
            defaultValue={storage}
            className="w-full bg-zinc-900 text-white border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition"
          >
            <option value="" className="bg-zinc-900 text-white">
              All Storage
            </option>
            <option value="64GB" className="bg-zinc-900 text-white">
              64GB
            </option>
            <option value="128GB" className="bg-zinc-900 text-white">
              128GB
            </option>
            <option value="256GB" className="bg-zinc-900 text-white">
              256GB
            </option>
            <option value="512GB" className="bg-zinc-900 text-white">
              512GB
            </option>
            <option value="1TB" className="bg-zinc-900 text-white">
              1TB
            </option>
          </select>

          {/* CONDITION */}
          <select
            name="condition"
            defaultValue={condition}
            className="w-full bg-zinc-900 text-white border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition"
          >
            <option value="" className="bg-zinc-900 text-white">
              All Condition
            </option>
            <option value="New" className="bg-zinc-900 text-white">
              New
            </option>
            <option value="Like New" className="bg-zinc-900 text-white">
              Like New
            </option>
            <option value="Second" className="bg-zinc-900 text-white">
              Second
            </option>
          </select>

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-white text-black rounded-2xl font-bold hover:scale-[1.02] transition py-5"
          >
            Apply Filter
          </button>
        </form>
      </section>

      {/* RESULT HEADER */}
      <section className="px-6 mb-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <h2 className="text-2xl md:text-3xl font-bold">
            {products.length} Products Found
          </h2>

          <Link
            href="/products"
            className="text-zinc-400 hover:text-white transition"
          >
            Reset
          </Link>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {products.map((product: typeof products[number]) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white/5 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-2xl hover:border-white/30 transition-all duration-500 hover:-translate-y-2"
            >
              
              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-700"
                />
              </div>

              {/* CONTENT */}
              <div className="p-7">
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs bg-white/10 px-3 py-1 rounded-full border border-white/10 text-zinc-300">
                    {product.condition}
                  </span>

                  <span className="text-xs text-zinc-500">
                    Battery {product.battery}%
                  </span>
                </div>

                <h2 className="text-3xl font-bold mb-2">
                  {product.name}
                </h2>

                <p className="text-zinc-400 mb-1">
                  {product.storage}
                </p>

                <p className="text-zinc-400 mb-6">
                  {product.color}
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-3xl font-black">
                    Rp {product.price.toLocaleString()}
                  </p>

                  <div className="bg-white text-black px-5 py-3 rounded-full font-semibold group-hover:scale-105 transition">
                    View
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}