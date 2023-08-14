import React, { useState, useEffect } from "react";
import Button from "components/elements/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "store/reducers";
import { useNavigate } from "react-router-dom";

interface TypeToken {
  consultingId?: number | null;
  sessionId?: string | null;
  token?: string | null;
  shareToken?: string | null;
  hospitalId?: number | null;
  doctorId?: number | null;
  memberId?: number | null;
  hospitalName?: string | null;
}

const testReservationIds = [...Array(100)].map((_, i) => i);

const JoinPage = () => {
  // 여기에 토큰들 담아둘거임 예약 순서대로 가자
  const [tokenData, setTokenData] = useState<TypeToken[]>([]);

  const loginToken = useSelector((state: RootState) => state.login.token);
  const islogin = useSelector((state: RootState) => state.login.islogin);

  const navigate = useNavigate();
  // 일단 테스트를 위해 1번만 그러나 여러개 일경우가 많으므로 배열에 있을 확률 up

  const [isLoading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    if (islogin && loginToken) {
      console.log("로그인확인");

      const promises = testReservationIds.map((testReservationId) =>
        getToken(testReservationId),
      );

      Promise.all(promises)
        .then(() => {
          setLoading(false);
        })
        .catch((err) => console.log("에러:", err));

      console.log("토큰 데이터 확인", tokenData);
    } else {
      alert("로그인을 해주세요.");
      navigate("/login");
    }
  }, []);

  const joinSession = ({
    consultingId,
    sessionId,
    token,
    shareToken,
    memberId,
    doctorId,
    hospitalId,
    hospitalName,
  }: TypeToken) => {
    navigate("/video", {
      state: {
        sessionPk: sessionId,
        token: token,
        shareToken: shareToken,
        consultingId: consultingId,
        memberId: memberId,
        doctorId: doctorId,
        hospitalId: hospitalId,
        hospitalName: hospitalName,
      },
    });
  };

  // axios 를 5개를 동시에 보내서 받는 순서로 감. 비동기 처리 필요 => 일단 패스
  const getToken = async (testReservationId: number): Promise<void> => {
    try {
      const response = await axios.get(
        `api/v1/consulting/connection/${testReservationId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginToken}`,
          },
        },
      );
      setTokenData((prevTokenData) => [...prevTokenData, response.data]);
      console.log(response.data);
    } catch (err) {
      console.log("에러:", err);
    }
  };

  // axios 요청으로 token 받기

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        tokenData.map(
          (
            {
              memberId,
              doctorId,
              hospitalId,
              sessionId,
              token,
              shareToken,
              consultingId,
              hospitalName,
            },
            idx,
          ) =>
            sessionId ? (
              <div key={idx}>
                {idx}, {sessionId} {consultingId}:
                <Button
                  variant="normal"
                  content="입장 가능"
                  onClick={() => {
                    joinSession({
                      memberId,
                      doctorId,
                      hospitalId,
                      token,
                      shareToken,
                      sessionId,
                      consultingId,
                      hospitalName,
                    });
                  }}
                />
              </div>
            ) : (
              <div key={idx}>
                {idx},
                <Button variant="disable" content="입장 불가" />
              </div>
            ),
        )
      )}
    </div>
  );
};

export default JoinPage;
