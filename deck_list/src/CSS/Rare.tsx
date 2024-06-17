/* 
 시크릿, 울레, 슈레, 레어, 테두리까지인 시크릿 반짝반짝
 근데 이름 칸은 반짝이게 하기가 힘들잖아...

 레어도별 컴포넌트를 만들어서 export 하자

 모달 */

import { css } from "@emotion/react";
import styled from "@emotion/styled";

const OuterContainer = styled("div")`
  position: absolute;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  opacity: 0.5;

  width: 100%;
  height: 100%;

  z-index: 1000;
`;

const EntireCard = styled("div")<{
  rare: "normal" | "rare" | "super" | "ultra" | "secret" | "cross";
  rotation: number;
  rotationX: number;
  rotationY: number;
}>`
  position: absolute;

  ${(props) =>
    props.rare === "cross" &&
    css`
      background: linear-gradient(
          90deg,
          transparent 40%,
          rgba(255, 244, 148, 0.25) 45%,
          rgba(244, 157, 255, 0.25) 50%,
          rgba(136, 184, 255, 0.25) 50%,
          transparent 54%
        ),
        linear-gradient(
          90deg,
          transparent 40%,
          rgba(255, 244, 148, 0.25) 45%,
          rgba(244, 157, 255, 0.25) 50%,
          rgba(136, 184, 255, 0.25) 50%,
          transparent 54%
        ),
        linear-gradient(
          90deg,
          transparent 40%,
          rgba(255, 244, 148, 0.25) 45%,
          rgba(244, 157, 255, 0.25) 50%,
          rgba(136, 184, 255, 0.25) 50%,
          transparent 54%
        ),
        linear-gradient(
          90deg,
          transparent 40%,
          rgba(255, 244, 148, 0.25) 45%,
          rgba(244, 157, 255, 0.25) 50%,
          rgba(136, 184, 255, 0.25) 50%,
          transparent 54%
        ),
        linear-gradient(
          0deg,
          transparent 40%,
          rgba(255, 244, 148, 0.25) 45%,
          rgba(244, 157, 255, 0.25) 50%,
          rgba(136, 184, 255, 0.25) 50%,
          transparent 54%
        ),
        linear-gradient(
          0deg,
          transparent 40%,
          rgba(255, 244, 148, 0.25) 45%,
          rgba(244, 157, 255, 0.25) 50%,
          rgba(136, 184, 255, 0.25) 50%,
          transparent 54%
        ),
        linear-gradient(
          0deg,
          transparent 40%,
          rgba(255, 244, 148, 0.25) 45%,
          rgba(244, 157, 255, 0.25) 50%,
          rgba(136, 184, 255, 0.25) 50%,
          transparent 54%
        ),
        linear-gradient(
          0deg,
          transparent 40%,
          rgba(255, 244, 148, 0.25) 45%,
          rgba(244, 157, 255, 0.25) 50%,
          rgba(136, 184, 255, 0.25) 50%,
          transparent 54%
        );

      filter: blur(1.2) brightness(1.1) opacity(0.6);
      mix-blend-mode: color-dodge;

      background-size: 150% 150%, 150% 150%, 150% 150%, 150% 150%, 150% 150%,
        150% 150%, 150% 150%, 150% 150%, 150% 150%, 150% 150%;
      background-position: ${props.rotationY - 75}%, ${props.rotationY}%,
        ${props.rotationY + 75}%, ${props.rotationY + 150}%,
        0 ${props.rotationX - 75}%, 0 ${props.rotationX}%,
        0 ${props.rotationX + 75}%, 0 ${props.rotationX + 150}%;
    `}

  ${(props) =>
    props.rare === "rare" &&
    css`
      background: linear-gradient(
          105deg,
          transparent 40%,
          rgba(255, 244, 148, 0.2) 45%,
          rgba(194, 153, 255, 0.2) 50%,
          rgba(255, 136, 121, 0.2) 50%,
          transparent 54%
        ),
        linear-gradient(
          105deg,
          transparent 40%,
          rgba(255, 244, 148, 0.2) 45%,
          rgba(194, 153, 255, 0.2) 50%,
          rgba(255, 136, 121, 0.2) 50%,
          transparent 54%
        ),
        linear-gradient(
          105deg,
          transparent 40%,
          rgba(255, 244, 148, 0.2) 45%,
          rgba(194, 153, 255, 0.2) 50%,
          rgba(255, 136, 121, 0.2) 50%,
          transparent 54%
        ),
        linear-gradient(
          105deg,
          transparent 40%,
          rgba(255, 244, 148, 0.2) 45%,
          rgba(194, 153, 255, 0.2) 50%,
          rgba(255, 136, 121, 0.2) 50%,
          transparent 54%
        ),
        linear-gradient(
          105deg,
          transparent 40%,
          rgba(255, 244, 148, 0.2) 45%,
          rgba(194, 153, 255, 0.2) 50%,
          rgba(255, 136, 121, 0.2) 50%,
          transparent 54%
        );

      filter: blur(1.2) brightness(1.1) opacity(0.6);
      mix-blend-mode: color-dodge;

      background-size: 130% 200%, 130% 200%, 130% 200%, 130% 200%, 130% 200%;

      background-position: ${props.rotation - 200}%, ${props.rotation - 100}%,
        ${props.rotation + 0}%, ${props.rotation + 100}%,
        ${props.rotation + 200}%;
    `}


    ${(props) =>
    props.rare !== "rare" &&
    props.rare !== "cross" &&
    css`
      background: linear-gradient(
          105deg,
          transparent 40%,
          rgba(255, 255, 255, 0.2) 45%,
          transparent 54%
        ),
        linear-gradient(
          105deg,
          transparent 40%,
          rgba(255, 255, 255, 0.2) 45%,

          transparent 54%
        ),
        linear-gradient(
          105deg,
          transparent 40%,
          rgba(255, 255, 255, 0.2) 45%,

          transparent 54%
        );

      filter: blur(1.2) brightness(2) opacity(0.6);
      mix-blend-mode: color-dodge;

      background-size: 120% 200%, 120% 200%, 120% 200%;

      background-position: ${props.rotation - 220}%, ${props.rotation + 0}%,
        ${props.rotation + 220}%;
    `}

  

  display: flex;
  justify-content: center;
  align-items: center;

  width: 96%;
  height: 97%;

  z-index: 1200;
`;

