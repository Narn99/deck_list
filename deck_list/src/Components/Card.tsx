// 카드 이미지를 불러와서 CSS를 적용

import styled from "@emotion/styled";
import { CardType } from "../Types/CardDataType";
import React from "react";

const CardContainer = styled("div")`
  align-items: center;
  justify-content: center;

  width: 20%;
  height: 20%;
`;

const CardImageBox = styled("img")`
  width: 100%;
  height: 100%;

  z-index: 1;
`;

const CSSBox = styled("div")`
  width: 100%;
  height: 100%;

  z-index: 100;
`;

const Card = ({ cardData }: { cardData: CardType }) => {
  const {
    name,
    img_url,
    type,
    grade = 1,
    extra = undefined,
    rare = "normal",
    quantity,
  } = cardData;

  return (
    <CardContainer>
      <CardImageBox src={img_url} alt={name} />
      <CSSBox className={rare} />
    </CardContainer>
  );
};

export default Card;
