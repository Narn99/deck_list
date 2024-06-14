// 카드를 클릭 시, 확대해서 보여주는 모달

import styled from "@emotion/styled";
import Card from "./Card";
import { CardProps } from "../Types/CardDataType";
import { keyframes } from "@emotion/css";

const modalFadein = keyframes`
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
`;

const ModalContainer = styled("div")`
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 25vw;

  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  z-index: 5000;

  animation: ${modalFadein} 0.3s ease-in-out forwards;
`;

const ModalBackground = styled("div")`
  position: fixed;

  background-color: black;
  opacity: 0.8;

  width: 100vw;
  height: 100vh;

  z-index: 4000;
`;

const CardModal = ({ cardData, onCardClick }: CardProps) => {
  return (
    <>
      <ModalContainer>
        <Card cardData={cardData} onCardClick={onCardClick} />
      </ModalContainer>
      <ModalBackground />
    </>
  );
};

export default CardModal;
