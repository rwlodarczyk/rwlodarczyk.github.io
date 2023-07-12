import { Grid, Typography } from "@mui/material";
import SliderSelector, { SliderSelectorProps } from "./sliderSelector";

type SliderWrapperProps = {
  sliderProps: SliderSelectorProps;
  text: string;
};

const SliderWrapper = (props: SliderWrapperProps) => {
  return (
    <Grid container>
      <Grid item xs={4}>
        <Typography>{props.text}</Typography>
      </Grid>
      <Grid item xs={8}>
        <SliderSelector {...props.sliderProps} />
      </Grid>
    </Grid>
  );
};

export default SliderWrapper;
