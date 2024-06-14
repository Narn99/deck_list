export interface CardType {
  name: string;
  img_url: string;
  type: "monster" | "magic" | "trap" | "token";
  grade?: number;
  extra?: "fusion" | "synchro" | "xyz" | "link";
  rare?: "normal" | "rare" | "super" | "ultra" | "secret" | "cross";

  quantity: 1 | 2 | 3;
}

export interface totalDeckType {
  name: string;
  eng: string;
  img_url: string;
}

export interface DeckType {
  name: string;
  MainDeck: CardType[];
  ExtraDeck?: CardType[];
  Token?: CardType[];
}

export interface CardProps {
  cardData: CardType;
  onCardClick: () => void;
  rotationX?: number;
  rotationY?: number;
}
