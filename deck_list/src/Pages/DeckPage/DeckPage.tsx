import React from "react";
import { useParams } from "react-router-dom";

// extra를 기준으로 메인덱과 엑스트라덱 구분
// token은 따로 배치

const DeckPage = () => {
  const theme = useParams();
  return <div>DeckPage</div>;
};

export default DeckPage;
