import React, { useState, useEffect, useRef} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import * as fetchSpot from "../../API/Spot/Spot";
import { config } from "../../Config/Config";

export const BASE_URL = config.http.BASE_URL;

const SectionContainer = styled.div`
  margin-top: 20px;
  width: 90%;
  height: 100%;
  display: grid;
  grid-auto-flow: row dense;
  --breakpoint-grid_columns: 5;
  grid-auto-rows: minmax(100px, auto);
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
  column-gap: 30px;
  transition-duration: 0.5s;

  @media screen and (max-width: 1550px) {
    --breakpoint-grid_columns: 4;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media screen and (max-width: 1150px) {
    --breakpoint-grid_columns: 3;
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    --breakpoint-grid_columns: 2;
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 468px) {
    --breakpoint-grid_columns: 1;
    grid-auto-rows: minmax(350px, auto);
    grid-template-columns: 1fr;
  }
`;

const ImgConainter = styled.div`
  margin: 0px auto;
  max-width: 300px;
  max-height: 385px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`;
const Img = styled.img`
  border-radius: 10px;
  max-width: 300px;
  max-height: 250px;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImgText = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 150px;
  font-size: 14px;
`;
const TextHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TextCategory = styled.div`
  color: silver;
`;

const TextAddr = styled.div`
  color: silver;
`;

const TextTitle = styled.div``;
const TextLike = styled.div``;

const SectionAssay = (userClickBtn: any) => {
  const [spotData, setSpotData] = useState<any[]>([]);
  const refNum: any = useRef(0);

  const start: any = async () => {
    let data: any;
      data = await fetchSpot.getCategorySpotData(
        userClickBtn.userClickBtn,
        refNum.current
      );
    if (data.status === false) {
      setSpotData([]);
    } else {
      setSpotData([...spotData, ...data.json]);
    }
  };

  useEffect(() => {
    refNum.current = 0;
    start();
  }, [userClickBtn]);

  // 스크롤 이벤트 핸들러
  const handleScroll = async () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      refNum.current = refNum.current + 1;
      start();
    }
  };

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <SectionContainer>
      {spotData.map((item, i) => {
        return (
          <ImgConainter key={i}>
            <Img src={`${BASE_URL}${item.imgpath}`}></Img>
            <ImgText>
              <TextHeader>
                <TextTitle>{item.title}</TextTitle>
                <TextLike>
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ marginRight: "5px", color: "pink" }}
                  />
                  {item.likeNum}
                </TextLike>
              </TextHeader>
              <TextCategory>{item.contentslabel}</TextCategory>
              <TextAddr>{item.address}</TextAddr>
            </ImgText>
          </ImgConainter>
        );
      })}
    </SectionContainer>
  );
};

export default SectionAssay;
