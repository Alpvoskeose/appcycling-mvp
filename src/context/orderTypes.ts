export type DeliveryMethod = "courier" | "pickup";

export type PaymentMethod = "card" | "cash_on_delivery";

/** Черновик заказа для MVP (контекст + отправка лида в Telegram) */
export type OrderDraft = {
  serviceId: string | null;
  serviceTitle: string | null;
  priceLabel: string | null;
  priceAmountKzt: number | null;
  constructorSummary: string | null;

  deliveryMethod: DeliveryMethod | null;
  addressLine: string | null;
  apartmentDetails: string | null;
  deliveryDate: string | null;
  deliveryTimeSlot: string | null;

  paymentMethod: PaymentMethod | null;
};

export const initialOrderDraft: OrderDraft = {
  serviceId: null,
  serviceTitle: null,
  priceLabel: null,
  priceAmountKzt: null,
  constructorSummary: null,

  deliveryMethod: null,
  addressLine: null,
  apartmentDetails: null,
  deliveryDate: null,
  deliveryTimeSlot: null,

  paymentMethod: null,
};
