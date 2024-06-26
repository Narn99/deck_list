// 카드들을 나열
// 카드 이미지, 이름, 레어도가 들어간 object를 배열로 받아서 그리드로 순서대로 보여줌
// 메인 덱은 몬스터, 마법, 함정 순으로 보여주고, 엑스트라 덱은 융합, 싱크로, 엑시즈, 링크 순서로 보여줄 것
// 덱 리스트에서 레어도가 높은 것, 매수가 많은 것, 이름 순서로 정렬되도록 할 것
// grade가 낮은 것부터 높은 순으로 보여줄 것 (몇 레벨, 몇 링크)
// 한 줄에 10장, 클릭하면 모달이 뜨고 모달창에선 카드 돌려보기 css로

import Card from "./Card";
import CardModal from "./CardModal";
import { CardType } from "../../Types/CardDataType";
import styled from "@emotion/styled";
import { useState } from "react";

const CardListContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(10, 1fr);

  gap: 0.5vw;

  background-color: rgba(255, 255, 255, 0.2);

  border-radius: 10px;
  box-shadow: 0 0 10px white;

  padding: 10px;

  width: 100%;
  height: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(8, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const CardBox = styled("div")`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  transition: transform 100ms linear;

  cursor: pointer;

  :hover {
    transform: scale(1.2);

    z-index: 2000;
  }
`;

const CardNameBox = styled("div")`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  top: 0;
  left: 0;

  font-size: 1.1vw;
  font-weight: bold;
  color: white;

  text-shadow: -1px 0 4px rgba(0, 0, 0), 1px 0 4px rgba(0, 0, 0),
    0 1px 4px rgba(0, 0, 0), 0 -1px 4px rgba(0, 0, 0);
  text-align: center;

  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: 1px 0 10px rgba(170, 230, 255), -1px 0 10px rgba(170, 230, 255),
    0 1px 10px rgba(170, 230, 255), 0 -1px 10px rgba(170, 230, 255);

  width: 100%;
  height: 100%;

  padding: 0 1vw 0 1vw;

  z-index: 200;

  white-space: pre-line;

  box-sizing: border-box;

  @media (max-width: 1200px) {
    font-size: 2.2vw;
  }

  @media (max-width: 768px) {
    font-size: 3.3vw;
  }
`;

const CardList = ({ deckCards }: { deckCards: CardType[] }) => {
  const deckList: CardType[] = deckCards.flatMap((card) => {
    if (typeof card.quantity !== "number" || card.quantity <= 0) {
      return []; // Skip if quantity is not a valid number or is less than or equal to 0
    }
    return Array.from({ length: card.quantity }, () => card);
  });

  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [onHover, setOnHover] = useState<string>("");
  const [cardPosition, setCardPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [cardScale, setCardScale] = useState({ width: 0, height: 0 });

  const handleCardImage = (
    card: CardType,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const { top, left } = e.currentTarget.getBoundingClientRect();
    setCardPosition({
      top: top + cardScale.height / 2,
      left: left + cardScale.width / 2,
    });
    setSelectedCard(card);
  };

  const handleModal = () => {
    setSelectedCard(null);
    setCardPosition(null);
  };

  const spaceToEnter = (text: string) => {
    return text.replace(/ /g, "\n");
  };

  return (
    <CardListContainer>
      {deckList.map((card, idx) => (
        <CardBox
          key={`card-${idx}`}
          onMouseOver={() => setOnHover(`${card.name}-${idx}`)}
          onMouseLeave={() => setOnHover("")}
          onClick={(e) => handleCardImage(card, e)}
        >
          <Card
            cardData={card}
            setCardScale={setCardScale}
            inModal={onHover === `${card.name}-${idx}`}
          />
          {onHover === `${card.name}-${idx}` && (
            <CardNameBox>{spaceToEnter(card.name)}</CardNameBox>
          )}
        </CardBox>
      ))}
      {selectedCard && cardPosition && (
        <CardModal
          cardData={selectedCard}
          cardPosition={cardPosition}
          cardWidth={cardScale.width}
          onClose={handleModal}
        />
      )}
    </CardListContainer>
  );
};

export default CardList;
