import { Typography } from "@mui/material";

type CheckParameterProps = {
  parameter: string;
  correct: { [key: string]: string | string[] | number };
  check: { [key: string]: string | string[] | number };
};

const CheckParameter = ({ parameter, correct, check }: CheckParameterProps) => {
  if (Array.isArray(check[parameter as keyof typeof check])) {
    const result: { key: string; value: string }[] = [];
    (check[parameter as keyof typeof check] as string[]).forEach((element) => {
      result.push({
        key: element,
        value: (correct[parameter] as string[]).includes(element)
          ? "#00ff00"
          : "#ff0000",
      });
    });
    return (
      <>
        {result.map((element) => {
          return (
            <Typography sx={{ color: element.value }}>{element.key}</Typography>
          );
        })}
      </>
    );
  } else {
    return (
      <Typography
        sx={{
          color:
            correct[parameter] === check[parameter] ? "#00ff00" : "#ff0000",
        }}
      >
        {check[parameter as keyof typeof check]}
      </Typography>
    );
  }
};

export default CheckParameter;
