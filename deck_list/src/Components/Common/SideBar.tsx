import styled from "@emotion/styled";
import { totalDeckType } from "../../Types/CardDataType";
import { totalDecks } from "../../Decks/Index";
import { useState } from "react";

const Hamburger = styled("img")`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;

  top: 0;
  right: 0;

  width: 4vw;
  height: 4vw;

  padding: 1vw;

  z-index: 1000;

  object-fit: contain;
  cursor: pointer;

  @media (max-width: 1200px) {
    width: 7vw;
    height: 7vw;
  }
  @media (max-width: 768px) {
    width: 10vw;
    height: 10vw;
  }
`;

const SideBarContainer = styled("div")`
  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  overflow: hidden;
`;

const SideBarBox = styled("div")<{ isOpening: boolean }>`
  position: absolute;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  font-size: 3vw;
  font-weight: bold;
  color: black;
  text-shadow: none;

  background-color: white;

  top: 0;
  right: 0;

  width: 30vw;
  height: 100%;
  min-height: 100vh;

  box-shadow: -1px 0 20px white;

  padding: 2vw;

  overflow: hidden;

  z-index: 1000;

  @media (max-width: 1200px) {
    width: 50vw;
  }
  @media (max-width: 768px) {
    width: 70vw;
  }

  animation: ${(props) =>
    props.isOpening
      ? `slideIn 300ms linear forwards`
      : `slideOut 300ms linear forwards`};

  @keyframes slideIn {
    0% {
      right: -50%;
    }
    100% {
      right: 0;
    }
  }

  @keyframes slideOut {
    0% {
      right: 0;
    }
    100% {
      right: -50%;
    }
  }
`;

const BackGround = styled("div")`
  position: fixed;
  top: 0;
  left: 0;

  background-color: black;
  opacity: 0.8;

  width: 100vw;
  height: 100vh;

  z-index: 500;
`;

const TopBox = styled("div")`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 100%;

  cursor: pointer;
`;

const CloseButton = styled("div")`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  font-size: 2vw;
  font-weight: bold;
  color: black;
  text-shadow: none;

  transition: transform 100ms linear;

  :hover {
    transform: scale(1.2);
  }
`;

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(true);

  const handleOpenSidebar = () => {
    setIsOpening(true);
    setIsOpen(true);
  };
  const handleCloseSidebar = () => {
    setIsOpening(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 290);
  };

  if (!isOpen) {
    return (
      <Hamburger
        src="/Icons/hamburger.svg"
        alt="햄버거"
        onClick={handleOpenSidebar}
      />
    );
  }

  return (
    <>
      <SideBarContainer>
        <SideBarBox isOpening={isOpening}>
          <TopBox>
            <CloseButton onClick={handleCloseSidebar}>X</CloseButton>
          </TopBox>
        </SideBarBox>
        <BackGround onClick={handleCloseSidebar} />
      </SideBarContainer>
    </>
  );
};

export default SideBar;
