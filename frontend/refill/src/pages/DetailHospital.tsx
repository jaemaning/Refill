import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "components/Footer";
import Cloud2 from "../assets/cloud.png";
import styled from "@emotion/styled";
import Button from "../components/elements/Button";
import Arrow from "../assets/icons/reservation_arrow_icon.png";
import { Rating, Pagination, Stack, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import { red } from "@mui/material/colors";
// import StarRatings from "react-star-ratings";

interface DivProps {
  buttonData?: number;
}

interface Doctor {
  doctorId: number;
  name: string;
  profileImg: string;
  licenseNumber: string;
  licenseImg: string;
  description: string;
  majorAreas: string[];
  educationBackgrounds: string[];
}

interface Review {
  reviewId: number;
  score: number;
  content: string;
  memberId: number;
  nickname: string;
  doctorId: number;
  doctorName: string;
  hospitalId: number;
  hospitalName: string;
  updateDate: string;
  category: string;
}

const Containers = styled.div`
  border 0;
  min-width: 100%;
  min-height: 50vh;
  align-items: center;
  display:flex;
  justify-content: center;
  flex-direction: column;
  margin : 50px 0px;
`;

const BannerContainer = styled.div`
  position: relative;
  height: 280px;
`;

const Bannerimg = styled.img`
  width: 100%;
  height: 150px;
`;

const Profileimg = styled.img`
  position: absolute;
  width: 200px;
  height: 200px;
  top: 80px;
  margin-left: 300px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px black solid;
`;

const Kakaomap = styled.div`
  display: flex;
  justify-content: center;
  height: 500px;
  border: 1px black solid;
`;
const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1300px;
`;
const ButtonList = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
  height: 60px;
`;

const HospitalInfo = styled.div`
  display: flex;
  flex-direction: column;
  display: ${(props: DivProps) => (props.buttonData === 0 ? "block" : "none")};
`;

const DoctorInfo = styled.div`
  display: flex;
  flex-direction: column;
  display: ${(props: DivProps) => (props.buttonData === 1 ? "block" : "none")};
`;

const Review = styled.div`
  display: flex;
  flex-direction: column;
  display: ${(props: DivProps) => (props.buttonData === 2 ? "block" : "none")};
`;

const Doctors = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #d8eeff;
  width: 650px;
  height: 355px;
  border-radius: 30px;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.3);
  margin-top: 30px;
  margin-bottom: 100px;
`;
const Doctor_common = styled.div`
  display: flex;
  flex-direction: column;
`;

const Bigspan = styled.span`
  font-weight: bold;
  font-size: 25px;
  margin-top: 8px;
  color: #2e5077;
`;

const Doctor_res_icon = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 320px;
`;

