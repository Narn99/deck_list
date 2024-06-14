import { useParams } from "react-router-dom";
import CardList from "../../Components/CardList";
import { CardType } from "../../Types/CardDataType";
import { totalDecks } from "../../Decks/Index";

interface DeckType {
  name: string;
  img_url: string;
  deck: CardType[];
}

const DeckPage = () => {
  const { theme } = useParams(); // useParams를 사용하여 URL 파라미터를 객체 형태로 가져옴

  // theme 값을 기준으로 totalDecks에서 일치하는 deck을 찾음
  const deckList: DeckType | undefined = totalDecks.find(
    (deck) => theme === deck.eng
  );

  // 타입 순서를 결정하는 객체
  const typeOrder: { [key in "monster" | "magic" | "trap"]: number } = {
    monster: 1,
    magic: 2,
    trap: 3,
  };

  // 레어도 순서를 결정하는 객체
  const rareOrder: {
    [key in "cross" | "secret" | "ultra" | "super" | "rare" | "normal"]: number;
  } = {
    cross: 6,
    secret: 5,
    ultra: 4,
    super: 3,
    rare: 2,
    normal: 1,
  };

  // 카드 배열을 정렬하는 함수
  const sortCards = (
    cards: CardType[],
    sortOrder: ((a: CardType, b: CardType) => number)[]
  ) => {
    return cards.slice().sort((a, b) => {
      // 순서에 따라 정렬 함수를 반복적으로 적용
      for (let sortFunc of sortOrder) {
        const result = sortFunc(a, b);
        if (result !== 0) {
          return result; // 정렬 함수의 결과가 0이 아니면 그 결과를 반환
        }
      }
      return 0; // 모든 정렬 함수가 동일한 결과를 반환할 경우 0을 반환
    });
  };

  // 메인 덱 정렬 함수들
  const mainDeckSortOrder = [
    // 카드 타입 순서: monster > magic > trap
    (a: CardType, b: CardType) =>
      typeOrder[a.type as "monster" | "magic" | "trap"] -
      typeOrder[b.type as "monster" | "magic" | "trap"],

    // grade 오름차순
    (a: CardType, b: CardType) => (a.grade && b.grade ? a.grade - b.grade : 0),

    // quantity 내림차순
    (a: CardType, b: CardType) => b.quantity - a.quantity,

    // rare 내림차순
    (a: CardType, b: CardType) =>
      rareOrder[
        b.rare as "cross" | "secret" | "ultra" | "super" | "rare" | "normal"
      ] -
      rareOrder[
        a.rare as "cross" | "secret" | "ultra" | "super" | "rare" | "normal"
      ],

    // 한글 이름 빠른 순서
    (a: CardType, b: CardType) => a.name.localeCompare(b.name, "ko-KR"),
  ];

  // 엑스트라 덱 정렬 함수들
  const extraDeckSortOrder = [
    // 엑스트라 타입 순서: fusion > synchro > xyz > link
    (a: CardType, b: CardType) => {
      const extraOrder = { fusion: 1, synchro: 2, xyz: 3, link: 4 };
      return (
        extraOrder[a.extra as "fusion" | "synchro" | "xyz" | "link"] -
        extraOrder[b.extra as "fusion" | "synchro" | "xyz" | "link"]
      );
    },

    // grade 오름차순
    (a: CardType, b: CardType) => (a.grade && b.grade ? a.grade - b.grade : 0),

    // quantity 내림차순
    (a: CardType, b: CardType) => b.quantity - a.quantity,

    // rare 내림차순
    (a: CardType, b: CardType) =>
      rareOrder[
        b.rare as "cross" | "secret" | "ultra" | "super" | "rare" | "normal"
      ] -
      rareOrder[
        a.rare as "cross" | "secret" | "ultra" | "super" | "rare" | "normal"
      ],

    // 한글 이름 빠른 순서
    (a: CardType, b: CardType) => a.name.localeCompare(b.name, "ko-KR"),
  ];

  // 토큰 정렬 함수들
  const tokensSortOrder = [
    // grade 오름차순
    (a: CardType, b: CardType) => (a.grade && b.grade ? a.grade - b.grade : 0),

    // quantity 내림차순
    (a: CardType, b: CardType) => b.quantity - a.quantity,

    // rare 내림차순
    (a: CardType, b: CardType) =>
      rareOrder[
        b.rare as "cross" | "secret" | "ultra" | "super" | "rare" | "normal"
      ] -
      rareOrder[
        a.rare as "cross" | "secret" | "ultra" | "super" | "rare" | "normal"
      ],

    // 한글 이름 빠른 순서
    (a: CardType, b: CardType) => a.name.localeCompare(b.name, "ko-KR"),
  ];

  // 필터링된 카드 배열을 각각 정렬
  const mainDeck = deckList?.deck
    .filter((card) => !card.extra && card.type !== "token")
    .sort((a, b) => (sortCards([a, b], mainDeckSortOrder)[0] === a ? -1 : 1));

  const extraDeck = deckList?.deck
    .filter((card) => card.extra && card.type !== "token")
    .sort((a, b) => (sortCards([a, b], extraDeckSortOrder)[0] === a ? -1 : 1));

  const tokens = deckList?.deck
    .filter((card) => card.type === "token")
    .sort((a, b) => (sortCards([a, b], tokensSortOrder)[0] === a ? -1 : 1));

  return (
    <div>
      <h1>Deck Page</h1>
      {deckList ? (
        <div>
          <h2>{deckList.name}</h2>
          <h4>메인 덱</h4>
          {mainDeck && <CardList deckCards={mainDeck} />} {/* 메인 덱 렌더링 */}
          <h4>엑스트라 덱</h4>
          {extraDeck && <CardList deckCards={extraDeck} />}{" "}
          {/* 엑스트라 덱 렌더링 */}
          <h4>토큰</h4>
          {tokens && <CardList deckCards={tokens} />} {/* 토큰 카드 렌더링 */}
        </div>
      ) : (
        <p>No deck found for the theme "{theme}"</p>
      )}
    </div>
  );
};

export default DeckPage;
