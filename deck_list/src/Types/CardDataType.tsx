export interface Card {
  name: string;
  img_url: string;
  type: "monster" | "magic" | "trap" | "token";
  grade?: number;
  extra?: "fusion" | "synchro" | "xyz" | "link";
  rare?: "normal" | "rare" | "super" | "ultra" | "secret";
  quantity: 1 | 2 | 3;
}

export interface Deck {
  name: string;
  MainDeck: Card[];
  ExtraDeck?: Card[];
  Token?: Card[];
}
