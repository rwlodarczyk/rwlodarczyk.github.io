import { Box } from "@mui/material";
import skills from "../data/skills.json";
import Skill from "./skill";

const skillsStyle = {
  transform: "translateY(-60pt)",
  background: "#242424",
  paddingBottom:"5px"
};

const titleStyle = {
  textTransform: "uppercase",
  background: "#303030",
  marginRight: "20pt",
  padding: "5px",
  paddingLeft: "10px",
};

const Skills = () => {
  return (
    <Box style={skillsStyle}>
      {skills.map((item) => {
        return (
          <Box key={item.title}>
            <Box sx={titleStyle}>{item.title}</Box>
            <Skill skill={item.content} />
          </Box>
        );
      })}
    </Box>
  );
};

export default Skills;
