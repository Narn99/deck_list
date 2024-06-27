import { CardType, DeckCardType } from "../../Types/CardDataType";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CardList from "../../Components/Card/CardList";
import { cards } from "../../Cards/CardList";
import styled from "@emotion/styled";
import { totalDecks } from "../../Cards/Index";

// Types

interface DeckType {
  name: string;
  img_url: string;
  deck: DeckCardType[];
}

// Styled

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

  width: 10vw;
  height: 3vw;

  border: 1px solid white;
  border-radius: 10px;

  padding: 1vw;
  box-sizing: border-box;
  background-color: white;

  font-size: 1.5vw;
  font-weight: bolder;
  text-shadow: none;
  color: black;

  cursor: pointer;

  transition: transform 50ms linear;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  :hover {
    transform: scale(1.05);

    background-color: #e2e2e2;
  }

  :not(:hover) {
    transform: scale(1);
  }

  :active {
    transform: scale(1.025);

    border: none;
    color: white;
    background-color: #858585;
    box-shadow: 0 0 5px #858585;
  }

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

  border-top: 2px dotted skyblue;
  border-bottom: 2px dotted skyblue;

  padding: 1.5vh 0 1.5vh 0;

  font-size: 4vw;
  font-weight: bold;
  text-shadow: 0 0 30px chartreuse;

  @media (max-width: 1200px) {
    font-size: 6vw;
  }
  @media (max-width: 768px) {
    font-size: 8vw;
  }
`;

const ClassContainer = styled("div")<{ top?: boolean; hide: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 100%;

  border: 1px solid white;
  border-radius: ${(props) => props.top && "10px 10px 0 0"};

  padding-left: 2vw;
  margin: 0;
  box-sizing: border-box;

  visibility: ${(props) => (props.hide ? "hidden" : "visible")};
`;

