// 카드 이미지를 불러와서 CSS를 적용

import { useEffect, useRef } from "react";

import { CardProps } from "../../Types/CardDataType";
import Rare from "../../CSS/Rare";
import styled from "@emotion/styled";

// Styled

const CardContainer = styled("div")<{ inModal: boolean }>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  box-shadow: 5px 5px 10px black;
  opacity: ${(props) => (props.inModal ? 1 : 0.85)};
`;

const CardImageBox = styled("img")`
  width: 100%;
  height: 100%;

  z-index: 1;
`;

// Component

const Card = ({
  cardData,
  onCardClick,
  rotationX = 0,
  rotationY = 0,
  setCardScale,
  inModal,
}: CardProps) => {
  const {
    name,
    img_url,
    type,
    grade = 1,
    extra = undefined,
    rare = "normal",
  } = cardData;

  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 컴포넌트 마운트 시, 카드 크기 측정하고 저장
    if (setCardScale && cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth;
      const cardHeight = cardRef.current.offsetHeight;

      setCardScale({ width: cardWidth, height: cardHeight });
    }
  }, [setCardScale]);

  return (
    <CardContainer
      ref={cardRef}
      onClick={(e) => onCardClick && onCardClick(e)}
      inModal={inModal}
    >
      <CardImageBox src={img_url} alt={name} />
      <Rare
        rare={rare}
        type={type}
        extra={extra}
        level={grade}
        rotationX={rotationX}
        rotationY={rotationY}
      />
    </CardContainer>
  );
};

export default Card;
