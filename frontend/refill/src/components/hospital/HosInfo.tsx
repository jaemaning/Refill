import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styled from "@emotion/styled";
import { createTheme } from "@mui/material/styles";

interface Time {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

interface TimeData {
  timeData: Time[];
}

interface Info {
  address: string;
  tel: string;
  email: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#20A4F3",
    },
  },
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px 40px;
  width: 600px;
`;

const Content = styled.div`
  display: flex;
  padding: 4px 0px;
`;

const Text = styled.span`
  color: gray;
  padding: 0px 40px;
  font-size: 20px;
`;

const TiemText = styled.span`
  color: gray;
  padding: 0px 15px;
  font-size: 20px;
`;

const HosInfo: React.FC<TimeData & Info> = ({
  timeData,
  address,
  tel,
  email,
}) => {
  return (
    <Container>
      <Content>
        <LocationOnIcon color="primary" />
        <Text>{address}</Text>
      </Content>
      <Content>
        <CallIcon color="primary" />
        <Text>{tel}</Text>
      </Content>
      <Content>
        <AlternateEmailIcon color="primary" />
        <Text>{email}</Text>
      </Content>
      <Content>
        <AccessTimeIcon color="primary" />
        <div>
          {timeData.map((time, index) => (
            <div key={index} className="flex justify-between items-center">
              <Text>{time.dayOfWeek}</Text>
              <div>
                <TiemText>
                  {time.startTime.split(":")[0]}:{time.startTime.split(":")[1]}{" "}
                  ~{time.endTime.split(":")[0]}:{time.endTime.split(":")[1]}
                </TiemText>
              </div>
            </div>
          ))}
        </div>
      </Content>
    </Container>
  );
};

export default HosInfo;
