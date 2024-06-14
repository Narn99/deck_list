// 카드 이미지를 불러와서 CSS를 적용

import styled from "@emotion/styled";
import { CardProps } from "../Types/CardDataType";
import Rare from "../CSS/Rare";

const CardContainer = styled("div")`
  display: flex;
  position: relative;

  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
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
}: CardProps) => {
  const {
    name,
    img_url,
    type,
    grade = 1,
    extra = undefined,
    rare = "normal",
  } = cardData;

  return (
    <CardContainer onClick={onCardClick}>
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
