import { api } from "./api";
import { mapReservation, type BackendReservation } from "./reservationService";
import type { Reservation } from "../types";

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  handler: (response: RazorpaySuccessResponse) => void;
  modal?: { ondismiss?: () => void };
}

export interface RazorpaySuccessResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

const CHECKOUT_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

export function loadRazorpayCheckoutScript(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${CHECKOUT_SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load Razorpay checkout script")));
      return;
    }
    const script = document.createElement("script");
    script.src = CHECKOUT_SCRIPT_SRC;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay checkout script"));
    document.body.appendChild(script);
  });
}

export interface CreateOrderPayload {
  restaurantId: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
}

export interface PaymentOrder {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

export async function createPaymentOrder(payload: CreateOrderPayload): Promise<PaymentOrder> {
  const { data } = await api.post<PaymentOrder>("/payments/order", {
    restaurant: payload.restaurantId,
    date: payload.date,
    time: payload.time,
    guests: payload.guests,
    specialRequest: payload.specialRequest,
  });
  return data;
}

export function openCheckout(options: {
  order: PaymentOrder;
  name: string;
  description: string;
  prefill?: { name?: string; email?: string; contact?: string };
  onSuccess: (response: RazorpaySuccessResponse) => void;
  onDismiss: () => void;
}) {
  if (!window.Razorpay) {
    throw new Error("Razorpay checkout script is not loaded");
  }
  const razorpay = new window.Razorpay({
    key: options.order.keyId,
    amount: options.order.amount,
    currency: options.order.currency,
    order_id: options.order.orderId,
    name: options.name,
    description: options.description,
    prefill: options.prefill,
    theme: { color: "#F97316" },
    handler: options.onSuccess,
    modal: { ondismiss: options.onDismiss },
  });
  razorpay.open();
}

export async function verifyPayment(response: RazorpaySuccessResponse, userName: string): Promise<Reservation> {
  const { data } = await api.post<BackendReservation>("/payments/verify", response);
  return mapReservation(data, userName);
}
