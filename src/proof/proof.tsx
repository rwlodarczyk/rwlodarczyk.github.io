import React, { useState } from "react";
import BackHome from "../_general/backhome";
import proof from "./proof.json";
import { Box, IconButton, Typography } from "@mui/material";
import { Cached } from "@mui/icons-material";

const Proof = () => {
  const mapValues = () => {
    return ["start", "mid", "end"].map((x) =>
      Math.floor(Math.random() * proof[x as keyof typeof proof].length)
    );
  };
  const [randoms, setRandoms] = useState<number[]>(mapValues());

  const regenerateSentence = () => {
    setRandoms(mapValues());
  };
  return (
    <React.Fragment>
      <BackHome />
      <Typography variant="h4">Proof step skipper</Typography>
      <IconButton onClick={regenerateSentence} sx={{ marginTop: "20px" }}>
        <Cached />
      </IconButton>
      <Box
        sx={{
          margin: "auto",
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Typography variant="h3">
          "{proof["start"][randoms[0]]} {proof["mid"][randoms[1]]}{" "}
          {proof["end"][randoms[2]]}"
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default Proof;
