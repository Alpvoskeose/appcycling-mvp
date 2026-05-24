import { useState } from "react";
import { Store, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

type DeliveryChoice = "courier" | "pickup";

export default function Delivery() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<DeliveryChoice>("courier");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [apartment, setApartment] = useState("");

  const courierActive = method === "courier";
  const pickupActive = method === "pickup";

  return (
    <div className="min-h-screen bg-white px-4 pb-24 pt-4 text-[#212121]">
      <h1 className="text-lg font-bold text-[#212121]">Доставка</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setMethod("courier")}
          className={[
            "flex flex-col gap-3 rounded-2xl border bg-white p-5 text-left shadow-sm transition-colors",
            courierActive ? "border-[#556B2F]" : "border-[#E5E5E5]",
          ].join(" ")}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6F7F2]">
            <Truck className="h-7 w-7 text-[#556B2F]" strokeWidth={2} aria-hidden />
          </span>
          <div>
            <h2 className="text-base font-semibold text-[#212121]">Курьером</h2>
            <p className="mt-1 text-sm text-[#7A7A7A]">Доставим по вашему адресу.</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setMethod("pickup")}
          className={[
            "flex flex-col gap-3 rounded-2xl border bg-white p-5 text-left shadow-sm transition-colors",
            pickupActive ? "border-[#556B2F]" : "border-[#E5E5E5]",
          ].join(" ")}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6F7F2]">
            <Store className="h-7 w-7 text-[#556B2F]" strokeWidth={2} aria-hidden />
          </span>
          <div>
            <h2 className="text-base font-semibold text-[#212121]">Самовывоз</h2>
            <p className="mt-1 text-sm text-[#7A7A7A]">Заберите в пункте выдачи.</p>
          </div>
        </button>
      </div>

      {courierActive ? (
        <div className="mt-6 space-y-4 rounded-2xl border border-[#E5E5E5] bg-white p-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#212121]">Город</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-2xl border border-[#E5E5E5] px-4 py-3"
              placeholder="Алматы"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-[#212121]">Улица</label>
            <input
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full rounded-2xl border border-[#E5E5E5] px-4 py-3"
              placeholder="Ул. Абая"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#212121]">Дом</label>
              <input
                value={house}
                onChange={(e) => setHouse(e.target.value)}
                className="w-full rounded-2xl border border-[#E5E5E5] px-4 py-3"
                placeholder="150"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[#212121]">Квартира</label>
              <input
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                className="w-full rounded-2xl border border-[#E5E5E5] px-4 py-3"
                placeholder="12"
              />
            </div>
          </div>
        </div>
      ) : null}

      <div className="fixed inset-x-0 bottom-0 border-t border-[#E5E5E5] bg-white px-4 py-4">
        <button
          type="button"
          onClick={() => navigate("/payment")}
          className="w-full rounded-2xl bg-[#556B2F] py-4 text-base font-semibold text-white"
        >
          Перейти к оплате
        </button>
      </div>
    </div>
  );
}
