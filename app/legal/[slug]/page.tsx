import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pageTitle = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return { title: `${pageTitle} - SmartLock Store` };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pageTitle = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[var(--background)]">
      <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline font-medium mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">{pageTitle}</h1>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4 text-sm">
            <p className="font-medium">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <p>
              This {pageTitle} is a placeholder for SmartLock Store (Agadir, Morocco). 
            </p>
            
            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">1. General Information</h3>
            <p>
              By accessing and placing an order with SmartLock Store, you confirm that you are in agreement with and bound by the terms and conditions outlined in our policies.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">2. Data & Privacy</h3>
            <p>
              We collect information to provide better services to our users. We only request personal information when we truly need it to provide a service to you, such as processing Cash on Delivery orders.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">3. Product Warranties & Delivery</h3>
            <p>
              All products listed on the SmartLock store are subject to availability. Deliveries are typically completed within 24-48 hours within Morocco. Standard manufacturer warranties apply.
            </p>

            <div className="mt-12 p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-500">
              <p>
                <strong>Notice:</strong> Please replace this placeholder text with your actual {pageTitle.toLowerCase()} document to ensure full legal compliance in your jurisdiction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
