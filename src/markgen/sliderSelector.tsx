import { Slider } from "@mui/material";

export type SliderSelectorProps = {
  currentValue: number;
  setCurrentValue: (percentage: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

const SliderSelector = (props: SliderSelectorProps) => {
  return (
    <>
      <Slider
        aria-label="Slider Selector"
        defaultValue={props.currentValue}
        step={props.step ? props.step : 0.1}
        min={props.min ? props.min : -5}
        max={props.max ? props.max : 5}
        sx={{ width: "80%" }}
        onChange={(_, v) => props.setCurrentValue(v as number)}
      ></Slider>
    </>
  );
};

export default SliderSelector;
