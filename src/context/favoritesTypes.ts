/** Элемент избранного (ИИ-идея апсайклинга) */
export type FavoriteIdea = {
  id: string;
  image: string;
  title: string;
  /** Подпись цены для UI, например «от 14 900 ₸» */
  price: string;
  /** Числовая сумма для контекста заказа */
  priceAmountKzt: number;
  /** Краткое описание для блока конструктора в заказе */
  tagline?: string;
};
