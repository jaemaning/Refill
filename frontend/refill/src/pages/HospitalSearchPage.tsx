import React, { useState, useRef, useEffect } from "react";
// import RadioDiv from "../components/elements/RadioButton";
import styled from "@emotion/styled";
import { REFILL_COLORS } from "assets/getColors";
import Navbar from "components/Navbar";
import Footer from "../components/Footer";
import RadioDiv from "../components/elements/RadioButton";
import Button from "components/elements/Button";
import Dropdown from "components/elements/DropDownButton";
import { InputBox } from "components/elements/InputBox";
import homeMarker from "assets/homePin2.svg";
import axios from "axios";
import { TextField } from "@mui/material";

const max_width = "1350";
const max_height = "800";

declare global {
  interface Window {
    kakao: any;
  }
}

interface TypeFormData {
  name : string | null;
  addr : string;
}

interface DivProps {
  bgcolor?: string;
  selected?: boolean;
}

interface ToggleBoxProps {
  toggleSelected : boolean
}

interface TypeSearchedData {
  id? : number;
  name? : string;
  longitude? : number;
  latitude? : number;
  hospitalProfileImg? : string;
  address? : string;
  tel? : string;
  score? : number;
}

interface TypeRequestMap {
  sLat?: number;
  sLng?: number;
  eLat?: number;
  eLng?: number;
  curLat?: number;
  curLng?: number;
}

interface TypeResponseMap {
  hospitalResponse? : TypeSearchedData;
  dist? : number;
}



// 디자인
const Container = styled.div`
  margin-top: 50px;
  background-color: ${REFILL_COLORS["white"]};
  min-width: 100%;
  min-height: 120vh;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const MapBox = styled.div`
  background-color: ${(props: DivProps) =>
    props.bgcolor ? props.bgcolor : "white"};
  width: ${max_width + "px"};
  height: ${max_height + "px"};
  display: ${(props: DivProps) => (props.selected ? "block" : "none")};
`;

const SearchTop = styled.div`
  width: ${max_width + "px"};
  height: 150px;
  background-color: REFILL_COLORS["grey-1"];
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchBot = styled.div`
  width: ${max_width + "px"};
  height: ${(parseInt(max_height)-150) + "px"};
  background-color: white;
  overflow : "auto";
  max-height : ${(parseInt(max_height)-150) + "px"};
`;

const ToggleBox = styled.div`
  padding: 20px;
  width: 30%;
  height: 100%;
  background-color: #e0b8b8;
  position: absolute;
  z-index: 999;
  right: 0;
  display: ${(props:ToggleBoxProps)=>(props.toggleSelected ? "none" : "block")};
`;

