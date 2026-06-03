import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pageTitle = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return { title: `${pageTitle} - Support | SmartLock Store` };
}

export default async function SupportPage({ params }: { params: Promise<{ slug: string }> }) {
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
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p className="text-lg font-medium text-slate-800">
              SmartLock Customer Support: {pageTitle}
            </p>
            <p>
              We are currently in the process of migrating our support documentation. Please check back shortly for detailed information regarding {pageTitle.toLowerCase()}.
            </p>
            <div className="bg-blue-50 p-6 rounded-2xl mt-8 border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-2">Need immediate assistance?</h4>
              <p className="text-sm text-blue-800 mb-4">
                Our support team is available via WhatsApp or phone to help you with any issues regarding installation, warranties, or order tracking.
              </p>
              <a href="https://wa.me/212682192641" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex text-sm py-2 px-4 shadow-none">
                Contact Support via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
