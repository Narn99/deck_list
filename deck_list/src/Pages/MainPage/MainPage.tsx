// 메인 페이지 - 목록에서 덱 선택해서 들어가기
// 여러 덱을 리스트로 보여줌

import Card from "../../Components/Card";
import { CardType } from "../../Types/CardDataType";
import React from "react";

const testCard: CardType = {
  name: "섬도희 레이",
  img_url: "/Images/Sky_Striker/레이.webp",
  type: "monster",
  grade: 4,
  rare: "super",
  quantity: 3,
};

const MainPage = () => {
  return (
    <div>
      <Card cardData={testCard} />
    </div>
  );
};

export default MainPage;
