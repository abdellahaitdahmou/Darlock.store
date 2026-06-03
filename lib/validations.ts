import { z } from "zod";

export const orderSchema = z.object({
  customer_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  phone: z
    .string()
    .min(8, "Phone number must be at least 8 digits")
    .max(20, "Phone number is too long")
    .regex(
      /^[+\d\s\-()]{8,20}$/,
      "Please enter a valid phone number"
    ),

  city: z
    .string()
    .max(100, "City name is too long")
    .optional(),

  address: z
    .string()
    .min(10, "Please enter your full address (at least 10 characters)")
    .max(500, "Address is too long"),

  product_name: z.string().min(1, "Please select a product"),

  quantity: z
    .number()
    .int("Quantity must be a whole number")
    .min(1, "Minimum quantity is 1")
    .max(10, "Maximum quantity is 10"),

  notes: z.string().max(500, "Notes are too long").optional(),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