export const HospitalSearch: React.FC = () => {
  // 자료 저장용
  const [selected, setSelected] = useState("option1"); // 상단 버튼 태그를 구분
  const [dropSelected, setDropSelected] = useState("서울"); // 드롭다운 버튼 구분
  const [searched, setSearched] = useState<string>(""); // 검색어 박스 구분
  const [homeLat, homeLon] = [33.452613, 126.570888]; // 집위치 테스트를 위해 가상의 값으로 테스트진행
  const [toggleSelected, setToggleSelected] = useState(true);
  const [rendered, setRendered] = useState(true);
  const [toggleData, setToggleData] = useState(true);
  const nowCenter = useRef<number[]>([33.452613, 126.570888]);
  const [searchedData, setSearchedData] = useState<TypeSearchedData[]>([]);
  const [hospitals, setHospitals] = useState<TypeResponseMap[]>([]); // 병원 위치 테스트용
  const [starsHospitals, setStarsHospitals] = useState<TypeResponseMap[]>([]);
  const [distanceHospitals, setDistanceHospitalss] = useState<TypeResponseMap[]>([]);

  const kakaoMapBox = useRef<HTMLDivElement>(null); // 지도를 담을 div element를 위한 ref
  const map = useRef<any>(null); // map 객체를 관리할 ref

  // 드롭다운 버튼 옵션 선택에 대한 함수임
  const handleSelect = (option: string) => {
    setDropSelected(option);
  };

  // 검색어를 임력하면 변경해주는 이벤트
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearched(e.target.value);
  };

  // 검색시 검색 버튼 누르면 이벤트
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(dropSelected + searched);

    const url = "api/v1/hospital/search/keyword"
    const formData : TypeFormData = {
      name: searched,
      addr: dropSelected
    }
    const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoibWVtYmVyMSIsInJvbGUiOiJST0xFX01FTUJFUiIsImlhdCI6MTY5MTE1MTQ1NCwiZXhwIjoxNjkxMTU1MDU0fQ.-8vEASGljRVaLeP58Wum8d2Wi5zf3oHO-QDOw-uKCFc"
    const headers = { Authorization: `Bearer ${accessToken}` };

    axios
      .get(url, {params: formData, headers: headers})
      .then((response) => {
        console.log(response.data);
        setSearchedData(response.data)
      })
      .catch((err) => {
        console.log(err.response.data);
      });
      setSearched("");
    };


  // 거리순보기
  const handleToggledist = () => {
    setToggleData(true)
  }
  
  // 추천순보기
  const handleTogglestars = () => {
    setToggleData(false)
  }

  // 지도 생성 메서드
  useEffect(() => {
    if (selected === "option1" && rendered === true ) {
      const loadMap = async () => {
        if (!window.kakao || !window.kakao.maps) {
          return;
        }

        await new Promise((): void =>
          window.kakao.maps.load(() => {
            const options = {
              center: new window.kakao.maps.LatLng(homeLat, homeLon),
              level: 4,
            };
            map.current = new window.kakao.maps.Map(
              kakaoMapBox.current,
              options,
            );
            makeHomeMarker();
          }),
        );
      };
      loadMap();
    }
  }, [selected]);

  // 지도 홈마커 띄우기
  const makeHomeMarker = (): void => {
    const imageSrc = homeMarker, // 마커이미지의 주소입니다
      imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    const imageSize = new window.kakao.maps.Size(25 * 1.8, 36 * 1.8); // 마커이미지의 크기입니다
    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      ),
      markerPosition = new window.kakao.maps.LatLng(homeLat, homeLon); // 마커가 표시될 위치입니다

    // 마커를 생성합니다
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      image: markerImage, // 마커이미지 설정
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map.current);
  };

  // 지도 - 병원 마커 띄우기
  // 맵을 그 위치 중심으로 새로 만들고 배열을 바꾼 다음 띄우자!
  const makeHospitalMarker = () => {
    // 정보를 가져오고 이 정보를 통해 추후 병원 데이터를 아래에 입력 진행 비동기로
    const center = map.current.getCenter();
    nowCenter.current = [center.Ma, center.La];
    console.log("now",nowCenter.current);

    // 지도의 현재 영역을 얻어옵니다 
    const bounds = map.current.getBounds();

    // 영역의 남서쪽 좌표를 얻어옵니다
    const swLatLng = bounds.getSouthWest();
    console.log("sw",swLatLng)

    // 영역의 북동쪽 좌표를 얻어옵니다
    const neLatLng = bounds.getNorthEast();
    console.log("ne",neLatLng)

    const url = "api/v1/hospital/search/location"
    const formData : TypeRequestMap = {
      sLat: swLatLng.Ma,
      sLng: swLatLng.La,
      eLat: neLatLng.Ma,
      eLng: neLatLng.La,
      curLat: center.Ma,
      curLng: center.La,
    }
    const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoibWVtYmVyMSIsInJvbGUiOiJST0xFX01FTUJFUiIsImlhdCI6MTY5MTE1MTQ1NCwiZXhwIjoxNjkxMTU1MDU0fQ.-8vEASGljRVaLeP58Wum8d2Wi5zf3oHO-QDOw-uKCFc"
    const headers = { Authorization: `Bearer ${accessToken}` };
    // axios 요청으로 병원 데이터 변경하기
    axios
    .get(url, {params: formData, headers: headers})
    .then((response) => {
      console.log(response.data);
      setHospitals(response.data)
  });
}

