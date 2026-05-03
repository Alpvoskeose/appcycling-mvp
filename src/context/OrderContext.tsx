import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  initialOrderDraft,
  type DeliveryMethod,
  type OrderDraft,
  type PaymentMethod,
} from "./orderTypes";

const ORDER_STORAGE_KEY = "app_order_draft";

type LineItemPayload = {
  serviceId?: string | null;
  serviceTitle: string;
  priceLabel: string;
  priceAmountKzt: number;
  constructorSummary?: string | null;
};

type DeliveryPayload = {
  deliveryMethod: DeliveryMethod;
  addressLine: string | null;
  apartmentDetails: string | null;
  deliveryDate: string | null;
  deliveryTimeSlot: string | null;
};

type OrderContextValue = {
  order: OrderDraft;
  setLineItem: (payload: LineItemPayload) => void;
  setConstructorSummary: (summary: string | null) => void;
  setDelivery: (payload: DeliveryPayload) => void;
  setPaymentMethod: (method: PaymentMethod | null) => void;
  patchOrder: (patch: Partial<OrderDraft>) => void;
  resetOrder: () => void;
};

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<OrderDraft>(initialOrderDraft);

  // Загрузка заказа из localStorage при монтировании
  useEffect(() => {
    try {
      const stored = localStorage.getItem(ORDER_STORAGE_KEY);
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Ошибка при загрузке заказа из localStorage:", error);
    }
  }, []);

  // Сохранение заказа в localStorage при изменении
  useEffect(() => {
    try {
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
    } catch (error) {
      console.error("Ошибка при сохранении заказа в localStorage:", error);
    }
  }, [order]);

  const setLineItem = useCallback((payload: LineItemPayload) => {
    setOrder((prev) => ({
      ...prev,
      serviceId: payload.serviceId ?? prev.serviceId,
      serviceTitle: payload.serviceTitle,
      priceLabel: payload.priceLabel,
      priceAmountKzt: payload.priceAmountKzt,
      constructorSummary:
        payload.constructorSummary !== undefined
          ? payload.constructorSummary
          : prev.constructorSummary,
    }));
  }, []);

  const setConstructorSummary = useCallback((summary: string | null) => {
    setOrder((prev) => ({ ...prev, constructorSummary: summary }));
  }, []);

  const setDelivery = useCallback((payload: DeliveryPayload) => {
    setOrder((prev) => ({
      ...prev,
      deliveryMethod: payload.deliveryMethod,
      addressLine: payload.addressLine,
      apartmentDetails: payload.apartmentDetails,
      deliveryDate: payload.deliveryDate,
      deliveryTimeSlot: payload.deliveryTimeSlot,
    }));
  }, []);

  const setPaymentMethod = useCallback((method: PaymentMethod | null) => {
    setOrder((prev) => ({ ...prev, paymentMethod: method }));
  }, []);

  const patchOrder = useCallback((patch: Partial<OrderDraft>) => {
    setOrder((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetOrder = useCallback(() => {
    setOrder(initialOrderDraft);
    try {
      localStorage.removeItem(ORDER_STORAGE_KEY);
    } catch (error) {
      console.error("Ошибка при очистке заказа из localStorage:", error);
    }
  }, []);

  const value = useMemo(
    () => ({
      order,
      setLineItem,
      setConstructorSummary,
      setDelivery,
      setPaymentMethod,
      patchOrder,
      resetOrder,
    }),
    [
      order,
      setLineItem,
      setConstructorSummary,
      setDelivery,
      setPaymentMethod,
      patchOrder,
      resetOrder,
    ],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error("useOrder должен вызываться внутри OrderProvider");
  }
  return ctx;
}
