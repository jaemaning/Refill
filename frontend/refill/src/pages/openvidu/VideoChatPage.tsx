import { useEffect, useState } from "react";
import {
  OpenVidu,
  Session,
  StreamManager,
  Publisher,
  Device,
} from "openvidu-browser";
import axios from "axios";
import UserVideoComponent from "./UserVideoComponent";
import Button from "components/elements/Button";
import styled from "@emotion/styled";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost/";

const VideoChatPage: React.FC = () => {
  const [mySessionId, setMySessionId] = useState("sessionA");
  const [myUserName, setMyUserName] = useState(
    "Participant" + Math.floor(Math.random() * 100),
  );
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [mainStreamManager, setMainStreamManager] = useState<
    StreamManager | undefined
  >(undefined);
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined);
  const [subscribers, setSubscribers] = useState<StreamManager[]>([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState<Device | undefined>(undefined);
  const [showChat, setShowChat] = useState(false);

  // 강제로 창 종료시 동작

  useEffect(() => {
    window.addEventListener("beforeunload", onbeforeunload);
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, []);

  // mainStreamManager가 없을 경우 publisher로 설정
  useEffect(() => {
    if (!mainStreamManager && publisher) {
      setMainStreamManager(publisher);
    }
  }, [mainStreamManager, publisher, subscribers]);

  // 나갈때 동작
  const onbeforeunload = () => {
    // session 떠나기
    leaveSession();
  };

  const handleChangeSessionId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMySessionId(e.target.value);
  };

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyUserName(e.target.value);
  };

  // 메인 스트림과 클릭된 서브 스트림을 전환하는 함수
  const toggleMainAndSubStream = (target: StreamManager) => {
    if (target === publisher) {
      // 클릭된 스트림이 현재 publisher일 경우
      setMainStreamManager(publisher); // mainStreamManager를 publisher로 설정
    } else {
      setMainStreamManager(target); // 클릭된 서브 스트림을 메인 스트림으로 설정
    }
  };

  const deleteSubscriber = (streamManager: StreamManager) => {
    setSubscribers((prevSubscribers) =>
      prevSubscribers.filter((sub) => sub !== streamManager),
    );
  };

  const joinSession = async () => {
    const OV = new OpenVidu();
    const mySession = OV.initSession();
    setSession(mySession);

    // Specify the actions when events take place in the session
    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    console.log(111)

    try {
      const token = await getToken();
      console.log(222)
      await mySession.connect(token, { clientData: myUserName });

      const publisher = await OV.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: "640x480",
        frameRate: 30,
        insertMode: "APPEND",
        mirror: false,
      });

      mySession.publish(publisher);

      const devices = await OV.getDevices();
      const videoDevices = devices.filter(
        (device: any) => device.kind === "videoinput",
      );
      const currentVideoDeviceId = publisher.stream
        .getMediaStream()
        .getVideoTracks()[0]
        .getSettings().deviceId;
      const currentVideoDevice = videoDevices.find(
        (device: any) => device.deviceId === currentVideoDeviceId,
      );
      setCurrentVideoDevice(currentVideoDevice);
      setMainStreamManager(publisher);
      setPublisher(publisher);
    } catch (error) {
      console.log("There was an error connecting to the session:", error);
    }
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }

    // Empty all properties...
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("SessionA");
    setMyUserName("Participant" + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  const camOnOff = () => {
    if (session) {
      publisher?.publishVideo(!publisher?.stream?.videoActive);
      console.log(subscribers);
    }
  };

  const soundOnOff = () => {
    if (session) {
      publisher?.publishAudio(!publisher?.stream?.audioActive);
      console.log(subscribers);
      console.log(subscribers.length);
    }
  };

  const soundControl = () => {
    if (session) {
      console.log(session);
      console.log(publisher);
    }
  };

  const roomOut = () => {
    if (session) {
      session.disconnect();
    }

    // Empty all properties...
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("SessionA");
    setMyUserName("Participant" + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  const accessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoibWVtYmVyMSIsInJvbGUiOiJST0xFX01FTUJFUiIsImlhdCI6MTY5MTQ2Mjc5NSwiZXhwIjoxNjkxNDY2Mzk1fQ.irKeqpjL6m-BTBsFxmlyMsrUeRG4a3XgkflO8BWvuXg";
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const getToken = async () => {
    const sessionId = await createSession(mySessionId);
    return await createToken(sessionId);
  };

  const createSession = async (sessionId: string) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: headers,
      },
    );

    console.log(response.data);

    return response.data; // The sessionId
  };

  const createToken = async (sessionId: string) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: headers,
      },
    );
    return response.data; // The token
  };

  const handleShowBox = () => {
    console.log(11)
    console.log(showChat)
    setShowChat(!showChat)
  }

  const StyleSidebar = styled.div`
    position: fixed;
    top: 50%;
    right: 20px;
    transform: translate(0, -70%);
    background: #aafffc;
  `

  return (
    <div
      className="container"
      style={{
        minWidth: "100%",
        minHeight: "100vh",
        backgroundColor: "#dddddd",
        padding: "20px 20px",
      }}
    >
      {session === undefined ? (
        <div id="join">
          <div
            id="join-dialog"
            className="bg-white rounded p-4 mx-auto"
            style={{ backgroundColor: "#e8e8e8" }}
          >
            <h1 className="text-center"> Join a video session </h1>
            <form className="space-y-4" onSubmit={joinSession}>
              <div>
                <label>Participant: </label>
                <input
                  className="form-input block w-full"
                  type="text"
                  id="userName"
                  value={myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </div>
              <div>
                <label> Session: </label>
                <input
                  className="form-input block w-full"
                  type="text"
                  id="sessionId"
                  value={mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </div>
              <div className="text-center">
                <input
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  name="commit"
                  type="submit"
                  value="JOIN"
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div id="session" style={{ minWidth:"100%", minHeight:"100%" }}>
            <div className="flex justify-start" style={{ position: "relative", width:'100%'}}>
              <div style={{ width: '55%', minWidth: '500px' }}>
                <UserVideoComponent streamManager={mainStreamManager} />
              </div>
              {subscribers && mainStreamManager === publisher ? (
                subscribers.map((sub) => (
                  <div
                    key={sub.id}
                    style={{
                      width: "15%",
                      minWidth: "150px",
                      position: "absolute",
                      top: "30px",
                      left: "30px",
                    }}
                    onClick={() => toggleMainAndSubStream(sub)}
                  >
                    <UserVideoComponent streamManager={sub} />
                  </div>
                ))
              ) : publisher !== undefined ? (
                <div
                  style={{
                    width: "15%",
                    minWidth: "150px",
                    position: "absolute",
                    top: "30px",
                    left: "30px",
                  }}
                  onClick={() => toggleMainAndSubStream(publisher)}
                >
                  <UserVideoComponent streamManager={publisher} />
                </div>
              ) : null}
              <div style={{marginLeft: '20px',display: "flex", flexDirection:"column", width: '35%', minHeight: '100%'}}>
                <div style={{ minWidth:'100%', height: '70%', backgroundColor: 'white' }}>
                  안녕하세요 ??
                </div>
                <div style={{ marginTop: "20px", height: '30%', backgroundColor: 'white' }}>
                  안녕하세요?
                </div>
              </div>
          </div>

          <div style={{position: 'fixed', bottom: '20px', left: '0', padding:'0 20px', width: '100%'}}>
            <div
              id="session-footer"
              className="flex justify-between items-center"
              style={{ width: '100%' }}
            >
              <h1 id="session-title" className="text-xl font-bold">
                {mySessionId}
              </h1>
              <div>
                <Button content="캠 on/off" onClick={camOnOff}  />
                <Button content="소리 on/off" onClick={soundOnOff} />
                <Button content="소리조절" onClick={soundControl} />
                <Button content="상담 나가기" onClick={roomOut} />
              </div>
              <div>
                <Button content="채팅" onClick={handleShowBox}/>
              </div>
            </div>
          </div>

          <StyleSidebar>
            <div
              id="session-sidebar"
              className="flex flex-col justify-between items-center"
            >
              <Button width="40px" content="상담"  />
              <Button width="40px" content="AI" />
              <Button width="40px" content="화면" />
            </div>
          </StyleSidebar>


          <div style={{position: "absolute", bottom: '40px', right: '40px', minWidth: '200px', minHeight:'200px', backgroundColor: 'grey', display: showChat ? 'block' : 'none'}}>

          </div>
        </div>
      )}
    </div>
  );
};

export default VideoChatPage;
