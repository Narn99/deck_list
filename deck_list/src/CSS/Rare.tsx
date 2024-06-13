/* 
 시크릿, 울레, 슈레, 레어, 테두리까지인 시크릿 반짝반짝
 근데 이름 칸은 반짝이게 하기가 힘들잖아...

 레어도별 컴포넌트를 만들어서 export 하자

 모달 */

import styled from "@emotion/styled";

const OuterContainer = styled("div")`
  position: absolute;

  background-color: black;
  opacity: 0.4;

  width: 100%;
  height: 100%;

  z-index: 1000;
`;

const EntireCard = styled("div")<{ rare: "special" | "cross" }>`
  position: absolute;

  width: 100%;
  height: 100%;
`;

const CardBorder = styled("div")<{ border: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InnerContainer = styled("div")``;
const NameContainer = styled("div")``;
const NameBox = styled("div")``;
const IconBox = styled("div")<{ icon: boolean }>``;
const GradeBox = styled("div")<{ grade: boolean }>``;
const ImageBox = styled("div")<{ image: boolean }>``;
const TextBox = styled("div")``;

const Rare = ({
  rare,
  type,
}: {
  rare: "normal" | "rare" | "super" | "ultra" | "secret" | "special" | "cross";
  type: "monster" | "magic" | "trap" | "token";
}) => {
  const entire = rare === "special" || rare === "cross";
  const border = rare === "special" || rare === "secret" || rare === "cross";
  const icon =
    rare === "ultra" ||
    rare === "secret" ||
    rare === "special" ||
    rare === "cross";
  const grade =
    type === "monster" &&
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
            <IconBox icon={icon} />
          </NameContainer>
          <GradeBox grade={grade} />
          <ImageBox image={image} />
          <TextBox />
        </InnerContainer>
      </CardBorder>
    </OuterContainer>
  );
};

export default Rare;
