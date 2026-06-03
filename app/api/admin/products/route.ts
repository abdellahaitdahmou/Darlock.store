import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getProducts } from "@/lib/products";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json({ success: true, products });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, product } = body;

    if (action === "update") {
      // Map back to postgres lowercase
      const mappedProduct = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        category: product.category,
        originalprice: product.originalPrice,
        discountedprice: product.discountedPrice,
        savingspercent: product.savingsPercent,
        description: product.description,
        features: product.features,
        rating: product.rating,
        reviewcount: product.reviewCount,
        badge: product.badge,
        popular: product.popular,
        imageurl: product.imageUrl,
        images: product.images
      };

      const { error } = await supabase.from('products').update(mappedProduct).eq('id', product.id);
      if (error) throw error;
    } 
    // Handle create/delete similarly if needed in future

    const products = await getProducts();
    return NextResponse.json({ success: true, products });
  } catch (err) {
    console.error("Failed to update product:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
