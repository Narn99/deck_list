import { useParams } from "react-router-dom";

import CardList from "../../Components/CardList";
import { CardType } from "../../Types/CardDataType";

// extra를 기준으로 메인덱과 엑스트라덱 구분
// token은 따로 배치

const testCards: CardType[] = [
  {
    name: "섬도희 레이",
    img_url: "/Images/Sky_Striker/레이.webp",
    type: "monster",
    grade: 4,
    rare: "super",
    quantity: 3,
  },
  {
    name: "섬도희 로제",
    img_url: "/Images/Sky_Striker/로제.webp",
    type: "monster",
    grade: 4,
    rare: "super",
    quantity: 1,
  },
  {
    name: "섬도기동 인게이지",
    img_url: "/Images/Sky_Striker/인게이지.webp",
    type: "magic",
    rare: "ultra",
    quantity: 3,
  },
];

const DeckPage = () => {
  const theme = useParams();
  return (
    <div>
      <CardList deckCards={testCards} />
    </div>
  );
};

export default DeckPage;
