import { supabase } from "./supabase";
import { type Product } from "@/types";

export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase.from('products').select('*').order('name');
    if (error) {
      console.error("Supabase error fetching products:", error);
      return [];
    }
    
    // Map lowercase Postgres columns back to camelCase frontend interface
    return data.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.category,
      originalPrice: p.originalprice,
      discountedPrice: p.discountedprice,
      savingsPercent: p.savingspercent,
      description: p.description,
      features: p.features,
      rating: p.rating,
      reviewCount: p.reviewcount,
      badge: p.badge,
      popular: p.popular,
      imageUrl: p.imageurl,
      images: p.images
    }));
  } catch (err) {
    console.error("Error fetching products", err);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function getProductNames(): Promise<string[]> {
  const products = await getProducts();
  return products.map((p) => p.name);
}
