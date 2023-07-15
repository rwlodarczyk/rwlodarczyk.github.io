import { Box, Typography } from "@mui/material";

type SummaryProps = {
  title: string;
  description: {
    title?: string;
    content: string;
  }[];
};

const frameStyle = {
  margin: "15px",
};

const titleStyle = {
  marginTop: "10px",
  backgroundColor: "#39ace7",
  textTransform: "uppercase",
  padding: "5px",
};

const titleText = {
  marginInline: "10px",
  fontSize: "18px",
};

const contentStyle = {
  padding: "10px",
};

const describeText = {
  justifyContent: "center",
  marginInline: "20px",
};

const subTitleText = {
  marginInline: "10px",
  fontSize: "20px",
};

const subDescribText = {
  justifyContent: "center",
  marginInline: "25px",
};

const Summary = ({ title, description }: SummaryProps) => {
  return (
    <Box sx={frameStyle}>
      <Box sx={titleStyle}>
        <Typography style={titleText}>{title}</Typography>
      </Box>
      <Box sx={contentStyle}>
        {description.map((item) => {
          return (
            <div key={item.content}>
              {"title" in item ? (
                <Box>
                  <Typography sx={subTitleText}>{item.title}</Typography>
                  <Typography sx={subDescribText}>{item.content}</Typography>
                </Box>
              ) : (
                <Box>
                  <Typography sx={describeText}>{item.content}</Typography>
                </Box>
              )}
            </div>
          );
        })}
      </Box>
    </Box>
  );
};

export default Summary;