const DetailHospital: React.FC = () => {
  // 배너이미지 갈아끼울때마다 적용
  const [doctorData, setDoctorData] = useState<Doctor[]>([]);
  const [reviewData, setReviewData] = useState<Review[]>([]);
  const [hospitalData, setHospitalData] = useState({
    id: 0,
    name: "",
    longitude: 0,
    latitude: 0,
    hospitalProfileImg: "",
    bannerProfileImg: "",
    address: "",
    tel: "",
    score: 0,
    email: "",
  });

  // 버튼누르는거에 따른 상태값
  const [buttonData, setButtonData] = useState(0);

  const handleHospitalClick = () => {
    setButtonData(0);
  };

  const handleDoctorClick = () => {
    setButtonData(1);
  };

  const handleReviewClick = () => {
    setButtonData(2);
  };

  // 페이지네이션
  const [page, setPage] = useState(1);
  const reviewPerPage = 3;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // 리뷰 최신순, 평점높은순, 낮은순 state값으로 반영
  const [state, setState] = useState<number>(0);
  const stateChange = (event: SelectChangeEvent<number>) => {
    setState(event.target.value as number);
  };

  // 의사에 따른 리뷰 데이터 반영
  const [dreview, setDreview] = useState<number>(0);
  const dreviewChange = (event: SelectChangeEvent<number>) => {
    setDreview(event.target.value as number);
  };

  // doctorId값 추출
  const doctorIds: { doctorId: number; doctorName: string }[] = [];

  reviewData.forEach((response) => {
    const { doctorId, doctorName } = response;
    const existingDoctor = doctorIds.find((item) => item.doctorId === doctorId);

    if (!existingDoctor) {
      doctorIds.push({ doctorId, doctorName });
    }
  });

  // 평점 높은순 나열 알고리즘
  const reviewFirst = () => {
    return reviewData
      .slice()
      .sort((a: Review, b: Review) => (b.score || 0) - (a.score || 0));
  };

  // 평점 낮은순 나열 알고리즘
  const reviewLast = () => {
    return reviewData
      .slice()
      .sort((a: Review, b: Review) => (a.score || 0) - (b.score || 0));
  };

  // 리뷰 최신순 알고리즘
  const reviewLatest = () => {
    return reviewData.slice().sort((a: Review, b: Review) => {
      const dateA = new Date(a.updateDate);
      const dateB = new Date(b.updateDate);

      const differenceInMillis: number = dateA.getTime() - dateB.getTime();

      return differenceInMillis;
    });
  };

  // 의사Id와 리뷰 알고리즘에 대한 리뷰 리턴
  const getFilteredReviewData = () => {
    let filteredData = [...reviewData];

    // state에 따라 리뷰 정보 재구성
    if (state === 0) {
      filteredData = reviewFirst();
    } else if (state === 1) {
      filteredData = reviewLast();
    } else if (state === 2) {
      filteredData = reviewLatest();
    }

    // dreview 값에 따라 리뷰 정보를 필터링
    if (dreview !== 0) {
      filteredData = filteredData.filter(
        (review) => review.doctorId === dreview,
      );
    }

    return filteredData;
  };

  const filteredReviewData = getFilteredReviewData();

  // 테스트용
  useEffect(() => {
    const token = localStorage.getItem("login-token");
    axios
      .get("api/v1/hospital/1", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoibWVtYmVyMSIsInJvbGUiOiJST0xFX01FTUJFUiIsImlhdCI6MTY5MTMwNTMyMywiZXhwIjoxNjkxMzA4OTIzfQ.PPSn6eLTFbG9nHOooKBYLcZmDEud0i1Y2eloT4F1UeU`,
        },
      })

      .then((response) => {
        const { hospitalResponse, doctorResponses, reviewResponses } =
          response.data;
        setHospitalData(hospitalResponse);
        setDoctorData(doctorResponses);
        setReviewData(reviewResponses);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(hospitalData);
    console.log(doctorData);
    console.log(reviewData);
  }, [hospitalData, doctorData, reviewData]);

  // image onclick 이벤트 => 배너이미지 변경

  return (
    <div>
      <Navbar />
      {/* 배너이미지 변경해주는거 적용해야함 */}
      <BannerContainer>
        <Bannerimg src={Cloud2} />
        {/* <ProfileContainer> */}
        <Profileimg src={Cloud2} />
        {/* </ProfileContainer> */}
      </BannerContainer>
      <Containers>
        <Layout>
          <Content style={{ width: "850px" }}>
            <span className="text-2xl font-bold">{hospitalData.name}</span>
            <Kakaomap></Kakaomap>
            <ButtonList>
              <Button
                content="병원 정보"
                variant={
                  buttonData === 0 ? "detailSelected" : "detailUnselected"
                }
                width="100px"
                onClick={handleHospitalClick}
                customStyles={{
                  boxShadow: "none",
                  height: "60px",
                }}
              />
              <Button
                content="의사 정보"
                variant={
                  buttonData === 1 ? "detailSelected" : "detailUnselected"
                }
                width="100px"
                customStyles={{
                  boxShadow: "none",
                  height: "60px",
                }}
                onClick={handleDoctorClick}
              />
              <Button
                content="리뷰"
                variant={
                  buttonData === 2 ? "detailSelected" : "detailUnselected"
                }
                width="100px"
                customStyles={{
                  boxShadow: "none",
                  height: "60px",
                }}
                onClick={handleReviewClick}
              />
            </ButtonList>
            <hr style={{ border: "0.1rem solid #888888" }} />
            <HospitalInfo buttonData={buttonData}>
              <h1 className="text-4xl font-bold">병원 정보</h1>
            </HospitalInfo>
            <DoctorInfo buttonData={buttonData}>
              <h1 className="text-4xl font-bold">의사 정보</h1>
              <div>
                {doctorData.map((doctor) => (
                  <div
                    key={doctor.doctorId}
                    className="flex justify-around items-center"
                  >
                    <Doctors>
                      <Doctor_common
                        className=" items-center"
                        style={{ width: "150px" }}
                      >
                        <img
                          src={doctor.profileImg}
                          alt={doctor.name}
                          className="w-28 h-28 rounded-full mt-10"
                        />
                        <span className="mt-5 text-3xl font-medium">
                          {doctor.name}
                        </span>
                      </Doctor_common>

                      <Doctor_common
                        className="justify-center"
                        style={{ width: "400px" }}
                      >
                        <Bigspan>약력</Bigspan>
                        <p className="text-lg">{doctor.description}</p>
                        <Bigspan>주요 분야</Bigspan>
                        <ul>
                          {doctor.majorAreas.map((area, index) => (
                            <li className="text-lg" key={index}>
                              {area}
                            </li>
                          ))}
                        </ul>
                        <Bigspan>학력</Bigspan>
                        <ul>
                          {doctor.educationBackgrounds.map(
                            (background, index) => (
                              <li className="text-lg" key={index}>
                                {background}
                              </li>
                            ),
                          )}
                        </ul>
                      </Doctor_common>
                    </Doctors>
                    <Doctor_res_icon>
                      <img src={Arrow} alt="" />
                      <span>상담 예약 하기</span>
                    </Doctor_res_icon>
                  </div>
                ))}
              </div>
            </DoctorInfo>
            <Review buttonData={buttonData}>
              <div className="flex justify-between">
                <h1 className="text-4xl font-bold">리뷰</h1>
                <div className="my-4">
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      리뷰 정보
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={state}
                      onChange={stateChange}
                      autoWidth
                      label="보기옵션"
                    >
                      <MenuItem value={0} sx={{ m: 1, minWidth: 180 }}>
                        평점 높은순
                      </MenuItem>
                      <MenuItem value={1} sx={{ m: 1, minWidth: 180 }}>
                        평점 낮은순
                      </MenuItem>
                      <MenuItem value={2} sx={{ m: 1, minWidth: 180 }}>
                        최신 순
                      </MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      의사 목록
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={dreview}
                      onChange={dreviewChange}
                      autoWidth
                      label="보기옵션"
                    >
                      <MenuItem value={0} sx={{ m: 1, minWidth: 180 }}>
                        전체
                      </MenuItem>
                      {doctorIds.map((doctor) => (
                        <MenuItem
                          key={doctor.doctorId}
                          value={doctor.doctorId}
                          sx={{ m: 1, minWidth: 180 }}
                        >
                          {doctor.doctorName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="flex my-11 justify-center">
                <h1 className="text-7xl font-bold">{hospitalData.score}</h1>
                <div className="flex-col text-center ms-5">
                  <Rating
                    name="read-only"
                    value={hospitalData.score}
                    readOnly
                    precision={0.1}
                    sx={{
                      fontSize: "60px",
                    }}
                  />
                  <h1>{reviewData.length}개의 리뷰</h1>
                </div>
              </div>
              <Container maxWidth="sm">
                <div>
                  {filteredReviewData
                    .slice((page - 1) * reviewPerPage, page * reviewPerPage)
                    .map((review) => (
                      <div key={review.reviewId}>
                        {
                          <div className="flex-col">
                            <Grid container spacing={1} className="my-10">
                              <Grid item xs={3}>
                                <h1 className="text-lg font-bold">
                                  {review.nickname}
                                </h1>
                              </Grid>
                              <Grid item xs={2}>
                                <h1 className="text-xl font-bold">
                                  {review.score} 점
                                </h1>
                              </Grid>
                              <Grid item xs={5}>
                                <Rating
                                  name="read-only"
                                  value={review.score}
                                  readOnly
                                  precision={1}
                                  size={"medium"}
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <NotificationImportantIcon
                                  sx={{ color: red[500] }}
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <h1>{review.doctorName}</h1>
                              </Grid>
                              <Grid item xs={2}>
                                <h1 className="text-gray-500">
                                  {review.updateDate}
                                </h1>
                              </Grid>
                              <Grid item xs={8}>
                                <h1 className="text-gray-500">
                                  {review.category}
                                </h1>
                              </Grid>
                              <Grid item xs={12}>
                                <h1 className="text-2xl">{review.content}</h1>
                              </Grid>
                            </Grid>
                          </div>
                        }
                      </div>
                    ))}
                  <div className="flex justify-center">
                    <Stack spacing={2}>
                      <Pagination
                        count={Math.ceil(
                          filteredReviewData.length / reviewPerPage,
                        )}
                        page={page}
                        onChange={handleChange}
                      />
                    </Stack>
                  </div>
                </div>
              </Container>
            </Review>
          </Content>
          <Content style={{ width: "350px" }}></Content>
        </Layout>
      </Containers>
      <Footer />
    </div>
  );
};

export default DetailHospital;
