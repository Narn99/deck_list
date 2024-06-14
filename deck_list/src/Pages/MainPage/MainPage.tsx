// 메인 페이지 - 목록에서 덱 선택해서 들어가기
// 여러 덱을 리스트로 보여줌
//

import styled from "@emotion/styled";
import { totalDecks } from "../../Decks/Index";
import { useState } from "react";
import { totalDeckType } from "../../Types/CardDataType";
import { useNavigate } from "react-router-dom";

const DeckListContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  justify-content: center;
  align-items: center;

  gap: 1%;

  width: 100%;
  height: 100%;
`;

const DeckContainer = styled("div")`
  position: relative;

  width: 100%;
  height: 100%;

  cursor: pointer;
`;

const DeckBox = styled("img")`
  width: 100%;
  height: 100%;
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
    <DeckListContainer>
      {totalDecks.map((deck) => (
        <DeckContainer
          onMouseOver={() => handleOnMouseOver(deck)}
          onMouseLeave={handleOnMouseLeave}
          onClick={() => handleClickDeck(deck.eng)}
        >
          <DeckBox src="/Images/Sky_Striker/레이.webp" alt={deck.name} />
          {onMouseDeck === deck && <DeckName>{deck.name}</DeckName>}
        </DeckContainer>
      ))}
    </DeckListContainer>
  );
};

export default MainPage;
