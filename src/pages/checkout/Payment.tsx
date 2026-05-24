import { useState } from "react";
import { CreditCard, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

type PaymentChoice = "card" | "cash";

export default function Payment() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<PaymentChoice>("card");

  const cardActive = method === "card";
  const cashActive = method === "cash";

  return (
    <div className="min-h-screen bg-white px-4 pb-24 pt-4 text-[#212121]">
      <h1 className="text-lg font-bold text-[#212121]">Оплата</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setMethod("card")}
          className={[
            "flex flex-col gap-3 rounded-2xl border bg-white p-5 text-left shadow-sm transition-colors",
            cardActive ? "border-[#556B2F]" : "border-[#E5E5E5]",
          ].join(" ")}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6F7F2]">
            <CreditCard className="h-7 w-7 text-[#556B2F]" strokeWidth={2} aria-hidden />
          </span>
          <div>
            <h2 className="text-base font-semibold text-[#212121]">Картой онлайн</h2>
            <p className="mt-1 text-sm text-[#7A7A7A]">Быстрая оплата картой.</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setMethod("cash")}
          className={[
            "flex flex-col gap-3 rounded-2xl border bg-white p-5 text-left shadow-sm transition-colors",
            cashActive ? "border-[#556B2F]" : "border-[#E5E5E5]",
          ].join(" ")}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6F7F2]">
            <Wallet className="h-7 w-7 text-[#556B2F]" strokeWidth={2} aria-hidden />
          </span>
          <div>
            <h2 className="text-base font-semibold text-[#212121]">При получении</h2>
            <p className="mt-1 text-sm text-[#7A7A7A]">Оплата при получении заказа.</p>
          </div>
        </button>
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-[#E5E5E5] bg-white px-4 py-4">
        <button
          type="button"
          onClick={() => navigate("/status")}
          className="w-full rounded-2xl bg-[#556B2F] py-4 text-base font-semibold text-white"
        >
          Оплатить и подтвердить заказ
        </button>
      </div>
    </div>
  );
}