// 덱 오류시 빨간색 텍스트로 표시
const DeckClass = styled("p")<{ err?: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  font-size: 1.5vw;
  font-weight: bold;
  text-shadow: ${(props) =>
    props.err
      ? `-1px 0 1px lightgray, 1px 0 1px lightgray, 0 1px 1px lightgray, 0 -1px 1px lightgray`
      : `-1px 0 4px red, 1px 0 4px red, 0 1px 4px red, 0 -1px 4px red`};
  color: ${(props) => (props.err ? "red" : "white")};

  @media (max-width: 1200px) {
    font-size: 2.5vw;
  }
  @media (max-width: 768px) {
    font-size: 4vw;
  }
`;

const DeckErr = styled("p")<{ err?: boolean }>`
  margin-left: 1rem;

  font-size: 1vw;
  text-shadow: -1px 0 2px red, 1px 0 2px red, 0 1px 2px red, 0 -1px 2px red;
  color: ${(props) => (props.err ? "red" : "white")};

  @media (max-width: 1200px) {
    font-size: 2vw;
  }
  @media (max-width: 768px) {
    font-size: 3vw;
  }
`;

const CardListBox = styled("div")<{ bot?: boolean; hide: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 100%;

  border: 1px solid white;
  border-radius: ${(props) => props.bot && "0 0 10px 10px"};

  padding: 1.5vw;
  box-sizing: border-box;

  visibility: ${(props) => (props.hide ? "hidden" : "visible")};
`;

const HideButton = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;

  width: 10vw;
  height: 3vw;

  border: 1px solid white;
  border-radius: 10px;

  padding: 1vw;
  margin: 0 3vw 2vw 0;
  box-sizing: border-box;
  background-color: white;

  font-size: 1.5vw;
  font-weight: bolder;
  text-shadow: none;
  color: black;

  cursor: pointer;

  transition: transform 50ms linear;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  :hover {
    transform: scale(1.05);

    background-color: #e2e2e2;
  }

  :not(:hover) {
    transform: scale(1);
  }

  :active {
    transform: scale(1.025);

    border: none;
    color: white;
    background-color: #858585;
    box-shadow: 0 0 5px #858585;
  }

  @media (max-width: 1200px) {
    width: 20vw;
    height: 6vw;

    font-size: 2.5vw;
  }

  @media (max-width: 768px) {
    width: 30vw;
    height: 8vw;

    font-size: 4vw;
  }
`;

// Component

const DeckPage = () => {
  // useParams로 params의 현재 덱 이름을 가져옴
  const { theme } = useParams();

  // theme 값을 기준으로 totalDecks에서 일치하는 deck을 찾음
  const deckList: DeckType | undefined = totalDecks.find(
    (deck) => theme === deck.eng
  );

  // 덱 배경 이미지
  const bg = deckList?.img_url;

  // url값에 bg를 사용하기 위해 컴포넌트 내부로 이동한 Styled... 통일성을 해친다.
  const DeckContainer = styled("div")<{ hide: boolean }>`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 95%;

    border-radius: 10px;

    box-shadow: 1px 0 20px white;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    ::before {
      content: "";
      position: absolute;

      justify-self: center;
      align-self: center;

      width: 90%;
      height: 90%;

      border-radius: 50%;
      border: 5px solid white;

      box-shadow: 1px 0 10px white;
      background-image: url(${bg});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      opacity: ${(props) => (props.hide ? 1 : 0.75)};

      z-index: -100;
    }
  `;

  // 카드 숨기고 배경을 보여주는 버튼용 usestate
  const [hideCards, setHideCards] = useState(false);

  const navigate = useNavigate();

  // 이전 페이지로
  const goToPrev = () => {
    navigate(-1);
  };

  // 홈 페이지로
  const goToMain = () => {
    navigate(`/`);
  };

  // params에 맞는 theme가 없을 시 이전 페이지로 돌아가기
  useEffect(() => {
    if (!deckList) {
      setTimeout(() => {
        goToPrev();
      }, 3000);
    }
  });

  // 몬스터, 마법, 함정 순으로 정렬
  const typeOrder: { [key in "monster" | "magic" | "trap"]: number } = {
    monster: 1,
    magic: 2,
    trap: 3,
  };

  // 레어도가 높은 순으로 정렬
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

  // 카드 리스트 정렬 함수
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

  // 메인 덱 정렬 함수 (위부터 순서대로)
  const mainDeckSortOrder = [
    // 몬스터, 마법, 함정 순 정렬
    (a: CardType, b: CardType) =>
      typeOrder[a.type as "monster" | "magic" | "trap"] -
      typeOrder[b.type as "monster" | "magic" | "trap"],

    // 레벨 오름차순 정렬
    (a: CardType, b: CardType) => (a.grade && b.grade ? a.grade - b.grade : 0),

    // 카드 장수 내림차순 정렬
    (a: CardType, b: CardType) =>
      a.quantity && b.quantity ? b.quantity - a.quantity : 0,

    // 레어도 내림차순 정렬
    (a: CardType, b: CardType) =>
      rareOrder[
        b.rare as "cross" | "secret" | "ultra" | "super" | "rare" | "normal"
      ] -
      rareOrder[
        a.rare as "cross" | "secret" | "ultra" | "super" | "rare" | "normal"
      ],

    // 한글 이름 빠른 순서 정렬
    (a: CardType, b: CardType) => a.name.localeCompare(b.name, "ko-KR"),
  ];

  // 엑스트라 덱 정렬 함수 (위부터 순서대로)
  const extraDeckSortOrder = [
    // 엑스트라 속성을 융합 > 싱크로 > 엑시즈 > 링크 순서대로 정렬
    (a: CardType, b: CardType) => {
      const extraOrder = { fusion: 1, synchro: 2, xyz: 3, link: 4 };
      return (
        extraOrder[a.extra as "fusion" | "synchro" | "xyz" | "link"] -
        extraOrder[b.extra as "fusion" | "synchro" | "xyz" | "link"]
      );
    },

    // 레벨이나 링크 마커같은 grade 오름차순 정렬 (엑스트라 덱 외엔 레벨)
    (a: CardType, b: CardType) => (a.grade && b.grade ? a.grade - b.grade : 0),

    // 카드 장수 내림차순 정렬
    (a: CardType, b: CardType) =>
      a.quantity && b.quantity ? b.quantity - a.quantity : 0,

    // 레어도 내림차순 정렬
    (a: CardType, b: CardType) =>
      rareOrder[
        b.rare as "cross" | "secret" | "ultra" | "super" | "rare" | "normal"
      ] -
      rareOrder[
        a.rare as "cross" | "secret" | "ultra" | "super" | "rare" | "normal"
      ],

    // 한글 이름 빠른 순서 정렬
    (a: CardType, b: CardType) => a.name.localeCompare(b.name, "ko-KR"),
  ];

  // 토큰 정렬 함수 (위부터 순서대로)
  const tokensSortOrder = [
    // 레벨 오름차순 정렬
    (a: CardType, b: CardType) => (a.grade && b.grade ? a.grade - b.grade : 0),

    // 레어도 내림차순 정렬
    (a: CardType, b: CardType) =>
      rareOrder[
        b.rare as "cross" | "secret" | "ultra" | "super" | "rare" | "normal"
      ] -
      rareOrder[
        a.rare as "cross" | "secret" | "ultra" | "super" | "rare" | "normal"
      ],

    // 한글 이름 빠른 순서 정렬
    (a: CardType, b: CardType) => a.name.localeCompare(b.name, "ko-KR"),
  ];

  // 메인 덱 정렬한 리스트
  const mainDeck = cards
    .reduce((cardList: CardType[], cardDB: CardType) => {
      const one = deckList?.deck.find(
        (card: DeckCardType) =>
          cardDB.name === card.name && !cardDB.extra && cardDB.type !== "token"
      );
      if (one?.quantity !== undefined) {
        cardList.push({ quantity: one.quantity, ...cardDB });
      }
      return cardList;
    }, [])
    .sort((a, b) => (sortCards([a, b], mainDeckSortOrder)[0] === a ? -1 : 1));

  // 엑스트라 덱 정렬한 리스트
  const extraDeck = cards
    .reduce((cardList: CardType[], cardDB: CardType) => {
      const one = deckList?.deck.find(
        (card: DeckCardType) =>
          cardDB.name === card.name && cardDB.extra && cardDB.type !== "token"
      );
      if (one?.quantity !== undefined) {
        cardList.push({ quantity: one.quantity, ...cardDB });
      }

      return cardList;
    }, [])
    .sort((a, b) => (sortCards([a, b], extraDeckSortOrder)[0] === a ? -1 : 1));

  // 토큰 정렬한 리스트
  const tokens = cards
    .reduce((cardList: CardType[], cardDB: CardType) => {
      const one = deckList?.deck.find(
        (card: DeckCardType) =>
          cardDB.name === card.name && cardDB.type === "token"
      );

      if (one?.quantity !== undefined) {
        cardList.push({ quantity: one.quantity, ...cardDB });
      }

      return cardList;
    }, [])
    .sort((a, b) => (sortCards([a, b], tokensSortOrder)[0] === a ? -1 : 1));

  // 메인 덱 총 장수
  const mainQ = mainDeck?.reduce((a, b) => a + (b.quantity || 0), 0);

  // 엑스트라 덱 덱 총 장수
  const extraQ = extraDeck?.reduce((a, b) => a + (b.quantity || 0), 0);

  return (
    <PageContainer>
      <BackButton onClick={goToMain}>홈으로</BackButton>
      {deckList ? (
        <>
          <DeckName>{deckList.name}</DeckName>
          <HideButton onClick={() => setHideCards(!hideCards)}>
            {hideCards ? "카드 보이기" : "카드 숨기기"}
          </HideButton>
          <DeckContainer hide={hideCards}>
            <ClassContainer top hide={hideCards}>
              <DeckClass err={!(mainQ && mainQ >= 40 && mainQ <= 60)}>
                메인 덱 - {mainQ ? `${mainQ} 장` : `알 수 없음`}
              </DeckClass>
              {!(mainQ && mainQ >= 40 && mainQ <= 60) && (
                <DeckErr>※ 메인 덱은 40∼60장 사이로 구성해주세요.</DeckErr>
              )}
            </ClassContainer>
            {mainDeck && (
              <CardListBox hide={hideCards}>
                <CardList deckCards={mainDeck} />
              </CardListBox>
            )}
            <ClassContainer hide={hideCards}>
              <DeckClass err={!(extraQ && extraQ <= 15)}>
                엑스트라 덱 - {extraQ ? `${extraQ} 장` : `알 수 없음`}
              </DeckClass>
              {!(extraQ && extraQ <= 15) && (
                <DeckErr>※ 엑스트라 덱은 15장 미만으로 구성해주세요.</DeckErr>
              )}
            </ClassContainer>
            {extraDeck && (
              <CardListBox hide={hideCards}>
                <CardList deckCards={extraDeck} />
              </CardListBox>
            )}
            {tokens && tokens.length > 0 && (
              <>
                <ClassContainer hide={hideCards}>
                  <DeckClass>토큰</DeckClass>
                </ClassContainer>
                <CardListBox bot hide={hideCards}>
                  <CardList deckCards={tokens} />
                </CardListBox>
              </>
            )}
          </DeckContainer>
        </>
      ) : (
        <h2>"{theme}" 테마가 존재하지 않습니다.</h2>
      )}
    </PageContainer>
  );
};

export default DeckPage;
