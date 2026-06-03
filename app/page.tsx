import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/components/home/HeroSection";
import TrustSection from "@/components/home/TrustSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import ProductShowcase from "@/components/home/ProductShowcase";
import HowItWorks from "@/components/home/HowItWorks";
import MobileAppSection from "@/components/home/MobileAppSection";
import AirbnbSection from "@/components/home/AirbnbSection";
import ComparisonSection from "@/components/home/ComparisonSection";
import FaqSection from "@/components/home/FaqSection";
import OrderForm from "@/components/home/OrderForm";
import { getProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getProducts();
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-500/20 selection:text-slate-900 font-sans antialiased overflow-x-hidden">
      {/* Dynamic background ambient highlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full blur-[180px] opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(47, 129, 247, 0.18) 0%, rgba(163, 113, 247, 0.08) 50%, transparent 100%)" }}
      />
      
      {/* Centered Content Stack */}
      <div className="w-full pt-6 pb-12 flex flex-col">
        <Navbar />
        
        <main className="flex flex-col w-full">
          <HeroSection />
          <TrustSection />
          <BenefitsSection />
          <ProductShowcase products={products} />
          <HowItWorks />
          <MobileAppSection />
          <AirbnbSection />
          <ComparisonSection />
          <FaqSection />
        </main>
      </div>

      <Footer />
    </div>
  );
}
