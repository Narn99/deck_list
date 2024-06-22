// 카드 이미지를 불러와서 CSS를 적용

import styled from "@emotion/styled";
import { CardProps } from "../../Types/CardDataType";
import Rare from "../../CSS/Rare";
import { useEffect, useRef } from "react";

const CardContainer = styled("div")<{ inModal: boolean }>`
  display: flex;
  position: relative;

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
    // 컴포넌트가 마운트된 후, 카드의 너비 측정
    if (setCardScale && cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth;
      const cardHeight = cardRef.current.offsetHeight;

      setCardScale({ width: cardWidth, height: cardHeight });
      // 여기서 다른 로직에 사용하거나 상태로 저장할 수 있음
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
