export interface CardType {
  name: string;
  img_url: string;
  type: "monster" | "magic" | "trap" | "token";
  grade?: number;
  extra?: "fusion" | "synchro" | "xyz" | "link";
  rare?:
    | "normal"
    | "rare"
    | "super"
    | "ultra"
    | "secret"
    | "special"
    | "cross"
    | "parallel";
  quantity: 1 | 2 | 3;
}

export interface DeckType {
  name: string;
  MainDeck: CardType[];
  ExtraDeck?: CardType[];
  Token?: CardType[];
}
