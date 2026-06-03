import { getProducts } from "@/lib/products";
import ProductShowcase from "@/components/home/ProductShowcase";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `${categoryName} - SmartLock Store`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = await getProducts();
  
  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase().replace(/\s+/g, '-') === slug
  );

  const categoryName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[var(--background)]">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline font-medium mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>
        <h1 className="text-4xl font-black text-slate-900 mb-2">{categoryName}</h1>
        <p className="text-slate-500">
          Showing {categoryProducts.length} product{categoryProducts.length === 1 ? '' : 's'} in this category.
        </p>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="-mt-8">
          <ProductShowcase products={categoryProducts} />
        </div>
      ) : (
        <div className="w-full max-w-[1200px] mx-auto px-4 text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm mt-8">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-slate-500 mb-6 font-medium">We're currently restocking products in this category.</p>
          <Link href="/" className="btn-primary inline-flex">Browse All Products</Link>
        </div>
      )}
    </div>
  );
}
