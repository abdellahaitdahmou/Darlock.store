import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { orderSchema } from "@/lib/validations";
import { getProducts } from "@/lib/products";
import type { Order } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validation = orderSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Calculate total price
    const products = await getProducts();
    const product = products.find((p) => p.name === data.product_name);
    const unitPrice = product?.discountedPrice ?? 0;
    const total_price = unitPrice * data.quantity;

    const orderPayload: Omit<Order, "id" | "created_at"> = {
      customer_name: data.customer_name,
      phone: data.phone,
      city: data.city,
      address: data.address,
      product_name: data.product_name,
      quantity: data.quantity,
      total_price,
      order_status: "Pending",
      notes: data.notes ?? "",
    };

    const { data: insertedOrder, error } = await supabase
      .from("orders")
      .insert([orderPayload])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to save order. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully!",
        order: insertedOrder,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Order submission error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
