import { Box, List, ListItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LinkTypographyStyle } from "./_general/styles";

const routes = [
  {
    name: "R6dle",
    path: "/r6dle",
  },
  {
    name: "Quotes",
    path: "/quotes",
  },
  {
    name: "Mark generator",
    path: "/mark",
  },
  {
    name: "Proof step skipper",
    path: "/proof",
  },
  {
    name: "Resume (polish)",
    path: "/cv",
  },
  {
    name: "Trip Planner",
    path: "/itinerary"
  }
];

const App = () => {
  const navigate = useNavigate();

  const handleClick = (link: string) => {
    navigate(link);
  };

  return (
    <Box margin="20px">
      <Typography>Select the application</Typography>
      <List>
        {routes.map((route) => (
          <ListItem>
            <Typography
              onClick={() => handleClick(route.path)}
              sx={LinkTypographyStyle}
            >
              &gt; {route.name}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default App;
