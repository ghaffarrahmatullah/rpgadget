import Link from "next/link"

import { db } from "@/lib/db"

export default async function HomePage() {
  const products = await db.product.findMany({
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      
      {/* Background Blur */}
      <div className="fixed top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-500/10 blur-[180px] rounded-full pointer-events-none" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          
          <Link
            href="/"
            className="text-3xl font-black tracking-tight"
          >
            RpGadget
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <Link
              href="/"
              className="hover:text-white transition"
            >
              Home
            </Link>

            <Link
              href="/products"
              className="hover:text-white transition"
            >
              Products
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 py-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left */}
          <div>
            <p className="uppercase tracking-[0.4em] text-zinc-500 text-sm mb-6">
              Premium Apple Devices
            </p>

            <h1 className="text-6xl md:text-8xl font-black leading-none mb-8">
              Find Your
              <br />
              Dream iPhone
            </h1>

            <p className="text-zinc-400 text-xl leading-9 max-w-2xl mb-10">
              Trusted premium iPhone marketplace with elegant
              shopping experience, best pricing, and verified quality.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                href="/products"
                className="bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300 text-center"
              >
                Shop Now
              </Link>

              <Link
                href="/products"
                className="border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300 text-center"
              >
                Explore Products
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/10 blur-[100px] rounded-full" />

            <img
              src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop"
              alt="iPhone"
              className="relative z-10 w-full rounded-[40px] border border-white/10 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          
          {/* Heading */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="uppercase tracking-[0.3em] text-zinc-500 text-sm mb-4">
                Featured Collection
              </p>

              <h2 className="text-5xl font-black leading-tight">
                Latest iPhone
              </h2>
            </div>

            <Link
              href="/products"
              className="border border-white/10 bg-white/5 px-6 py-4 rounded-2xl hover:bg-white/10 transition-all duration-300 w-fit"
            >
              View All Products
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-3"
              >
                
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    loading="lazy"
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-7">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-zinc-300 border border-white/10">
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
                    {product.storage}
                  </p>

                  <p className="text-zinc-400 mb-8">
                    {product.color}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-black">
                      Rp {product.price.toLocaleString()}
                    </p>

                    <div className="bg-white text-black px-5 py-3 rounded-full font-semibold group-hover:scale-105 transition-all duration-300">
                      View
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-20">
            <p className="uppercase tracking-[0.3em] text-zinc-500 text-sm mb-4">
              Why RpGadget
            </p>

            <h2 className="text-5xl font-black mb-6">
              Trusted Premium Store
            </h2>

            <p className="text-zinc-400 text-lg max-w-3xl mx-auto leading-8">
              We provide high quality iPhones with trusted condition,
              transparent information, and premium shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-10 backdrop-blur-2xl">
              <div className="text-5xl mb-8">
                📱
              </div>

              <h3 className="text-3xl font-bold mb-5">
                Premium Quality
              </h3>

              <p className="text-zinc-400 leading-8">
                All devices are checked carefully and guaranteed premium quality.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[32px] p-10 backdrop-blur-2xl">
              <div className="text-5xl mb-8">
                ⚡
              </div>

              <h3 className="text-3xl font-bold mb-5">
                Fast Response
              </h3>

              <p className="text-zinc-400 leading-8">
                Quick customer support and professional consultation anytime.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[32px] p-10 backdrop-blur-2xl">
              <div className="text-5xl mb-8">
                🔒
              </div>

              <h3 className="text-3xl font-bold mb-5">
                Trusted Store
              </h3>

              <p className="text-zinc-400 leading-8">
                Secure transactions with transparent product information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div>
            <h2 className="text-2xl font-black mb-2">
              RpGadget
            </h2>

            <p className="text-zinc-500">
              Premium iPhone Marketplace
            </p>
          </div>

          <div className="flex items-center gap-6 text-zinc-400">
            <Link href="/">
              Home
            </Link>

            <Link href="/products">
              Products
            </Link>

            <Link href="/admin/products">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}