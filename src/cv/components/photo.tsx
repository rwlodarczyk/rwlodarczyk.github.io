import { Box, Typography } from "@mui/material";

const photoStyle = {
  transform: "translateY(-60pt)",
  background: "linear-gradient(#ffffff00, #242424)",
  margin: "0px",
  padding: "0px",
};

const Photo = () => {
  return (
    <div>
      <img
        src="rafisto.jpg"
        width="100%"
        height="350px"
        style={{
          objectFit: "cover",
          objectPosition: "0px -30px",
          margin: "0",
          padding: "0",
        }}
      />
      <Box style={{ ...photoStyle }}>
        <Box style={{ height: "10pt" }} />
        <Typography
          style={{
            textAlign: "center",
            fontSize: "30pt",
          }}
        >
          Rafał <span style={{ textShadow: "0 0 10px #fff" }}>Włodarczyk</span>
        </Typography>
      </Box>
    </div>
  );
};

export default Photo;
