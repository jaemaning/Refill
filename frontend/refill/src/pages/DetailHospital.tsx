import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "components/Footer";
import Cloud2 from "../assets/cloud.png"
import styled from "@emotion/styled";
import Button from "../components/elements/Button";
import Arrow from "../assets/icons/reservation_arrow_icon.png"
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

const Container = styled.div`
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
  width : 100%;
  height : 150px;
`

const Profileimg = styled.img`
  position: absolute;
  width : 200px;
  height : 200px;
  top: 80px; 
  margin-left : 300px;
`

const Content = styled.div`
  display : flex;
  flex-direction : column;
  border : 1px black solid;
`

const Kakaomap = styled.div`
  display: flex;
  justify-content : center;
  height : 500px;
  border : 1px black solid;
`
const Layout = styled.div`
  display: flex;
  justify-content : space-between;
  width : 1300px;
`
const ButtonList = styled.div`
  display: flex;
  justify-content : space-between;
  width : 400px;
  height: 60px;
`

const HospitalInfo = styled.div`
  display: flex;
  flex-direction: column;
  display : ${(props: DivProps) => (props.buttonData === 0 ? "block" : "none")};
`

const DoctorInfo = styled.div`
  display: flex;
  flex-direction: column;
  display : ${(props: DivProps) => (props.buttonData === 1 ? "block" : "none")};
`

const Review = styled.div`
  display: flex;
  flex-direction: column;
  display : ${(props: DivProps) => (props.buttonData === 2 ? "block" : "none")};
`

const Doctors = styled.div`
  display : flex;
  justify-content : space-around;
  background-color: #D8EEFF;
  width : 650px;
  height : 355px;
  border-radius : 30px;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.3);
  margin-top : 30px;
  margin-bottom : 100px;
`
const Doctor_common = styled.div`
  display: flex;
  flex-direction : column;
`

const Bigspan = styled.span`
  font-weight : bold;
  font-size : 25px;
  margin-top : 8px;
  color : #2E5077;
`

const Doctor_res_icon = styled.span`
  display : flex;
  flex-direction : column;
  justify-content: center;
  align-items : center;
  height : 320px;
`

const DetailHospital: React.FC = () => {
    // 배너이미지 갈아끼울때마다 적용
    const [doctorData, setDoctorData] = useState<Doctor[]>([])
    const [reviewData, setReviewData] = useState<Review[]>([])
    const [hospitalData, setHospitalData] = useState({
      id : 0,
      name : "",
      longitude : 0,
      latitude : 0,
      hospitalProfileImg : "",
      bannerProfileImg : "",
      address : "",
      tel : "",
      score : 0,
      email : "",
    });

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

    // 테스트용
    useEffect(() =>{
      const token = localStorage.getItem("login-token");
      axios
        .get("api/v1/hospital/1", {
          headers: {
            Authorization : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoibWVtYmVyMSIsInJvbGUiOiJST0xFX01FTUJFUiIsImlhdCI6MTY5MTEzMzA3MywiZXhwIjoxNjkxMTM2NjczfQ.UuTda1tnPotVfTWn1zsqKRK9jmlQKZ80FUS5oNlpCLs`,
          },
        })

        .then((response) => {
          const { hospitalResponse, doctorResponses, reviewResponses } = response.data
          setHospitalData(hospitalResponse)
          setDoctorData(doctorResponses)
          setReviewData(reviewResponses)
        })

        .catch((error) => {
          console.log(error)
        })

    },[])

    useEffect(() => {
      console.log(hospitalData)
      console.log(doctorData)
      console.log(reviewData)
    }, [hospitalData, doctorData, reviewData])

    // image onclick 이벤트 => 배너이미지 변경
    
    return(
        <div>
        <Navbar />
          {/* 배너이미지 변경해주는거 적용해야함 */}
          <BannerContainer>
            <Bannerimg src={Cloud2}  />
            {/* <ProfileContainer> */}
            <Profileimg src={Cloud2} />
            {/* </ProfileContainer> */}
          </BannerContainer>
          <Container>
            <Layout>
              <Content style = {{width :"850px"}}>
              <span className="text-2xl font-bold">{hospitalData.name}</span>
                <Kakaomap>

                </Kakaomap>
                <ButtonList>
                  <Button
                    content="병원 정보"
                    variant={buttonData === 0 ? "detailSelected" : "detailUnselected"}
                    width="100px"
                    onClick={handleHospitalClick}
                    customStyles={{
                      boxShadow: "none",
                      height: "60px"
                    }}
                  /> 
                  <Button
                    content="의사 정보"
                    variant={buttonData === 1 ? "detailSelected" : "detailUnselected"}
                    width="100px"
                    customStyles={{
                      boxShadow: "none",
                      height: "60px"
                    }}
                    onClick={handleDoctorClick}
                  /> 
                  <Button
                    content="리뷰"
                    variant={buttonData === 2 ? "detailSelected" : "detailUnselected"}
                    width="100px"
                    customStyles={{
                      boxShadow: "none",
                      height: "60px"
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
                      <div key={doctor.doctorId} className="flex justify-around items-center">
                          <Doctors>
                            <Doctor_common className =" items-center" style={{width : "150px"}}>
                              <img src={doctor.profileImg} alt={doctor.name} className="w-28 h-28 rounded-full mt-10"/>
                              <span className="mt-5 text-3xl font-medium">{doctor.name}</span>
                            </Doctor_common>

                            <Doctor_common className= "justify-center" style={{width : "400px"}}>
                              <Bigspan>약력</Bigspan>
                              <p className="text-lg">{doctor.description}</p>
                              <Bigspan>주요 분야</Bigspan>
                              <ul>
                                {doctor.majorAreas.map((area, index) => (
                                  <li className="text-lg" key={index}>{area}</li>
                                ))}
                              </ul>
                              <Bigspan>학력</Bigspan>
                              <ul>
                                {doctor.educationBackgrounds.map((background, index) => (
                                  <li className="text-lg" key={index}>{background}</li>
                                ))}
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
                  <h1 className="text-4xl font-bold">리뷰</h1>
                </Review>
              </Content>
              <Content style = {{width : "350px"}}>

              </Content>
              
            </Layout>
          </Container>
          <Footer />
        </div>
    );
};

export default DetailHospital;