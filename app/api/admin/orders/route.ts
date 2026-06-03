import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { OrderStatus } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") ?? "";
    const status = searchParams.get("status") ?? "";
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "50");
    const offset = (page - 1) * limit;

    let query = supabase
      .from("orders")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    // Status filter
    if (status && status !== "all") {
      query = query.eq("order_status", status);
    }

    // Search filter (name, phone, city)
    if (search) {
      query = query.or(
        `customer_name.ilike.%${search}%,phone.ilike.%${search}%,city.ilike.%${search}%`
      );
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch orders" },
        { status: 500 }
      );
    }

    // KPI aggregation
    const { data: kpiData } = await supabase.from("orders").select("order_status, total_price");

    const kpi = {
      total: kpiData?.length ?? 0,
      pending: kpiData?.filter((o) => o.order_status === "Pending").length ?? 0,
      confirmed: kpiData?.filter((o) => o.order_status === "Confirmed").length ?? 0,
      shipped: kpiData?.filter((o) => o.order_status === "Shipped").length ?? 0,
      delivered: kpiData?.filter((o) => o.order_status === "Delivered").length ?? 0,
      cancelled: kpiData?.filter((o) => o.order_status === "Cancelled").length ?? 0,
      revenue:
        kpiData
          ?.filter((o) => o.order_status === "Delivered")
          .reduce((sum, o) => sum + (o.total_price ?? 0), 0) ?? 0,
    };

    return NextResponse.json({
      success: true,
      orders: data,
      kpi,
      total: count,
      page,
      limit,
    });
  } catch (err) {
    console.error("Admin orders fetch error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, order_status } = body as { id: string; order_status: OrderStatus };

    if (!id || !order_status) {
      return NextResponse.json(
        { success: false, error: "Order ID and status are required" },
        { status: 400 }
      );
    }

    const validStatuses: OrderStatus[] = [
      "Pending",
      "Confirmed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatuses.includes(order_status)) {
      return NextResponse.json(
        { success: false, error: "Invalid order status" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("orders")
      .update({ order_status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to update order status" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, order: data });
  } catch (err) {
    console.error("Order update error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
