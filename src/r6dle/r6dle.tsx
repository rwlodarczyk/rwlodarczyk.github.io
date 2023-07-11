import { Box, Button, Typography } from "@mui/material";
import r6ops from "./r6ops.json";
import NameSelect from "./nameSelect";
import { useState } from "react";
import Guesses from "./guesses";
import BackHome from "../_general/backhome";

const R6dle = () => {
  const restartPage = () => {
    window.location.reload();
  };

  const opList = Object.keys(r6ops);

  const [op] = useState(opList[Math.floor(Math.random() * opList.length)]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [victory, setVictory] = useState(false);

  const [correct, setCorrect] = useState(false);
  const [selectedOp, setSelectedOp] = useState("");
  const [input, resetInput] = useState(false);

  const onNameChange = (name: string) => {
    if (opList.includes(name)) {
      setCorrect(true);
      setSelectedOp(name);
    } else {
      setCorrect(false);
    }
  };

  const onReturn = (name: string) => {
    guessOp(name);
  };

  const guessOp = (name?: string) => {
    if (name) {
      if (opList.includes(name)) {
        resetInput(!input);
        if (name === op) {
          setVictory(true);
        }
        setGuesses(Array.from(new Set([...guesses, name])));
      }
    } else {
      setSelectedOp("");
      setCorrect(false);
      resetInput(!input);
      if (correct) {
        if (selectedOp === op) {
          setVictory(true);
        }
        setGuesses(Array.from(new Set([...guesses, selectedOp])));
      }
    }
  };

  return (
    <Box sx={{ margin: "20px", textAlign: "center" }}>
      <BackHome />
      <Typography variant="h1">R6dle</Typography>
      <Typography variant="subtitle1">Guess the correct operator</Typography>
      <Box sx={{ margin: "60px" }}>
        {!victory ? (
          <>
            <NameSelect
              opList={opList}
              guessed={guesses}
              onChange={onNameChange}
              onReturn={onReturn}
              reset={input}
            />
            {correct && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ margin: "15px", width: "40%" }}
                  onClick={() => guessOp()}
                >
                  <Typography>Guess</Typography>
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            <img
              src={`/r6opicons/${op.toLowerCase()}.svg`}
              alt={op}
              width="50px"
            />
            <Typography>{op}</Typography>
            <br />
            <Typography>
              Congratulations, you've chosen the correct operator!
            </Typography>
            <br />
            <Button
              variant="contained"
              sx={{ margin: "15px", width: "10%" }}
              color="success"
              onClick={restartPage}
            >
              <Typography>One more game</Typography>
            </Button>
          </>
        )}
      </Box>
      <Guesses
        guesses={guesses}
        correct={r6ops[op as keyof typeof r6ops]}
        op={op}
      />
    </Box>
  );
};

export default R6dle;
