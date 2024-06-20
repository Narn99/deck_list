// 카드들을 나열
// 카드 이미지, 이름, 레어도가 들어간 object를 배열로 받아서 그리드로 순서대로 보여줌
// 메인 덱은 몬스터, 마법, 함정 순으로 보여주고, 엑스트라 덱은 융합, 싱크로, 엑시즈, 링크 순서로 보여줄 것
// 덱 리스트에서 레어도가 높은 것, 매수가 많은 것, 이름 순서로 정렬되도록 할 것
// grade가 낮은 것부터 높은 순으로 보여줄 것 (몇 레벨, 몇 링크)
// 한 줄에 10장, 클릭하면 모달이 뜨고 모달창에선 카드 돌려보기 css로

import styled from "@emotion/styled";
import { CardType } from "../../Types/CardDataType";
import Card from "./Card";
import CardModal from "./CardModal";
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
`;

const CardList = ({ deckCards }: { deckCards: CardType[] }) => {
  const deckList = deckCards.flatMap((card) =>
    Array.from({ length: card.quantity }, () => card)
  );

  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
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

  return (
    <CardListContainer>
      {deckList.map((card, idx) => (
        <Card
          cardData={card}
          key={`card-${idx}`}
          setCardScale={setCardScale}
          onCardClick={(e) => handleCardImage(card, e)}
        />
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
