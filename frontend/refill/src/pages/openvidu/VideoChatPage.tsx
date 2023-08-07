import { useEffect, useState } from 'react';
import { OpenVidu, Session, StreamManager, Publisher, Device } from 'openvidu-browser';
import axios from 'axios';
import UserVideoComponent from './UserVideoComponent';
import Button from 'components/elements/Button';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost/';

const VideoChatPage : React.FC = () => {
  const [mySessionId, setMySessionId] = useState('sessionA');
  const [myUserName, setMyUserName] = useState('Participant' + Math.floor(Math.random() * 100));
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [mainStreamManager, setMainStreamManager] = useState<StreamManager | undefined>(undefined);
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined);
  const [subscribers, setSubscribers] = useState<StreamManager[]>([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState<Device | undefined>(undefined);

  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, []);

  const onbeforeunload = () => {
    leaveSession();
  };

  const handleChangeSessionId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMySessionId(e.target.value);
  };

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyUserName(e.target.value);
  };

  const handleMainVideoStream = (stream: StreamManager) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const deleteSubscriber = (streamManager: StreamManager) => {
    setSubscribers((prevSubscribers) => prevSubscribers.filter((sub) => sub !== streamManager));
  };

  const joinSession = async () => {
    const OV = new OpenVidu();
    const mySession = OV.initSession();
    setSession(mySession);

    // Specify the actions when events take place in the session
    mySession.on('streamCreated', (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    mySession.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    try {
      const token = await getToken();
      console.log(11111111)
      await mySession.connect(token, { clientData: myUserName });
      
      const publisher = await OV.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: '640x480',
        frameRate: 30,
        insertMode: 'APPEND',
        mirror: false,
      });

      mySession.publish(publisher);

      const devices = await OV.getDevices();
      const videoDevices = devices.filter((device : any) => device.kind === 'videoinput');
      const currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
      const currentVideoDevice = videoDevices.find((device : any) => device.deviceId === currentVideoDeviceId);
      setCurrentVideoDevice(currentVideoDevice);
      setMainStreamManager(publisher);
      setPublisher(publisher);
    } catch (error) {
      console.log('There was an error connecting to the session:', error);
    }
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }

    // Empty all properties...
    setSession(undefined);
    setSubscribers([]);
    setMySessionId('SessionA');
    setMyUserName('Participant' + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  const camOnOff = () => {
    if (session) {
      publisher?.publishVideo(!publisher?.stream?.videoActive)
    }
  };

  const soundOnOff = () => {
    if (session) {
      publisher?.publishAudio(!publisher?.stream?.audioActive)
    }
  };

  const soundControl = () => {
    if (session) {
      console.log(session)
      console.log(publisher)
    }
  };

  const roomOut = () => {
    if (session) {
      session.disconnect();
    }

    // Empty all properties...
    setSession(undefined);
    setSubscribers([]);
    setMySessionId('SessionA');
    setMyUserName('Participant' + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  const switchCamera = async () => {
    try {
      const OV = new OpenVidu();
      const devices = await OV.getDevices();
      const videoDevices = devices.filter((device : any) => device.kind === 'videoinput');

      if (videoDevices.length > 1 && publisher) {
        const newVideoDevice = videoDevices.find((device : any) => device.deviceId !== currentVideoDevice?.deviceId);
        const currentAudioState = publisher?.stream?.audioActive ?? true;
        const currentVideoState = publisher?.stream?.videoActive ?? true;

        if (newVideoDevice) {
          const newPublisher = OV.initPublisher(undefined, {
            videoSource: newVideoDevice.deviceId,
            publishAudio: currentAudioState,
            publishVideo: currentVideoState,
            mirror: true,
          });

          if (mainStreamManager instanceof Publisher) {
            await session?.unpublish(mainStreamManager);
          }
          
          if (newPublisher instanceof Publisher) {
            await session?.publish(newPublisher);
          }

          setCurrentVideoDevice(newVideoDevice);
          setMainStreamManager(newPublisher);
          setPublisher(newPublisher);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  const accessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoibWVtYmVyMSIsInJvbGUiOiJST0xFX01FTUJFUiIsImlhdCI6MTY5MTM4MTU4NSwiZXhwIjoxNjkxMzg1MTg1fQ.6nBQcVj6KBuCGo-maNWDCXP25x5AH7m3QgukxHIVoHs";
  const headers = { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' };

  const getToken = async () => {
    const sessionId = await createSession(mySessionId);
    return await createToken(sessionId);
  };

  const createSession = async (sessionId: string) => {
    console.log(222222222)
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
      headers: headers,
    });

    console.log(response.data)

    return response.data; // The sessionId
  };

  const createToken = async (sessionId: string) => {
    console.log(333333)
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
      headers: headers,
    });
    return response.data; // The token
  };

  return (
    <div className="container mx-auto" style={{ width: '100vw', height: '100vh', backgroundColor: 'skyblue' }}>
      {session === undefined ? (
        <div id="join">
          <div id="join-dialog" className="bg-white rounded p-4 mx-auto" style={{ backgroundColor: '#e8e8e8'  }}>
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
                <input className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" name="commit" type="submit" value="JOIN" />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div id="session">
          <div id="session-header" className="flex justify-between items-center">
            <h1 id="session-title" className="text-xl font-bold">{mySessionId}</h1>
            <div>
              <input
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                id="buttonLeaveSession"
                onClick={leaveSession}
                value="Leave session"
              />
              <input
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-2 rounded"
                type="button"
                id="buttonSwitchCamera"
                onClick={switchCamera}
                value="Switch Camera"
              />
              <Button content="캠 on/off" onClick={camOnOff}/>
              <Button content="소리 on/off" onClick={soundOnOff}/>
              <Button content="소리조절" onClick={soundControl}/>
              <Button content="상담 나가기" onClick={roomOut}/>
            </div>
          </div>
          <div className="flex">
            {mainStreamManager !== undefined ? (
              <div id="main-video" className="w-1/2">
                <UserVideoComponent streamManager={mainStreamManager} />
              </div>
            ) : null}
            <div id="video-container" className="w-1/2 flex flex-wrap">
              {mainStreamManager === publisher
                ? 
                subscribers.map((sub) => (
                  <div key={sub.id} className="stream-container w-1/2" onClick={() => handleMainVideoStream(sub)}>
                    <span>{sub.id}</span>
                    <UserVideoComponent streamManager={sub} />
                  </div>
                ))
                : 
                publisher !== undefined ? (
                  <div className="stream-container w-1/2 p-0" onClick={() => handleMainVideoStream(publisher)}>
                    <UserVideoComponent streamManager={publisher} />
                  </div>
                ) : null
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoChatPage;