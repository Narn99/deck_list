import { Fragment, useState } from "react";

import styled from "@emotion/styled";
import { totalDecks } from "../../Decks/Index";
import { useNavigate } from "react-router-dom";

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

  overflow-x: hidden;
`;

const SideBarBox = styled("div")<{ isOpening: boolean }>`
  position: absolute;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  font-size: 3vw;
  font-weight: bold;
  color: black;
  text-shadow: none;

  background-color: white;

  top: 0;
  right: 0;

  width: 40vw;
  height: 100%;
  min-height: 100vh;

  box-shadow: -1px 0 20px white;
  box-sizing: border-box;

  padding: 2vw;

  overflow-y: hidden;
  overflow-y: scroll;

  z-index: 1000;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  :-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  @media (max-width: 1200px) {
    width: 50vw;
  }
  @media (max-width: 768px) {
    width: 60vw;
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
  justify-content: space-between;

  width: 100%;

  padding: 0 1vw 0 1vw;

  box-sizing: border-box;
`;

const ButtonBox = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;

  object-fit: contain;

  transition: transform 100ms linear;

  cursor: pointer;

  :hover {
    transform: scale(1.1);
  }
`;

const Button = styled("img")`
  width: 3vw;

  object-fit: contain;

  @media (max-width: 1200px) {
    width: 6vw;
  }
  @media (max-width: 768px) {
    width: 9vw;
  }
`;

const TabContainer = styled("div")`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  gap: 1vw;

  padding: 4vh 0 4vh 0;

  width: 100%;
  height: 100%;
`;

const TabBox = styled("div")<{ isSelected: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  font-size: 2vw;

  background-color: ${(props) => props.isSelected && "#60b1d6"};

  width: 100%;

  padding: 1vh 2vw 1vh 2vw;

  border-radius: 10px;

  box-sizing: border-box;

  cursor: pointer;

  transition: transform 100ms linear;

  :hover {
    transform: scale(1.03);

    background-color: ${(props) => !props.isSelected && "#c8eeff"};
  }

  @media (max-width: 1200px) {
    font-size: 4vw;
  }
  @media (max-width: 768px) {
    font-size: 6vw;
  }
`;

const SubTabBox = styled("div")`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  font-size: 1.2vw;

  width: 100%;

  padding: 0.5vh 2vw 0.5vh 2vw;

  border-radius: 10px;

  box-sizing: border-box;

  cursor: pointer;

  transition: transform 100ms linear;

  :hover {
    transform: scale(1.03);

    background-color: #c8eeff;
  }

  @media (max-width: 1200px) {
    font-size: 3vw;
  }
  @media (max-width: 768px) {
    font-size: 4.5vw;
  }
`;

const SideBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpening, setIsOpening] = useState<boolean>(true);
  const [isSelected, setIsSelected] = useState<string>("");

  const navigate = useNavigate();

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

  const TabList = [
    { title: "덱 리스트", sub: totalDecks },
    { title: "빈 칸" },
    { title: "빈 칸" },
    { title: "빈 칸" },
  ];

  return (
    <>
      <SideBarContainer>
        <SideBarBox isOpening={isOpening}>
          <TopBox>
            <ButtonBox
              onClick={() => {
                navigate("/");
                handleCloseSidebar();
              }}
            >
              <Button src="/Icons/home.svg" alt="메인으로" />
            </ButtonBox>
            <ButtonBox onClick={handleCloseSidebar}>
              <Button src="/Icons/Exit.svg" alt="닫기" />
            </ButtonBox>
          </TopBox>
          <TabContainer>
            {TabList.map((tab, idx) => (
              <Fragment key={`${tab}-${idx}`}>
                <TabBox
                  onClick={() => {
                    if (`tab-${idx}` === isSelected) {
                      setIsSelected("");
                    } else {
                      setIsSelected(`tab-${idx}`);
                    }
                  }}
                  isSelected={`tab-${idx}` === isSelected}
                >
                  {tab.title}
                </TabBox>
                {`tab-${idx}` === isSelected &&
                  tab.sub?.map((subtab, idx) => (
                    <SubTabBox
                      key={`${subtab}-${idx}`}
                      onClick={() => {
                        navigate(`/deck/${subtab.eng}`);
                        handleCloseSidebar();
                      }}
                    >
                      {subtab.name}
                    </SubTabBox>
                  ))}
              </Fragment>
            ))}
          </TabContainer>
        </SideBarBox>
        <BackGround onClick={handleCloseSidebar} />
      </SideBarContainer>
    </>
  );
};

export default SideBar;
