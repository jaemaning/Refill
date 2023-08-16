import React, {useState} from "react";
import axios from "axios";
import "styles/Modal.css"
// 토큰가져오기
import { RootState } from "store/reducers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface TypeToken {
  consultingId?: number | null;
  sessionId?: string | null;
  token?: string | null;
  shareToken?: string | null;
}

interface JoinModalProps {
  setOpenJoin: (open: boolean) => void
}

const JoinModal: React.FC<JoinModalProps> = ({setOpenJoin}) => {
  // 데이터가 있으면 A가 나오고 없으면 B가 나옴
  // A가 나왔다는 말은 입장 하면 된다는 말이고
  // B가 나왔다는 말은 입장까지 시간이 멀었다는 말임


  // 상담 입장
  const loginToken = useSelector((state: RootState) => state.login.token);
  const islogin = useSelector((state: RootState) => state.login.islogin);
  const [tokenData, setTokenData] = useState<TypeToken[]>([]);
  const navigate = useNavigate();

  const [nowResId, setNowResId] = useState(0);

  // 입장하는 함수
  const joinSession = ({
    consultingId,
    sessionId,
    token,
    shareToken,
  }: TypeToken) => {
    navigate("/video", {
      state: {
        sessionPk: sessionId,
        token: token,
        shareToken: shareToken,
        consultingId: consultingId,
      },
    });
  };
  // 토큰을 받아오는 함수
  const getToken = async (reservationId: number): Promise<void> => {
    try {
      const response = await axios.get(
        `api/v1/consulting/connection/${reservationId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );
      setTokenData((prevTokenData) => [...prevTokenData, response.data]);
      //
      console.log("ok");
    } catch (err) {
      console.log(err);
    }
  };
  return (<div className="modal-overlay">
    <div className="join-modal-large-box">
    </div>
  </div>)
};
export default JoinModal;
