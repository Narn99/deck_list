import { useNavigate, useParams } from "react-router-dom";
import CardList from "../../Components/Card/CardList";
import { CardType } from "../../Types/CardDataType";
import { totalDecks } from "../../Decks/Index";
import styled from "@emotion/styled";
import { useEffect } from "react";

interface DeckType {
  name: string;
  img_url: string;
  deck: CardType[];
}

const PageContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 3vh 0 3vh 0;
`;

const BackButton = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  /* align-self: flex-start; */

  border: 1px solid white;
  border-radius: 10px;

  background-color: white;

  color: black;
  font-size: 1.5vw;
  font-weight: bolder;
  text-shadow: none;

  padding: 1vw;

  box-sizing: border-box;

  width: 10vw;
  height: 3vw;

  cursor: pointer;

  @media (max-width: 1200px) {
    font-size: 2.5vw;

    width: 20vw;
    height: 6vw;
  }

  @media (max-width: 768px) {
    font-size: 4vw;

    width: 30vw;
    height: 8vw;
  }
`;

const DeckName = styled("p")`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  font-size: 3vw;
  font-weight: bold;

  @media (max-width: 1200px) {
    font-size: 4vw;
  }
  @media (max-width: 768px) {
    font-size: 5vw;
  }
`;

const ClassContainer = styled("div")<{ top?: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  border: 1px solid white;
  border-radius: ${(props) => props.top && "10px 10px 0 0"};

  padding-left: 2vw;
  margin: 0;

  box-sizing: border-box;

  width: 100%;
`;

// 덱 오류시 빨간색 텍스트로 표시
const DeckClass = styled("p")<{ err?: boolean }>`
  color: ${(props) => (props.err ? "red" : "white")};

  display: flex;
  justify-content: flex-start;
  align-items: center;

  font-size: 1.5vw;
  font-weight: bold;
  text-shadow: 1px 0 5px rgba(60, 60, 60);

  @media (max-width: 1200px) {
    font-size: 2.5vw;
  }
  @media (max-width: 768px) {
    font-size: 4vw;
  }
`;

const DeckErr = styled("p")<{ err?: boolean }>`
  color: ${(props) => (props.err ? "red" : "white")};

  font-size: 1vw;
  text-shadow: 1px 0 5px rgba(60, 60, 60);

  margin-left: 1rem;

  @media (max-width: 1200px) {
    font-size: 2vw;
  }
  @media (max-width: 768px) {
    font-size: 3vw;
  }
`;

const CardListBox = styled("div")<{ bot?: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  border: 1px solid white;
  border-radius: ${(props) => props.bot && "0 0 10px 10px"};

  padding: 1.5vw;

  box-sizing: border-box;

  width: 100%;
`;

const DeckPage = () => {
  const { theme } = useParams(); // useParams를 사용하여 URL 파라미터를 객체 형태로 가져옴

  // theme 값을 기준으로 totalDecks에서 일치하는 deck을 찾음
  const deckList: DeckType | undefined = totalDecks.find(
    (deck) => theme === deck.eng
  );

  const bg = deckList?.img_url;

  const DeckContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    position: relative;

    border-radius: 10px;

    box-shadow: 1px 0 20px white;

    width: 95%;

    ::before {
      content: "";
      background-image: url(${bg});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      opacity: 0.4;

      width: 90%;
      height: 90%;

      position: absolute;

      justify-self: center;
      align-self: center;

      border-radius: 50%;
      border: 5px solid white;

      box-shadow: 1px 0 10px white;

      z-index: -100;
    }
  `;

  const navigate = useNavigate();

  const goToPrev = () => {
    navigate(-1);
  };

  const goToMain = () => {
    navigate(`/`);
  };

  useEffect(() => {
    if (!deckList) {
      // 에러 모달 띄워주고
      setTimeout(() => {
        goToPrev();
      }, 3000);
    }
  });

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

  const mainQ = mainDeck?.reduce((a, b) => a + b.quantity, 0);

  const extraDeck = deckList?.deck
    .filter((card) => card.extra && card.type !== "token")
    .sort((a, b) => (sortCards([a, b], extraDeckSortOrder)[0] === a ? -1 : 1));

  const extraQ = extraDeck?.reduce((a, b) => a + b.quantity, 0);

  const tokens = deckList?.deck
    .filter((card) => card.type === "token")
    .sort((a, b) => (sortCards([a, b], tokensSortOrder)[0] === a ? -1 : 1));

  return (
    <PageContainer>
      <BackButton onClick={goToMain}>홈으로</BackButton>
      {deckList ? (
        <>
          <DeckName>{deckList.name}</DeckName>
          <DeckContainer>
            <ClassContainer top>
              <DeckClass err={!(mainQ && mainQ >= 40 && mainQ <= 60)}>
                메인 덱 - {mainQ ? `${mainQ} 장` : `알 수 없음`}
              </DeckClass>
              {!(mainQ && mainQ >= 40 && mainQ <= 60) && (
                <DeckErr>※ 메인 덱은 40∼60장 사이로 구성해주세요.</DeckErr>
              )}
            </ClassContainer>
            {mainDeck && (
              <CardListBox>
                <CardList deckCards={mainDeck} />
              </CardListBox>
            )}
            <ClassContainer>
              <DeckClass err={!(extraQ && extraQ <= 15)}>
                엑스트라 덱 - {extraQ ? `${extraQ} 장` : `알 수 없음`}
              </DeckClass>
              {!(extraQ && extraQ <= 15) && (
                <DeckErr>※ 엑스트라 덱은 15장 미만으로 구성해주세요.</DeckErr>
              )}
            </ClassContainer>
            {extraDeck && (
              <CardListBox>
                <CardList deckCards={extraDeck} />
              </CardListBox>
            )}
            {tokens && (
              <>
                <ClassContainer>
                  <DeckClass>토큰</DeckClass>
                </ClassContainer>
                <CardListBox bot>
                  <CardList deckCards={tokens} />
                </CardListBox>
              </>
            )}
          </DeckContainer>
        </>
      ) : (
        <h2>No deck found for the theme "{theme}"</h2>
      )}
    </PageContainer>
  );
};

export default DeckPage;
