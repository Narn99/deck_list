// 카드를 클릭 시, 확대해서 보여주는 모달

import styled from "@emotion/styled";
import Card from "./Card";
import { CardType } from "../../Types/CardDataType";
import { useEffect, useState } from "react";

const backface: CardType = {
  name: "뒷면",
  img_url: "/Images/Common/Back/뒷면.webp",
  type: "monster",
  quantity: 1,
};

const ModalContainer = styled("div")<{
  rotationX: number;
  rotationY: number;
  startX: number;
  startY: number;
  cardWidth: number;
  isClosing: boolean;
}>`
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 25vw;

  top: 50%;
  left: 50%;
  transform: perspective(80rem) translate(-50%, -50%)
    rotateX(${(props) => props.rotationX}deg)
    rotateY(${(props) => props.rotationY}deg);

  z-index: 5000;

  backface-visibility: hidden;

  animation: ${(props) =>
    !props.isClosing
      ? `moveAndRotate 500ms linear`
      : `closeAndRotate 500ms linear`};

  @keyframes moveAndRotate {
    0% {
      width: ${(props) => `${props.cardWidth}px`};
      top: ${({ startY }) => `${startY}px`};
      left: ${({ startX }) => `${startX}px`};
      transform: translate(-50%, -50%) rotateY(180deg);
    }
    100% {
      width: 25vw;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotateY(900deg);
    }
  }

  @keyframes closeAndRotate {
    0% {
      width: 25vw;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotateY(180deg);
    }
    100% {
      width: ${(props) => `${props.cardWidth}px`};
      top: ${({ startY }) => `${startY}px`};
      left: ${({ startX }) => `${startX}px`};
      transform: translate(-50%, -50%) rotateY(900deg);
    }
  }

  @media screen and (max-width: 1300px) {
    width: 35vw; /* 태블릿 화면 */
  }

  @media screen and (max-width: 1000px) {
    width: 50vw; /* 태블릿 화면 */
  }

  @media screen and (max-width: 480px) {
    width: 75vw; /* 모바일 화면 */
  }
`;

const CardBackBox = styled("div")<{
  startX: number;
  startY: number;
  cardWidth: number;
  isClosing: boolean;
}>`
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;

  /* width: 25vw; */

  top: 50%;
  left: 50%;

  z-index: 4900;

  /* backface-visibility: hidden; */

  animation: ${(props) =>
    !props.isClosing
      ? `moveAndRotate 500ms linear`
      : `closeAndRotate 500ms linear`};

  @keyframes moveAndRotate {
    0% {
      width: ${(props) => `${props.cardWidth}px`};
      top: ${({ startY }) => `${startY}px`};
      left: ${({ startX }) => `${startX}px`};
      transform: translate(-50%, -50%) rotateY(0deg);
    }
    100% {
      width: 25vw;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotateY(720deg);
    }
  }

  @keyframes closeAndRotate {
    0% {
      width: 25vw;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotateY(0deg);
    }
    100% {
      width: ${(props) => `${props.cardWidth}px`};
      top: ${({ startY }) => `${startY}px`};
      left: ${({ startX }) => `${startX}px`};
      transform: translate(-50%, -50%) rotateY(720deg);
    }
  }

  @media screen and (max-width: 1300px) {
    width: 35vw; /* 태블릿 화면 */
  }

  @media screen and (max-width: 1000px) {
    width: 50vw; /* 태블릿 화면 */
  }

  @media screen and (max-width: 480px) {
    width: 75vw; /* 모바일 화면 */
  }
`;

const ModalBackground = styled("div")`
  position: fixed;
  top: 0;
  left: 0;

  background-color: black;
  opacity: 0.8;

  width: 100vw;
  height: 100vh;

  z-index: 4000;
`;

const CardModal = ({
  cardData,
  cardPosition,
  cardWidth,
  onClose,
}: {
  cardData: CardType;
  cardPosition: { top: number; left: number };
  cardWidth: number;
  onClose: () => void;
}) => {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // 마우스가 모달을 떠날 때 회전 애니메이션이 완만하게 멈추도록 처리
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isLeaving) {
      intervalId = setInterval(() => {
        // 회전 각도를 서서히 줄여나감
        setRotationX((prevX) => prevX * 0.9);
        setRotationY((prevY) => prevY * 0.9);

        // 회전 각도가 충분히 작아지면 clearInterval 호출
        if (Math.abs(rotationX) < 1 && Math.abs(rotationY) < 1) {
          clearInterval(intervalId);
          setRotationX(0);
          setRotationY(0);
          setIsLeaving(false);
        }
      }, 10); // 10ms 간격으로 반복 실행
    }

    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트될 때 clearInterval
    };
  }, [isLeaving, rotationX, rotationY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLeaving) {
      setIsLeaving(false);
    }

    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left - width / 2;
    const y = clientY - top - height / 2;

    setRotationX((y / height) * 50);
    setRotationY((x / width) * -50);
  };

  const handleMouseLeave = () => {
    setIsLeaving(true);
  };

  const handleOnClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 470);
  };

  return (
    <>
      <ModalContainer
        rotationX={rotationX}
        rotationY={rotationY}
        startX={cardPosition.left}
        startY={cardPosition.top}
        cardWidth={cardWidth}
        isClosing={isClosing}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Card
          cardData={cardData}
          rotationX={rotationX}
          rotationY={rotationY}
          onCardClick={handleOnClose}
        />
      </ModalContainer>
      <CardBackBox
        startX={cardPosition.left}
        startY={cardPosition.top}
        cardWidth={cardWidth}
        isClosing={isClosing}
      >
        <Card cardData={backface} />
      </CardBackBox>
      <ModalBackground onClick={handleOnClose} />
    </>
  );
};

export default CardModal;
