import React, { useState, useEffect } from 'react';
import Button from 'components/elements/Button'
import axios from 'axios';
import { useSelector } from "react-redux";
import { RootState } from "store/reducers";
import { useNavigate  } from 'react-router-dom';

interface TypeToken {
  consultingId? : number | null ;
  sessionId? : string | null;
  token? : string |  null;
  shareToken? : string | null;
}

const JoinPage = () => {

  // 여기에 토큰들 담아둘거임 예약 순서대로 가자
  const [tokenData, setTokenData] = useState<TypeToken[]>([])

  const loginToken = useSelector((state: RootState) => state.login.token);
  const islogin = useSelector((state: RootState) => state.login.islogin);
  
  const navigate = useNavigate();
  // 일단 테스트를 위해 1번만 그러나 여러개 일경우가 많으므로 배열에 있을 확률 up
  const testReservationIds = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  const [isLoading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    if ( islogin && loginToken ) {
      console.log('로그인확인')
      Promise.all(testReservationIds.map((testReservationId) => {
        getToken(testReservationId)
      }))
      .then(()=> {
        setLoading(false)
        console.log(tokenData)
      })
      .catch((err)=> console.log("에러:", err))
    } else {
      alert('로그인을 해주세요.')
      navigate('/login');
    }
  },[])

  const joinSession = ( { consultingId, sessionId, token, shareToken }: TypeToken ) => {
    console.log(token, shareToken, consultingId, sessionId)
    navigate('/video', {state : {sessionPk: sessionId, token: token, shareToken: shareToken, consultingId: consultingId}})
  }

  // axios 를 5개를 동시에 보내서 받는 순서로 감. 비동기 처리 필요 => 일단 패스
  const getToken = async (testReservationId : number) :Promise<void> => {
    try {
    const response = await axios
      .get(`api/v1/consulting/connection/${testReservationId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginToken}`,
        },
      });
      console.log(response.data)
      setTokenData(prevTokenData => [...prevTokenData, response.data])
    } catch(err) {
      console.log("에러:", err);
    }
  }
  
  // axios 요청으로 token 받기 

  return (
    <div>
      { isLoading ? (        
        <div>Loading...</div>
      ) : (
        tokenData.map(({ sessionId, token, shareToken }, idx) => (
          sessionId ? (
            <div key={idx}>
              {idx}, {sessionId} :
              <Button variant='normal' content='입장 가능' onClick={()=>{joinSession({token, shareToken})}}/>
            </div>
          )
          : (
            <div key={idx}>
              {idx},
              <Button variant='disable' content='입장 불가' />
            </div>
          )
        ))
      )
      }
    </div>
  );
}

export default JoinPage