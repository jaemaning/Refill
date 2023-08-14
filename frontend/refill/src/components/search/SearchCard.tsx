import * as React from "react";
// import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
// import CardActions from '@mui/material/CardActions';
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchRating from "./SearchRating";
import { useNavigate } from "react-router-dom";

interface TypeSearchCardProps {
  name?: string;
  dist?: number;
  addr?: string;
  tel?: string;
  score?: number;
  hospitalId?: number;
}

export default function SearchCard({
  name,
  dist,
  addr,
  tel,
  score,
  hospitalId
}: TypeSearchCardProps) {

  const navigate = useNavigate()

  const handleToDetailHospital = () => {
    const url = `/detailhospital/${hospitalId}`
    navigate(url)
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent sx={{ padding: "24px" }}>
        <Typography
          sx={{ fontSize: "18px", fontWeight: "bold" }}
          component="div"
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {name} <small style={{ color: "grey" }}>{dist}km</small>
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            평점 : {score} <SearchRating score={score || 0}></SearchRating>
          </div>
        </Typography>
        <br />
        <Typography sx={{ mb: 1.5, fontSize: "12px" }} color="text.secondary">
          {addr}
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {tel}
          <Button size="small" onClick={handleToDetailHospital}>병원 상세페이지</Button>
        </div>
      </CardContent>
    </Card>
  );
}
