import React from "react";
import BackHome from "../_general/backhome";
import ReactECharts from "echarts-for-react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SliderWrapper from "./sliderWrapper";

const GaussGraph = (x_data: number[], y_data: number[]) => {
  return {
    xAxis: {
      type: "category",
      data: x_data,
    },
    yAxis: {
      type: "value",
      min: 0.0,
      max: 1.0,
    },
    series: [
      {
        data: y_data,
        markLine: {
          symbol: ["none", "none"],
          label: { show: false },
          data: [
            { xAxis: 0 },
            { xAxis: 10 },
            { xAxis: 15 },
            { xAxis: 20 },
            { xAxis: 25 },
            { xAxis: 30 },
          ],
        },
        type: "line",
        symbol: "none",
        smooth: true,
        areaStyle: {},
      },
    ],
  };
};

const MarkGenerator = () => {
  const [b, setB] = React.useState<number>(3);
  const [c, setC] = React.useState<number>(1);
  const [students, setStudents] = React.useState<number>(15);
  const GaussFunction = (x: number, a?: number, b?: number, c?: number) => {
    a = a ? a : 1;
    b = b ? b : 0;
    c = c ? c : 1;
    return a * Math.exp((-1 * Math.pow(x - b, 2)) / (2 * Math.pow(c, 2)));
  };

  const x_data = Array.from(Array(31), (_, x) => x / 10 + 2);
  const y_data = Array.from(Array(31), (_, x) =>
    GaussFunction(x / 10 + 2, 1, b, c)
  );

  const grades = [2.0, 3.0, 3.5, 4.0, 4.5, 5.0];
  const gradeProb = grades.map((grade) => {
    return GaussFunction(grade, 1, b, c);
  });
  const gradeSum = gradeProb.reduce((a, b) => a + b, 0);

  return (
    <React.Fragment>
      <BackHome />
      <Typography variant="h4">Mark Generator (for the lazy)</Typography>
      <Typography>
        Score fixing is justified if it follows a normal distribution. ~
        Somebody
      </Typography>
      <Box maxWidth="md" margin="auto">
        <ReactECharts option={GaussGraph(x_data, y_data)} />
        <SliderWrapper
          sliderProps={{
            currentValue: b,
            setCurrentValue: setB,
            min: 2,
            max: 5,
          }}
          text={"Current b = " + b.toFixed(2).toString()}
        />
        <SliderWrapper
          sliderProps={{
            currentValue: c,
            setCurrentValue: setC,
            min: 0.1,
            max: 5,
          }}
          text={"Current c = " + c.toFixed(2).toString()}
        />
        <SliderWrapper
          sliderProps={{
            currentValue: students,
            setCurrentValue: setStudents,
            min: 1,
            max: 30,
            step: 1,
          }}
          text={"Student count = " + students.toFixed(2).toString()}
        />
        <TableContainer component={Paper}>
          <Typography sx={{ margin: "20px" }} variant="h6">
            Fixed Results
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Grade</TableCell>
                <TableCell>Percentage of students</TableCell>
                <TableCell align="right">Number of students</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gradeProb.map((prob, index) => (
                <TableRow>
                  <TableCell>{grades[index].toFixed(1)}</TableCell>
                  <TableCell align="right">
                    {((prob / gradeSum) * 100).toFixed(2)}%
                  </TableCell>
                  <TableCell align="right">
                    {((prob / gradeSum) * students).toFixed(0)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </React.Fragment>
  );
};

export default MarkGenerator;
