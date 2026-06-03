import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import OrderForm from "@/components/home/OrderForm";
import ProductGallery from "@/components/product/ProductGallery";
import { CheckCircle2, ShieldCheck, BatteryCharging, Wrench, Smartphone } from "lucide-react";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductBySlug(id);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} - SmartLock Store`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductBySlug(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-500/20 selection:text-slate-900 font-sans antialiased overflow-x-hidden flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex flex-col w-full pt-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": product.name,
              "image": [
                product.imageUrl,
                ...(product.images || [])
              ],
              "description": product.description,
              "sku": product.id,
              "brand": {
                "@type": "Brand",
                "name": "SmartLock"
              },
              "offers": {
                "@type": "Offer",
                "url": `https://smartlock.ma/product/${product.slug}`,
                "priceCurrency": "MAD",
                "price": product.discountedPrice.toString(),
                "availability": "https://schema.org/InStock"
              }
            })
          }}
        />
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Breadcrumb */}
          <div className="text-xs font-bold text-slate-500 mb-8 uppercase tracking-widest flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span>{product.category}</span>
            <span>/</span>
            <span className="text-slate-900">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Image Gallery */}
            <ProductGallery 
              name={product.name} 
              primaryImage={product.imageUrl} 
              images={product.images} 
            />

            {/* Right Column: Product Info */}
            <div className="flex flex-col space-y-8">
              
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit block shadow-sm border border-blue-100">
                  {product.category}
                </span>
                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-blue-600">{product.discountedPrice.toFixed(2)} MAD</span>
                    <span className="text-sm font-bold text-slate-400 line-through">{product.originalPrice.toFixed(2)} MAD</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    Save {product.savingsPercent}%
                  </span>
                </div>
              </div>

              <p className="text-slate-600 text-base leading-relaxed font-medium">
                {product.description}
              </p>

              <div className="space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-600 font-medium bg-white border border-slate-200 rounded-xl p-3 shadow-sm hover:border-slate-300 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                  <span>2 Year Warranty</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <Wrench className="w-4 h-4 text-slate-400" />
                  <span>Easy DIY Install</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <BatteryCharging className="w-4 h-4 text-emerald-500" />
                  <span>Long Battery</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* The Checkout Section with specific product mapped to OrderForm */}
        <div className="bg-slate-50 border-t border-slate-200">
          <OrderForm 
            productName={product.name} 
            productImage={product.imageUrl} 
            price={product.discountedPrice} 
          />
        </div>

      </main>
      
      <Footer />
    </div>
  );
}
