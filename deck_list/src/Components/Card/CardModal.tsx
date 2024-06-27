// 카드를 클릭 시, 확대해서 보여주는 모달

import { useEffect, useState } from "react";

import Card from "./Card";
import { CardType } from "../../Types/CardDataType";
import styled from "@emotion/styled";

// 카드 회전하는 애니메이션용 뒷면 이미지

const backface: CardType = {
  name: "뒷면",
  img_url: "/Images/Common/Back/뒷면.webp",
  type: "monster",
  quantity: 1,
};

// Styled

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

  backface-visibility: hidden;

  z-index: 5000;

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

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  z-index: 4500;

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

  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;

  opacity: 0.8;
  background-color: black;

  z-index: 4000;
`;

// Component

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
  // usestate
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // 마우스가 모달에서 나갈 시, 천천히 원상태로 복귀
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isLeaving) {
      intervalId = setInterval(() => {
        // 회전 각도를 서서히 줄여나감
        setRotationX((prevX) => prevX * 0.9);
        setRotationY((prevY) => prevY * 0.9);

        // 회전 각도가 충분히 작아지면 clearInterval 호출하여 처음 상태로 만들고 중지
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

  // 마우스 이동 좌표 감지 함수
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // 카드 원상태로 복귀 중에 마우스가 다시 들어오면 복귀하던 것 중지
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

  // 모달 종료 함수
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
        onMouseLeave={() => setIsLeaving(true)}
      >
        <Card
          cardData={cardData}
          rotationX={rotationX}
          rotationY={rotationY}
          onCardClick={handleOnClose}
          inModal
        />
      </ModalContainer>
      <CardBackBox
        startX={cardPosition.left}
        startY={cardPosition.top}
        cardWidth={cardWidth}
        isClosing={isClosing}
      >
        <Card cardData={backface} inModal />
      </CardBackBox>
      <ModalBackground onClick={handleOnClose} />
    </>
  );
};

export default CardModal;
