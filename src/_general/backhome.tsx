import { Typography } from "@mui/material";
import { LinkTypographyStyle } from "./styles";
import { useNavigate } from "react-router-dom";

const BackHome = () => {
  const navigate = useNavigate();
  const handleClick = (link: string) => {
    navigate(link);
  };
  return (
    <Typography
      variant="subtitle1"
      sx={{ ...LinkTypographyStyle, position: "absolute" }}
      onClick={() => handleClick("/")}
    >
      &lt; Homepage
    </Typography>
  );
};

export default BackHome;