const XBorder = styled("div")<{
  border: boolean;
  rotationY: number;
}>`
  ${(props) =>
    props.border &&
    css`
      background: linear-gradient(
          90deg,
          transparent 40%,
          rgba(255, 244, 148, 0.5) 45%,
          rgba(194, 153, 255, 0.5) 50%,
          rgba(255, 136, 121, 0.5) 50%,
          transparent 54%
        ),
        linear-gradient(
          90deg,
          transparent 40%,
          rgba(255, 244, 148, 0.5) 45%,
          rgba(194, 153, 255, 0.5) 50%,
          rgba(255, 136, 121, 0.5) 50%,
          transparent 54%
        ),
        linear-gradient(
          90deg,
          transparent 40%,
          rgba(255, 244, 148, 0.5) 45%,
          rgba(194, 153, 255, 0.5) 50%,
          rgba(255, 136, 121, 0.5) 50%,
          transparent 54%
        ),
        linear-gradient(
          90deg,
          transparent 40%,
          rgba(255, 244, 148, 0.5) 45%,
          rgba(194, 153, 255, 0.5) 50%,
          rgba(255, 136, 121, 0.5) 50%,
          transparent 54%
        );

      filter: blur(1.2) brightness(1.1) opacity(0.6);
      mix-blend-mode: color-dodge;

      background-size: 40% 5%, 40% 5%, 40% 5%, 40% 5%;

      background-position: ${props.rotationY - 75}%, ${props.rotationY - 25}%,
        ${props.rotationY + 25}%, ${props.rotationY + 75}%;
    `}

  width: 100%;
  height: 1.25%;
`;

const MidContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const YBorder = styled("div")<{
  border: boolean;
  rotationX: number;
}>`
  ${(props) =>
    props.border &&
    css`
      background: linear-gradient(
          0deg,
          transparent 40%,
          rgba(255, 244, 148, 0.5) 45%,
          rgba(194, 153, 255, 0.5) 50%,
          rgba(255, 136, 121, 0.5) 50%,
          transparent 54%
        ),
        linear-gradient(
          0deg,
          transparent 40%,
          rgba(255, 244, 148, 0.5) 45%,
          rgba(194, 153, 255, 0.5) 50%,
          rgba(255, 136, 121, 0.5) 50%,
          transparent 54%
        ),
        linear-gradient(
          0deg,
          transparent 40%,
          rgba(255, 244, 148, 0.5) 45%,
          rgba(194, 153, 255, 0.5) 50%,
          rgba(255, 136, 121, 0.5) 50%,
          transparent 54%
        ),
        linear-gradient(
          0deg,
          transparent 40%,
          rgba(255, 244, 148, 0.5) 45%,
          rgba(194, 153, 255, 0.5) 50%,
          rgba(255, 136, 121, 0.5) 50%,
          transparent 54%
        );

      filter: blur(1.2) brightness(1.1) opacity(0.6);
      mix-blend-mode: color-dodge;

      background-size: 5% 40%, 5% 40%, 5% 40%, 5% 40%;

      background-position: 0 ${props.rotationX - 75}%,
        0 ${props.rotationX - 25}%, 0 ${props.rotationX + 25}%,
        0 ${props.rotationX + 75}%;
    `}

  width: 2%;
  height: 100%;
`;

const InnerContainer = styled("div")`
  display: flex;

  align-items: center;
  flex-direction: column;

  width: 96%;
  height: 100%;
`;

const NameContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 95%;
  height: 7.5%;

  padding-top: 3%;
`;
const NameBox = styled("div")`
  width: 100%;
  height: 100%;
`;
const IconBox = styled("div")<{ icon: boolean; rotation: number }>`
  width: 10%;
  height: 85%;

  margin-right: 2%;
  margin-top: 1%;

  ${(props) =>
    props.icon &&
    css`
      background: linear-gradient(
          120deg,
          transparent 40%,
          rgba(255, 244, 148, 0.8) 45%,
          rgba(194, 153, 255, 0.8) 50%,
          rgba(255, 136, 121, 0.8) 50%,
          transparent 54%
        ),
        linear-gradient(
          120deg,
          transparent 40%,
          rgba(255, 244, 148, 0.8) 45%,
          rgba(194, 153, 255, 0.8) 50%,
          rgba(255, 136, 121, 0.8) 50%,
          transparent 54%
        );

      filter: blur(1.2) brightness(1.1) opacity(0.6);
      mix-blend-mode: color-dodge;

      background-size: 400% 400%, 400% 400%;

      background-position: ${props.rotation - 50}%, ${props.rotation + 50}%;
    `}

  border-radius: 50%;
`;
const GradeBox = styled("div")`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 85%;
  height: 5%;

  padding-top: 1%;
  padding-bottom: 1%;
`;
const LevelBox = styled("div")<{ grade: boolean; rotation: number }>`
  display: flex;

  border-radius: 50%;

  ${(props) =>
    props.grade &&
    css`
      background: linear-gradient(
          120deg,
          transparent 40%,
          rgba(255, 244, 148, 0.8) 45%,
          rgba(194, 153, 255, 0.8) 50%,
          rgba(255, 136, 121, 0.8) 50%,
          transparent 54%
        ),
        linear-gradient(
          120deg,
          transparent 40%,
          rgba(255, 244, 148, 0.8) 45%,
          rgba(194, 153, 255, 0.8) 50%,
          rgba(255, 136, 121, 0.8) 50%,
          transparent 54%
        );

      filter: blur(1.2) brightness(1.1) opacity(0.6);
      mix-blend-mode: color-dodge;

      background-size: 300% 300%, 300% 300%;

      background-position: ${props.rotation - 50}%, ${props.rotation + 50}%;
    `}

  width: 8%;
  margin-left: 0.5%;
  height: 100%;
`;
const ImageBox = styled("div")`
  width: 82%;
  height: 54%;

  padding-top: 2%;
  padding-bottom: 3%;
