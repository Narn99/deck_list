import { Fragment, useState } from "react";

import styled from "@emotion/styled";
import { totalDecks } from "../../Cards/Index";
import { useNavigate } from "react-router-dom";

// Styled

const Hamburger = styled("img")`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 4vw;
  height: 4vw;
  top: 0;
  right: 0;

  margin: 1vw;

  object-fit: contain;

  color: white;

  cursor: pointer;

  z-index: 1000;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  :hover {
    transform: scale(1.05);
  }

  :active {
    transform: scale(1.025);
  }

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

  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  overflow-x: hidden;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const SideBarBox = styled("div")<{ isOpening: boolean }>`
  position: absolute;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  width: 40vw;
  height: 100%;
  min-height: 100vh;
  top: 0;
  right: 0;

  background-color: white;

  padding: 2vw;
  box-sizing: border-box;
  box-shadow: -1px 0 20px white;

  font-size: 3vw;
  font-weight: bold;
  text-shadow: none;
  color: black;

  overflow-y: hidden;
  overflow-y: scroll;

  z-index: 1000;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  :-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
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

  @media (max-width: 1200px) {
    width: 50vw;
  }
  @media (max-width: 768px) {
    width: 60vw;
  }
`;

const BackGround = styled("div")`
  position: fixed;

  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;

  opacity: 0.8;
  background-color: black;

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

  cursor: pointer;

  object-fit: contain;

  transition: transform 100ms linear;

  :hover {
    transform: scale(1.1);
  }

  :active {
    transform: scale(1.05);
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

  width: 100%;
  height: 100%;

  gap: 1vw;

  padding: 4vh 0 4vh 0;
`;

const TabBox = styled("div")<{ isSelected: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 100%;

  border-radius: 10px;

  background-color: ${(props) => props.isSelected && "#60b1d6"};

  padding: 1vh 2vw 1vh 2vw;
  box-sizing: border-box;

  font-size: 2vw;

  cursor: pointer;

  transition: transform 100ms linear;

  :hover {
    transform: scale(1.03);

    background-color: ${(props) => !props.isSelected && "#c8eeff"};
  }

  :active {
    transform: scale(1.01);
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

  width: 100%;

  border-radius: 10px;

  padding: 0.5vh 2vw 0.5vh 2vw;
  box-sizing: border-box;

  font-size: 1.2vw;

  cursor: pointer;

  transition: transform 100ms linear;

  :hover {
    transform: scale(1.03);

    background-color: #ffe3c8;
  }

  :active {
    transform: scale(1.01);
  }

  @media (max-width: 1200px) {
    font-size: 3vw;
  }
  @media (max-width: 768px) {
    font-size: 4.5vw;
  }
`;

// Component

const SideBar = () => {
  // usestate
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpening, setIsOpening] = useState<boolean>(true);
  const [isSelected, setIsSelected] = useState<string>("");

  const navigate = useNavigate();

  // 탭 리스트  { title : 탭 제목, sub? : 서브 목록}
  const TabList = [{ title: "덱 리스트", sub: totalDecks }];

  // 사이드바 여는 함수
  const handleOpenSidebar = () => {
    setIsOpening(true);
    setIsOpen(true);
  };

  // 사이드바 닫는 함수
  const handleCloseSidebar = () => {
    setIsOpening(false);
    setIsSelected("");
    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  };

  // isOpen이 false일 시, 햄버거 버튼 표시
  if (!isOpen) {
    return (
      <Hamburger
        src="/Icons/hamburger.svg"
        alt="햄버거"
        onClick={handleOpenSidebar}
      />
    );
  }

  // isOepn이 true일 시, 사이드바 표시
  else {
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
  }
};

export default SideBar;
