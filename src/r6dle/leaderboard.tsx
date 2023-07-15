import { useState } from "react";
import { Typography } from "@mui/material";
import { LinkTypographyStyle } from "../_general/styles";
import DailyLeaderboard from "./dailyLeaderboard";

const Leaderboard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <>
      <DailyLeaderboard open={open} handleClose={handleClose} />
      <Typography
        variant="subtitle1"
        sx={{ ...LinkTypographyStyle, position: "absolute", top:"45px" }}
        onClick={() => handleClose()}
      >
        &gt; Leaderboard
      </Typography>
    </>
  );
};

export default Leaderboard;