`;
const CardImage = styled("div")<{
  image: 1 | 2 | 3;
  rotation: number;
}>`
  ${(props) =>
    props.image === 2 &&
    css`
      background: linear-gradient(
          120deg,
          transparent 40%,
          rgba(255, 244, 148, 0.1) 45%,
          rgba(194, 153, 255, 0.1) 50%,
          rgba(255, 136, 121, 0.1) 50%,
          transparent 54%
        ),
        linear-gradient(
          120deg,
          transparent 40%,
          rgba(255, 244, 148, 0.1) 45%,
          rgba(194, 153, 255, 0.1) 50%,
          rgba(255, 136, 121, 0.1) 50%,
          transparent 54%
        ),
        linear-gradient(
          120deg,
          transparent 40%,
          rgba(255, 244, 148, 0.1) 45%,
          rgba(194, 153, 255, 0.1) 50%,
          rgba(255, 136, 121, 0.1) 50%,
          transparent 54%
        ),
        linear-gradient(
          120deg,
          transparent 40%,
          rgba(255, 244, 148, 0.1) 45%,
          rgba(194, 153, 255, 0.1) 50%,
          rgba(255, 136, 121, 0.1) 50%,
          transparent 54%
        );

      filter: blur(1.2) brightness(1.1) opacity(0.6);
      mix-blend-mode: color-dodge;

      background-size: 5% 40%, 5% 40%, 5% 40%, 5% 40%;

      background-position: 0 ${props.rotation - 75}%, 0 ${props.rotation - 25}%,
        0 ${props.rotation + 25}%, 0 ${props.rotation + 75}%;
    `}

  ${(props) =>
    props.image === 1 &&
    css`
      background: linear-gradient(
          105deg,
          transparent 40%,
          rgba(255, 244, 148, 0.5) 45%,
          rgba(194, 153, 255, 0.5) 50%,
          rgba(255, 136, 121, 0.5) 50%,
          transparent 54%
        ),
        linear-gradient(
          105deg,
          transparent 40%,
          rgba(255, 244, 148, 0.5) 45%,
          rgba(194, 153, 255, 0.5) 50%,
          rgba(255, 136, 121, 0.5) 50%,
          transparent 54%
        ),
        linear-gradient(
          105deg,
          transparent 40%,
          rgba(255, 244, 148, 0.5) 45%,
          rgba(194, 153, 255, 0.5) 50%,
          rgba(255, 136, 121, 0.5) 50%,
          transparent 54%
        ),
        linear-gradient(
          105deg,
          transparent 40%,
          rgba(255, 244, 148, 0.5) 45%,
          rgba(194, 153, 255, 0.5) 50%,
          rgba(255, 136, 121, 0.5) 50%,
          transparent 54%
        );

      filter: blur(1.2) brightness(1.1) opacity(0.6);
      mix-blend-mode: color-dodge;

      background-size: 150% 150%, 150% 150%, 150% 150%, 150% 150%;

      background-position: ${props.rotation - 75}%, ${props.rotation}%,
        ${props.rotation + 75}%, ${props.rotation + 150}%;
    `}

  width: 100%;
  height: 100%;
`;

const TextBox = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 96.5%;
  height: 23%;

  padding-left: 0.5%;
  padding-top: 2%;
  padding-bottom: 4%;
`;

const MainText = styled("div")`
  width: 97%;
  height: 90%;

  border-radius: 0.5vw;
`;

const Rare = ({
  rare,
  type,
  level,
  extra,
  rotationX,
  rotationY,
}: {
  rare: "normal" | "rare" | "super" | "ultra" | "secret" | "cross";
  type: "monster" | "magic" | "trap" | "token";
  level: number;
  extra: "fusion" | "synchro" | "xyz" | "link" | undefined;
  rotationX: number;
  rotationY: number;
}) => {
  const border = rare === "secret" || rare === "cross";
  const icon = rare === "ultra" || rare === "secret" || rare === "cross";
  const grade =
    (type === "monster" || type === "token") &&
    (rare === "ultra" || rare === "secret" || rare === "cross");
  const image =
    rare === "super" || rare === "ultra"
      ? 1
      : rare === "cross" || rare === "secret"
      ? 2
      : 3;

  const sumRotation = rotationX + rotationY;

  return (
    <OuterContainer>
      <EntireCard
        rare={rare}
        rotation={sumRotation}
        rotationX={rotationX}
        rotationY={rotationY}
      />
      <XBorder border={border} rotationY={rotationY} />
      <MidContainer>
        <YBorder border={border} rotationX={rotationX} />
        <InnerContainer>
          <NameContainer>
            <NameBox />
            {icon && <IconBox icon={icon} rotation={sumRotation} />}
          </NameContainer>
          <GradeBox>
            {grade &&
              extra !== "link" &&
              Array.from({ length: level }).map((_, index) => (
                <LevelBox key={index} grade={grade} rotation={sumRotation} />
              ))}
          </GradeBox>
          <ImageBox>
            <CardImage image={image} rotation={sumRotation} />
          </ImageBox>
          <TextBox>
            <MainText />
          </TextBox>
        </InnerContainer>
        <YBorder border={border} rotationX={rotationX} />
      </MidContainer>
      <XBorder border={border} rotationY={rotationY} />
    </OuterContainer>
  );
};

export default Rare;
