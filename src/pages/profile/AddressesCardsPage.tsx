import { useState } from "react";
import { MapPin, Pencil, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

export default function AddressesCardsPage() {
  const { addresses, addAddress, removeAddress, cards, addCard, removeCard } = useApp();

  // Модальные окна
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  // Формы модальных окон
  const [newAddress, setNewAddress] = useState({ city: "", street: "", apartment: "" });
  const [newCard, setNewCard] = useState({ number: "", expiry: "", cvc: "" });

  // Добавление адреса
  const handleAddAddress = () => {
    if (!newAddress.city.trim() || !newAddress.street.trim()) {
      alert("Пожалуйста, заполните все поля");
      return;
    }
    addAddress({
      city: newAddress.city,
      street: newAddress.street,
      apartment: newAddress.apartment,
    });
    setNewAddress({ city: "", street: "", apartment: "" });
    setIsAddressModalOpen(false);
  };

  // Добавление карты
  const handleAddCard = () => {
    if (!newCard.number.trim() || !newCard.expiry.trim() || !newCard.cvc.trim()) {
      alert("Пожалуйста, заполните все поля");
      return;
    }
    const cardNumber = newCard.number.endsWith("****")
      ? newCard.number
      : `**** ${newCard.number.replace(/\s/g, "").slice(-4)}`;

    addCard({
      number: cardNumber,
      expiry: newCard.expiry,
      type: "visa",
    });
    setNewCard({ number: "", expiry: "", cvc: "" });
    setIsCardModalOpen(false);
  };

  return (
    <div className="space-y-8 px-4 py-6">
      {/* АДРЕСА ДОСТАВКИ */}
      <section aria-labelledby="addresses-heading">
        <h2
          id="addresses-heading"
          className="text-xs font-semibold uppercase tracking-wide text-muted"
        >
          Адреса доставки
        </h2>

        {addresses.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Нет сохраненных адресов</p>
        ) : (
          <div className="mt-4 space-y-3">
            <AnimatePresence mode="popLayout">
              {addresses.map((address) => (
                <motion.article
                  key={address.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex gap-3 rounded-2xl bg-surface p-4 shadow-card ring-1 ring-black/[0.04]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15">
                    <MapPin className="h-5 w-5 text-accent" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground">
                      {address.city}, {address.street}
                    </p>
                    <p className="mt-1 text-sm text-muted">{address.apartment}</p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      className="rounded-xl p-2 text-muted hover:bg-canvas hover:text-foreground transition-colors"
                      aria-label="Редактировать адрес"
                    >
                      <Pencil className="h-5 w-5" aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeAddress(address.id)}
                      className="rounded-xl p-2 text-muted hover:bg-canvas hover:text-destructive transition-colors"
                      aria-label="Удалить адрес"
                    >
                      <Trash2 className="h-5 w-5" aria-hidden />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsAddressModalOpen(true)}
          className="mt-4 flex w-full items-center justify-center rounded-2xl border-2 border-dashed border-accent bg-surface px-4 py-4 text-sm font-semibold text-accent shadow-card hover:bg-accent/5 dark:bg-surface-dark dark:hover:bg-accent/10 transition-colors"
        >
          + Добавить новый адрес
        </button>
      </section>

      {/* СПОСОБЫ ОПЛАТЫ */}
      <section aria-labelledby="cards-heading">
        <h2 id="cards-heading" className="text-xs font-semibold uppercase tracking-wide text-muted dark:text-muted-dark">
          Способы оплаты
        </h2>

        {cards.length === 0 ? (
          <p className="mt-4 text-sm text-muted dark:text-muted-dark">Нет привязанных карт</p>
        ) : (
          <div className="mt-4 space-y-3">
            <AnimatePresence mode="popLayout">
              {cards.map((card) => (
                <motion.article
                  key={card.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-3 rounded-2xl bg-surface p-4 shadow-card ring-1 ring-black/[0.04] dark:bg-surface-dark dark:ring-white/[0.05]"
                >
                  <span className="flex h-10 w-14 shrink-0 items-center justify-center rounded-lg bg-[#1a1f71] text-[10px] font-bold tracking-wide text-white">
                    {card.type === "visa" ? "VISA" : "MC"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground dark:text-foreground-dark">
                      Visa {card.number}
                    </p>
                    <p className="text-sm text-muted dark:text-muted-dark">{card.expiry}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCard(card.id)}
                    className="rounded-xl p-2 text-muted hover:bg-canvas dark:text-muted-dark dark:hover:bg-canvas-dark hover:text-destructive transition-colors"
                    aria-label="Удалить карту"
                  >
                    <X className="h-5 w-5" aria-hidden />
                  </button>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsCardModalOpen(true)}
          className="mt-4 flex w-full items-center justify-center rounded-2xl border-2 border-foreground bg-surface px-4 py-4 text-sm font-semibold text-accent shadow-card hover:bg-accent/5 dark:border-foreground-dark dark:bg-surface-dark dark:hover:bg-accent/10 transition-colors"
        >
          + Привязать карту
        </button>
      </section>

      {/* МОДАЛЬ: ДОБАВЛЕНИЕ АДРЕСА */}
      <AnimatePresence>
        {isAddressModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddressModalOpen(false)}
              className="fixed inset-0 z-40 bg-black/50"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 flex items-end"
            >
              <div className="w-full rounded-t-3xl bg-surface dark:bg-surface-dark p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-foreground dark:text-foreground-dark">
                  Новый адрес
                </h3>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground dark:text-foreground-dark">
                      Город, улица
                    </label>
                    <input
                      type="text"
                      placeholder="Например: г. Алматы, ул. Абая 14"
                      value={newAddress.city + (newAddress.street ? ", " + newAddress.street : "")}
                      onChange={(e) => {
                        const [city, ...street] = e.target.value.split(",");
                        setNewAddress({
                          ...newAddress,
                          city: city.trim(),
                          street: street.join(",").trim(),
                        });
                      }}
                      className="mt-2 w-full rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-[#2a2a2a] px-4 py-3 text-foreground dark:text-foreground-dark placeholder-muted dark:placeholder-muted-dark focus:border-accent dark:focus:border-accent/70 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground dark:text-foreground-dark">
                      Квартира / Подъезд
                    </label>
                    <input
                      type="text"
                      placeholder="Например: Кв. 42, Подъезд 2"
                      value={newAddress.apartment}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, apartment: e.target.value })
                      }
                      className="mt-2 w-full rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-[#2a2a2a] px-4 py-3 text-foreground dark:text-foreground-dark placeholder-muted dark:placeholder-muted-dark focus:border-accent dark:focus:border-accent/70 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddressModalOpen(false)}
                    className="flex-1 rounded-2xl border-2 border-border dark:border-border-dark py-4 text-sm font-semibold text-foreground dark:text-foreground-dark hover:bg-canvas dark:hover:bg-canvas-dark transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    type="button"
                    onClick={handleAddAddress}
                    className="flex-1 rounded-2xl bg-accent py-4 text-sm font-semibold text-white hover:brightness-110 transition-all active:scale-95"
                  >
                    Сохранить адрес
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* МОДАЛЬ: ПРИВЯЗАНИЕ КАРТЫ */}
      <AnimatePresence>
        {isCardModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCardModalOpen(false)}
              className="fixed inset-0 z-40 bg-black/50"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 flex items-end"
            >
              <div className="w-full rounded-t-3xl bg-surface dark:bg-surface-dark p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-foreground dark:text-foreground-dark">
                  Новая карта
                </h3>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground dark:text-foreground-dark">
                      Номер карты
                    </label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      value={newCard.number}
                      onChange={(e) => {
                        const cleaned = e.target.value.replace(/\D/g, "");
                        const formatted = cleaned
                          .substring(0, 16)
                          .replace(/(\d{4})(?=\d)/g, "$1 ");
                        setNewCard({ ...newCard, number: formatted });
                      }}
                      maxLength={19}
                      className="mt-2 w-full rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-[#2a2a2a] px-4 py-3 text-foreground dark:text-foreground-dark placeholder-muted dark:placeholder-muted-dark focus:border-accent dark:focus:border-accent/70 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground dark:text-foreground-dark">
                        Срок действия
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={newCard.expiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, "");
                          if (val.length >= 2) {
                            val = val.substring(0, 2) + "/" + val.substring(2, 4);
                          }
                          setNewCard({ ...newCard, expiry: val });
                        }}
                        maxLength={5}
                        className="mt-2 w-full rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-[#2a2a2a] px-4 py-3 text-foreground dark:text-foreground-dark placeholder-muted dark:placeholder-muted-dark focus:border-accent dark:focus:border-accent/70 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground dark:text-foreground-dark">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        value={newCard.cvc}
                        onChange={(e) => {
                          const cleaned = e.target.value
                            .replace(/\D/g, "")
                            .substring(0, 3);
                          setNewCard({ ...newCard, cvc: cleaned });
                        }}
                        maxLength={3}
                        className="mt-2 w-full rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-[#2a2a2a] px-4 py-3 text-foreground dark:text-foreground-dark placeholder-muted dark:placeholder-muted-dark focus:border-accent dark:focus:border-accent/70 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCardModalOpen(false)}
                    className="flex-1 rounded-2xl border-2 border-border dark:border-border-dark py-4 text-sm font-semibold text-foreground dark:text-foreground-dark hover:bg-canvas dark:hover:bg-canvas-dark transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    type="button"
                    onClick={handleAddCard}
                    className="flex-1 rounded-2xl bg-accent py-4 text-sm font-semibold text-white hover:brightness-110 transition-all active:scale-95"
                  >
                    Привязать карту
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
