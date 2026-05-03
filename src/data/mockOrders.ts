export type MockOrder = {
  id: string;
  title: string;
  subtitle: string;
  totalLabel: string;
  createdAtLabel: string;
  /** 0–3: какой шаг уже «закрыт» (включительно) для статус-бара из 4 этапов */
  progressIndex: number;
};

export const MOCK_ORDERS: MockOrder[] = [
  {
    id: "2048",
    title: "Деним-куртка «Городской канон»",
    subtitle: "Курьер · апсайкл после ИИ",
    totalLabel: "14 900 ₸",
    createdAtLabel: "02 мая 2026",
    progressIndex: 1,
  },
  {
    id: "2055",
    title: "Худи апсайкл «Туманное утро»",
    subtitle: "Самовывоз · редактор конструктора",
    totalLabel: "15 500 ₸",
    createdAtLabel: "28 апреля 2026",
    progressIndex: 2,
  },
  {
    id: "2061",
    title: "Тренч второй жизни",
    subtitle: "Курьер · премиум материалы",
    totalLabel: "22 400 ₸",
    createdAtLabel: "15 апреля 2026",
    progressIndex: 3,
  },
];

export function getMockOrder(orderId: string): MockOrder | undefined {
  return MOCK_ORDERS.find((o) => o.id === orderId);
}
