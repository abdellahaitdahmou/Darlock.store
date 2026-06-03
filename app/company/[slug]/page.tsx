import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pageTitle = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return { title: `${pageTitle} - SmartLock Store` };
}

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
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
              Welcome to the {pageTitle} page for SmartLock.
            </p>
            <p>
              This section is currently being updated. Please check back later for our complete {pageTitle.toLowerCase()} documentation and resources.
            </p>
            <div className="h-px bg-slate-100 my-8"></div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Our Commitment</h3>
            <p>
              SmartLock is dedicated to revolutionizing home security across Morocco. We provide top-tier biometric, WiFi, and smart door locks designed to keep your family and property safe.
            </p>
            <p>
              If you have an immediate inquiry regarding our {pageTitle.toLowerCase()}, please feel free to reach out to our team directly.
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl mt-8 border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-1">Contact Us</h4>
              <p className="text-sm">Phone/WhatsApp: <a href="tel:+212682192641" className="text-blue-600 font-medium">+212 682 19 26 41</a></p>
              <p className="text-sm">Location: Agadir, Morocco</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
