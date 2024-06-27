// 메인 페이지 - 목록에서 덱 선택해서 들어가기
// 여러 덱을 그리드 형식 리스트로 보여줌

import styled from "@emotion/styled";
import { totalDeckType } from "../../Types/CardDataType";
import { totalDecks } from "../../Cards/Index";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Styled

const MainPageContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  min-height: 100vh;

  padding: 0 2vw 2vw 2vw;
  box-sizing: border-box;
`;

const PageTitle = styled("p")`
  display: flex;
  justify-content: center;
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

const DeckListContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5vw;
  justify-content: center;
  align-items: center;

  width: 90%;

  border-radius: 20px;
  box-shadow: 0 0 20px white;

  padding: 1.5vw;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2.5vw;
    padding: 2.5vw;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 3.5vw;
    padding: 3.5vw;
  }
`;

const DeckContainer = styled("div")`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  border: 1px solid white;
  border-radius: 20px;
  box-shadow: 1px 0 4px white, -1px 0 4px white, 0 1px 4px white,
    0 -1px 4px white;

  box-sizing: border-box;

  cursor: pointer;

  overflow: hidden;
  aspect-ratio: 1;

  transition: transform 100ms linear;

  :hover {
    transform: scale(1.1);

    z-index: 200;

    box-shadow: 1px 0 15px rgba(170, 230, 255), -1px 0 15px rgba(170, 230, 255),
      0 1px 15px rgba(170, 230, 255), 0 -1px 15px rgba(170, 230, 255);
  }
`;

const DeckBox = styled("img")`
  width: 100%;
  height: 100%;

  object-fit: cover;
`;

const DeckName = styled("div")`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.4);

  font-size: 2.1vw;
  font-weight: bold;
  text-align: center;
  text-shadow: -1px 0 4px rgba(0, 0, 0), 1px 0 4px rgba(0, 0, 0),
    0 1px 4px rgba(0, 0, 0), 0 -1px 4px rgba(0, 0, 0);
  color: white;

  @media (max-width: 1200px) {
    font-size: 3.2vw;
  }

  @media (max-width: 768px) {
    font-size: 4.3vw;
  }
`;

// Component

const MainPage = () => {
  // 마우스가 올라간 덱 호버 css용 usestate
  const [onMouseDeck, setOnMouseDeck] = useState<totalDeckType | null>(null);

  const navigate = useNavigate();

  // 클릭한 덱 페이지로 이동하는 함수
  const handleClickDeck = (link: string) => {
    navigate(`deck/${link}`);
  };

  return (
    <MainPageContainer>
      <PageTitle>유희왕 덱 리스트</PageTitle>
      <DeckListContainer>
        {totalDecks.map((deck) => (
          <DeckContainer
            key={deck.eng}
            onMouseOver={() => setOnMouseDeck(deck)}
            onMouseLeave={() => setOnMouseDeck(null)}
            onClick={() => handleClickDeck(deck.eng)}
          >
            <DeckBox src={deck.img_url} alt={deck.name} />
            {onMouseDeck === deck && <DeckName>{deck.name}</DeckName>}
          </DeckContainer>
        ))}
      </DeckListContainer>
    </MainPageContainer>
  );
};

export default MainPage;
