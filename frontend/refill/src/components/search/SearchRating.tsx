import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

interface TypeScore {
  score: number;
}

export default function SearchRating({ score }: TypeScore) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginRight: "0px",
      }}
    >
      <Rating
        name="text-feedback"
        value={score}
        readOnly
        precision={0.1}
        emptyIcon={<StarIcon style={{ opacity: 0.5 }} fontSize="inherit" />}
      />
    </Box>
  );
}
