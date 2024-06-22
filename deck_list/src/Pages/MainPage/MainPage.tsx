// 메인 페이지 - 목록에서 덱 선택해서 들어가기
// 여러 덱을 리스트로 보여줌

import styled from "@emotion/styled";
import { totalDecks } from "../../Decks/Index";
import { useState } from "react";
import { totalDeckType } from "../../Types/CardDataType";
import { useNavigate } from "react-router-dom";

const MainPageContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-height: 100vh;

  padding: 2vw 2vw 2vw 2vw;
  box-sizing: border-box;
`;

const DeckListContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  justify-content: center;
  align-items: center;

  gap: 1.5vw;

  width: 90%;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
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

  cursor: pointer;

  overflow: hidden;

  box-sizing: border-box;
  aspect-ratio: 1;
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

  top: 0;
  left: 0;

  font-size: 2rem;
  font-weight: bold;
  color: white;

  background-color: rgba(0, 0, 0, 0.4);

  text-shadow: 1px 0 20px rgb(90, 90, 90);

  width: 100%;
  height: 100%;
`;

const MainPage = () => {
  const [onMouseDeck, setOnMouseDeck] = useState<totalDeckType | null>(null);

  const navigate = useNavigate();

  const handleOnMouseOver = (deck: totalDeckType) => {
    setOnMouseDeck(deck);
  };

  const handleOnMouseLeave = () => {
    setOnMouseDeck(null);
  };

  const handleClickDeck = (link: string) => {
    navigate(`deck/${link}`);
  };

  return (
    <MainPageContainer>
      <DeckListContainer>
        {totalDecks.map((deck) => (
          <DeckContainer
            onMouseOver={() => handleOnMouseOver(deck)}
            onMouseLeave={handleOnMouseLeave}
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