useEffect(() => {
  if(map.current) {
    const center = map.current.getCenter();
    // 동일 위치에서 현지도 검색 2번 동작 방지
    const options = {
      center: new window.kakao.maps.LatLng(center.getLat(), center.getLng()),
      level: map.current.getLevel(),
    };
    map.current = new window.kakao.maps.Map(kakaoMapBox.current, options);

    makeHomeMarker();

    for (let i = 0; i < hospitals.length; i++) {
      // 마커 이미지를 생성합니다
      const latlon = new window.kakao.maps.LatLng(
        hospitals[i].hospitalResponse?.latitude,
        hospitals[i].hospitalResponse?.longitude,
      );
      // 마커를 생성합니다
      const marker = new window.kakao.maps.Marker({
        map: map.current, // 마커를 표시할 지도
        position: latlon, // 마커를 표시할 위치
        title: hospitals[i].hospitalResponse?.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      });
      marker.setMap(map.current);

      setStarsHospitals(starsFirst())
      setDistanceHospitalss(distanceFirst())
    
      console.log(starsHospitals)
      console.log(distanceHospitals)
  }
  }
}, [hospitals]);
  // 다음 작업은 지도를 살짝 움직였을때 현지도 검색을 누르면 해당 위치에서 검색 되게 구현

  // 지도 - 버튼
  const handleMapLevelMinus = () => {
    if (map.current) {
      const level = map.current.getLevel();
      map.current.setLevel(level - 1);
    }
  };

  // 지도 + 버튼
  const handleMapLevelPlus = () => {
    if (map.current) {
      const level = map.current.getLevel();
      map.current.setLevel(level + 1);
    }
  };

  // 집위치로 이동 하는 코드
  const toHome = () => {
    // 집 위치 map 새로 생성
    const moveHome = new window.kakao.maps.LatLng(homeLat, homeLon);

    // 지도 중심을 이동 시킵니다
    map.current.panTo(moveHome);
  };

  // 지도 정보 상세 토글 버튼
  const handleToggleMap = () => {
    setRendered(false)
    setToggleSelected(!toggleSelected)
  };

  // 평점 정렬 알고리즘
  const starsFirst = () => {
    return hospitals.slice().sort((a: TypeResponseMap, b: TypeResponseMap) => (b.hospitalResponse?.score || 0) - (a.hospitalResponse?.score || 0));
  }

  // 거리 정렬 알고리즘
  const distanceFirst = () => {
    return hospitals.slice().sort((a: TypeResponseMap, b: TypeResponseMap) => (a.dist || 0) - (b.dist || 0));
  }

  return (
    <div>
      <Navbar />
      <Container>
        <h1
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            width: max_width + "px",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          병원 검색하기
        </h1>
        <hr />
        <RadioDiv
          selected={selected}
          setSelected={setSelected}
          maxWidth={max_width}
        ></RadioDiv>
        <MapBox selected={selected === "option1"}>
          <div ref={kakaoMapBox} style={{ width: "100%", height: "100%" }}>
            <Button
              content="+"
              variant="normal"
              width="50px"
              onClick={handleMapLevelMinus}
              customStyles={{
                zIndex: 999,
                position: "absolute",
                top: "10px",
                left: "10px",
                height: "50px",
              }}
            />
            <Button
              content="-"
              variant="normal"
              width="50px"
              onClick={handleMapLevelPlus}
              customStyles={{
                zIndex: 999,
                position: "absolute",
                top: "70px",
                left: "10px",
                height: "50px",
              }}
            />
            <Button
              content="<"
              variant="disable"
              width="25px"
              onClick={handleToggleMap}
              customStyles={{
                zIndex: 999,
                position: "absolute",
                top: "50%",
                right: "0px",
                height: "100px",
                transform: "translate(0,-50%)",
                boxShadow: "none",
                borderRadius: "0px",
                backgroundColor: REFILL_COLORS["grey-2"],
                borderTopLeftRadius: '7px',
                borderBottomLeftRadius: '7px',
              }}
            />
            <Button
              content=">"
              variant="disable"
              width="25px"
              onClick={handleToggleMap}
              customStyles={{
                zIndex: 999,
                position: "absolute",
                top: "50%",
                right: "30%",
                height: "100px",
                transform: "translate(0,-50%)",
                boxShadow: "none",
                borderRadius: "0px",
                backgroundColor: REFILL_COLORS["grey-2"],
                borderTopLeftRadius: '7px',
                borderBottomLeftRadius: '7px',
                display: toggleSelected ? "none" : "block",
              }}
            />
            <Button
              content="현 위치에서 검색"
              onClick={makeHospitalMarker}
              variant="normal"
              width="150px"
              customStyles={{
                zIndex: 999,
                position: "absolute",
                bottom: "30px",
                left: "50%",
                transform: "translate(-50%)",
              }}
            />
            <Button
              content="내 위치로 이동"
              onClick={toHome}
              variant="normal"
              width="150px"
              customStyles={{
                zIndex: 999,
                position: "absolute",
                bottom: "30px",
                left: "10px",
                color: "white",
              }}
            />
            <ToggleBox toggleSelected={toggleSelected}>
              <div style={{display: "flex", justifyContent: "space-around"}}>
                <Button content="거리순" variant="normal" width="110px" onClick={handleToggledist} />
                <Button content="평점순" variant="normal" width="110px" onClick={handleTogglestars} />
              </div>
              <div style={{marginTop: "30px", overflow : "auto", maxHeight : "650px"}}>
                <div style={{display: toggleData ? "block" : "none"}}>
                  { distanceHospitals && distanceHospitals.map((hospital, i)=>{
                        return (
                          <div key={i} style={{margin: "20px"}}>
                            병원명 : {hospital.hospitalResponse?.name}
                            <br/>
                            거리 : {hospital?.dist}
                            <br/>
                            주소 : {hospital.hospitalResponse?.address}
                            <br/>
                            전화번호 : {hospital.hospitalResponse?.tel}
                            <br/>
                            평점 : {hospital.hospitalResponse?.score}
                          </div>
                        )
                      })
                    }
                </div>
                <div style={{display: toggleData ? "none" : "block"}}>
                  { starsHospitals && starsHospitals.map((hospital, i)=>{
                      return (
                        <div key={i} style={{margin: "20px"}}>
                          병원명 : {hospital.hospitalResponse?.name}
                          <br/>
                          거리 : {hospital?.dist}
                          <br/>
                          주소 : {hospital.hospitalResponse?.address}
                          <br/>
                          전화번호 : {hospital.hospitalResponse?.tel}
                          <br/>
                          평점 : {hospital.hospitalResponse?.score}
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </ToggleBox>
          </div>
        </MapBox>
        <MapBox bgcolor="white" selected={selected === "option2"}>
          <SearchTop>
            <h1
              style={{
                textAlign: "center",
                color: REFILL_COLORS["rf-4"],
                fontWeight: "bold",
                margin: "20px",
              }}
            >
              간단한 검색을 통해 원하는 병원이 등록되어있는지 확인해보세요!
            </h1>
            <form onSubmit={handleSubmit} style={{ display: "flex" }}>
              <Dropdown
                onSelect={handleSelect}
                options={[
                  "서울",
                  "인천",
                  "경기",
                  "광주",
                  "부산",
                  "대구",
                  "울산",
                  "강원도",
                  "충청도",
                  "전라도",
                  "경상도",
                  "제주도",
                ]}
              />
              <InputBox
                type="text"
                value={searched}
                onChange={handleSearchChange}
                placeholder="병원 이름을 입력해주세요"
                handlefunc={handleSubmit}
              />
              <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={handleSearchChange} />
              <Button
                content="검색"
                variant="success"
                width="150px"
                type="submit"
              />
            </form>
          </SearchTop>
          <SearchBot>
            <>
              <h1 style={{ padding: "20px", display: searchedData ? "none" : "block"}}>검색 결과가 없습니다.</h1>
              {searchedData.map((data, i) => {
                return (
                  <div key={i} style={{marginTop: "20px"}}>
                    <p>{data.name}</p>
                    <p>{data.longitude}</p>
                    <p>{data.latitude}</p>
                    <p>{data.hospitalProfileImg}</p>
                    <p>{data.address}</p>
                    <p>{data.tel}</p>
                    <p>{data.score}</p>
                  </div>
                );
              })}
            </>
          </SearchBot>
        </MapBox>
      </Container>
      <Footer />
    </div>
  );
};
