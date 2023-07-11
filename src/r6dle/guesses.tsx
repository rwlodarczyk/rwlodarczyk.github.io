import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import r6ops from "./r6ops.json";
import CheckParameter from "./checkParameter";

type GuessesProps = {
  correct: { [key: string]: string | string[] | number };
  guesses: string[];
};

const Guesses = (props: GuessesProps) => {
  return (
    <TableContainer component={Paper} sx={{ width: "80%", margin: "auto" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ minWidth: 650, borderTop: "1px solid #6f00f7ff" }}>
          <TableRow>
            <TableCell>Icon</TableCell>
            <TableCell>Operator</TableCell>
            <TableCell align="right">Sex</TableCell>
            <TableCell align="right">Continent</TableCell>
            <TableCell align="right">Release Year</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Speed</TableCell>
            <TableCell align="right">Gadgets</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.guesses
            .map((_, index) => props.guesses[props.guesses.length - 1 - index])
            .map((guess) => {
              const selected_op = r6ops[guess as keyof typeof r6ops];
              return (
                <TableRow
                  key={guess}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <img
                      src={`/r6opicons/${guess.toLowerCase()}.svg`}
                      alt={guess}
                      width="50px"
                    />
                  </TableCell>
                  <TableCell>{guess}</TableCell>
                  <TableCell align="right">
                    <CheckParameter
                      parameter="sex"
                      correct={props.correct}
                      check={selected_op}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <CheckParameter
                      parameter="continent"
                      correct={props.correct}
                      check={selected_op}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <CheckParameter
                      parameter="release_year"
                      correct={props.correct}
                      check={selected_op}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <CheckParameter
                      parameter="role"
                      correct={props.correct}
                      check={selected_op}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <CheckParameter
                      parameter="speed"
                      correct={props.correct}
                      check={selected_op}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <CheckParameter
                      parameter="gadgets"
                      correct={props.correct}
                      check={selected_op}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Guesses;
