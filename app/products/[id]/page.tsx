import { db } from "@/lib/db"
import Link from "next/link"
import { notFound } from "next/navigation"

interface ProductDetailProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProductDetailPage({
  params,
}: ProductDetailProps) {
  const { id } = await params

  const product = await db.product.findUnique({
    where: { id },
  })

  if (!product) {
    return notFound()
  }

  const relatedProducts = await db.product.findMany({
    where: {
      NOT: {
        id: product.id,
      },
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  })

  // ✅ FIX: WhatsApp message (ini yang sebelumnya error)
  const whatsappMessage = `Halo, saya tertarik dengan produk:
Nama: ${product.name}
Harga: Rp ${product.price.toLocaleString()}
Storage: ${product.storage}
Warna: ${product.color}
Kondisi: ${product.condition}

Apakah masih tersedia?`

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      
      {/* Background Glow */}
      <div className="fixed top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-500/10 blur-[180px] rounded-full pointer-events-none" />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          
          <Link href="/" className="text-3xl font-black tracking-tight">
            RpGadget
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>

            <Link href="/products" className="hover:text-white transition">
              Products
            </Link>

            <Link href="/admin/products" className="hover:text-white transition">
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* PRODUCT HERO */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* IMAGE */}
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/10 blur-[120px] rounded-full" />

            <img
              src={product.imageUrl}
              alt={product.name}
              className="relative z-10 w-full rounded-[40px] border border-white/10 shadow-2xl"
            />
          </div>

          {/* INFO */}
          <div>
            <span className="inline-block bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm text-zinc-300 mb-6">
              {product.condition}
            </span>

            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              {product.name}
            </h1>

            <p className="text-zinc-400 text-lg leading-8 mb-8">
              Premium gadget dengan kualitas terbaik dan kondisi terverifikasi.
              Cocok untuk penggunaan harian dengan performa stabil dan desain elegan.
            </p>

            {/* SPEC BOX */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-zinc-500 text-sm">Storage</p>
                <p className="text-xl font-bold">{product.storage}</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-zinc-500 text-sm">Color</p>
                <p className="text-xl font-bold">{product.color}</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-zinc-500 text-sm">Battery</p>
                <p className="text-xl font-bold">{product.battery}%</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-zinc-500 text-sm">Condition</p>
                <p className="text-xl font-bold">{product.condition}</p>
              </div>
            </div>

            {/* PRICE */}
            <div className="mb-10">
              <p className="text-zinc-500 text-sm mb-2">Price</p>
              <p className="text-4xl font-black">
                Rp {product.price.toLocaleString()}
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">

              {/* WHATSAPP */}
              <Link
                href={`https://wa.me/6282121267416?text=${encodeURIComponent(
                  whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/10 bg-white/5 px-8 py-4 rounded-full font-bold text-white hover:bg-white/10 hover:scale-105 transition"
              >
                Chat WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          
          <h2 className="text-3xl font-bold mb-10">
            Related Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {relatedProducts.map((item: typeof relatedProducts[number]) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className="group bg-white/5 border border-white/10 rounded-[28px] overflow-hidden backdrop-blur-2xl hover:border-white/30 transition hover:-translate-y-2"
              >
                
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {item.name}
                  </h3>

                  <p className="text-zinc-400 mb-4">
                    {item.storage} • {item.color}
                  </p>

                  <p className="text-2xl font-black">
                    Rp {item.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>
    </main>
  )
}