import { Box, Grid } from "@mui/material";
import Summary from "./components/summary";
import information from "./data/information.json";
import Photo from "./components/photo";
import Skills from "./components/skills";

import BackHome from "../_general/backhome";

type Information = { title: string; content: string };

const CurriculumVitae = () => {
  return (
    <>
      <BackHome />
      <Box
        maxWidth="lg"
        margin="auto"
        sx={{ textAlign: "left", transform: "translateY(-20px)" }}
      >
        <Grid container>
          <Grid item lg={4} md={6} xs={12}>
            <Photo />
            <Skills />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            {information.map((item) => (
              <div key={item.title}>
                {Array.isArray(item.description) ? (
                  <>
                    <Summary
                      title={item.title}
                      description={item.description as Information[]}
                    />
                  </>
                ) : (
                  <>
                    <Summary
                      title={item.title}
                      description={[item.description as Information]}
                    />
                  </>
                )}
              </div>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CurriculumVitae;
