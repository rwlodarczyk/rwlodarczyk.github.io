import { Box, Grid, Link, Slider, Typography } from "@mui/material";

type SkillProp = {
  skill:
    | string[]
    | {
        type: string;
        name: string;
        href: string;
      }[]
    | {
        type: string;
        name: string;
        level: number;
      }[];
};

type LinkType = { type: string; name: string; href: string };
type SkillType = { type: string; name: string; level: string };

const TextStyle = {
  marginInline: "10px",
  marginBlock: "5px",
};

const LinkStyle = {
  textAlign: "center",
  textDecoration: "none",
  margin: "15px",
};

const Skill = ({ skill }: SkillProp) => {
  const render = skill.map((item) => {
    if (typeof item == "string") {
      return (
        <Typography key={item} sx={TextStyle}>
          {item}
        </Typography>
      );
    } else if (item.type == "Link") {
      return (
        <Link
          key={item.name}
          href={(item as unknown as LinkType).href}
          sx={LinkStyle}
        >
          <Typography>{item.name}</Typography>
        </Link>
      );
    } else if (item.type == "Skill") {
      return (
        <Box key={item.name} sx={{ marginRight: "30pt" }}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography
                sx={{ textAlign: "right", transform: "translateY(50%)" }}
              >
                {item.name}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Slider
                aria-label="Temperature"
                defaultValue={parseInt((item as unknown as SkillType).level)}
                min={10}
                max={100}
                disabled
              />
            </Grid>
          </Grid>
        </Box>
      );
    } else {
      return <>Skill type unsupported</>;
    }
  });
  return render;
};

export default Skill;
