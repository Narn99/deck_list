// 카드를 클릭 시, 확대해서 보여주는 모달

import styled from "@emotion/styled";

const ModalContainer = styled("div")`
  width: 50vw;

  z-index: 5000;
`;

const ModalBackground = styled("div")`
  position: absolute;

  background-color: black;
  opacity: 0.4;

  width: 100vw;
  height: 100vh;

  z-index: 4000;
`;

const Card_Modal = () => {
  return (
    <>
      <ModalContainer></ModalContainer>
      <ModalBackground />
    </>
  );
};

export default Card_Modal;
