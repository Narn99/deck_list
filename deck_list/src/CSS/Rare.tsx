/* 
 시크릿, 울레, 슈레, 레어, 테두리까지인 시크릿 반짝반짝
 근데 이름 칸은 반짝이게 하기가 힘들잖아...

 레어도별 컴포넌트를 만들어서 export 하자

 모달 */

import styled from "@emotion/styled";

const OuterContainer = styled("div")`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: black;
  opacity: 0.6;

  width: 100%;
  height: 100%;

  z-index: 1000;
`;

const EntireCard = styled("div")<{ rare: "special" | "cross" | "parallel" }>`
  position: absolute;

  background-color: red;

  width: 96%;
  height: 97%;
`;

const CardBorder = styled("div")<{ border: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: blue;

  width: 100%;
  height: 100%;
`;
const InnerContainer = styled("div")`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;

  background-color: yellow;

  width: 96%;
  height: 97.5%;
`;

const NameContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 95%;
  height: 7.5%;

  background-color: orange;

  padding-top: 3%;
`;
const NameBox = styled("div")`
  width: 100%;
  height: 100%;
`;
const IconBox = styled("div")`
  width: 14%;
  height: 96%;

  margin-right: 0.8%;
  margin-top: 0.4%;

  background-color: black;

  border-radius: 50%;
`;
const GradeBox = styled("div")`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  background-color: white;

  width: 85%;
  height: 5%;

  padding-top: 1%;
  padding-bottom: 1%;
`;
const LevelBox = styled("div")`
  display: flex;

  border-radius: 50%;

  background-color: black;

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
const CardImage = styled("div")<{ image: boolean }>`
  width: 100%;
  height: 100%;

  background-color: black;
`;

const TextBox = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 96.5%;
  height: 23%;

  background-color: gray;

  padding-left: 0.5%;
  padding-top: 2%;
  padding-bottom: 4%;
`;

const MainText = styled("div")`
  width: 97%;
  height: 90%;

  border-radius: 0.5vw;

  background-color: black;
`;

const Rare = ({
  rare,
  type,
  level,
}: {
  rare:
    | "normal"
    | "rare"
    | "super"
    | "ultra"
    | "secret"
    | "special"
    | "cross"
    | "parallel";
  type: "monster" | "magic" | "trap" | "token";
  level: number;
}) => {
  const entire = rare === "special" || rare === "cross" || rare === "parallel";
  const border = rare === "special" || rare === "secret" || rare === "cross";
  const icon =
    rare === "ultra" ||
    rare === "secret" ||
    rare === "special" ||
    rare === "cross";
  const grade =
    (type === "monster" || type === "token") &&
    (rare === "ultra" ||
      rare === "secret" ||
      rare === "special" ||
      rare === "cross");
  const image = rare !== "normal" && rare !== "rare";

  return (
    <OuterContainer>
      {entire && <EntireCard rare={rare} />}
      <CardBorder border={border}>
        <InnerContainer>
          <NameContainer>
            <NameBox />
            {icon && <IconBox />}
          </NameContainer>
          <GradeBox>
            {grade &&
              Array.from({ length: level }).map((_, index) => (
                <LevelBox key={index} />
              ))}
          </GradeBox>
          <ImageBox>
            <CardImage image={image} />
          </ImageBox>
          <TextBox>
            <MainText />
          </TextBox>
        </InnerContainer>
      </CardBorder>
    </OuterContainer>
  );
};

export default Rare;
