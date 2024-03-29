import React from "react";
import r6ops from "./r6ops.json";
import Guesses from "./guesses";
import BackHome from "../_general/backhome";
import RightData from "../_general/rightdata";
import NameSelect from "./nameSelect";
import Leaderboard from "./leaderboard";
import { TokenSave } from "./API/tokenSave";
import { DailyOperator } from "./API/dailyOperator";
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

type R6dleLocal = {
  op: string;
  opList: string[];
  guesses: string[];
  victory: boolean;
  correct: boolean;
  selectedOp: string;
  input: boolean;
};

const R6dle = () => {
  const opList = Object.keys(r6ops);

  const [token, setToken] = useState<string>("");
  const [dailySha, setDailySha] = useState<string>("");

  const [playDaily] = useState<boolean>(false);
  const [dailyOperator, setDailyOperator] = useState<string>("");

  useEffect(() => {
    const getToken = async () => {
      const tokenSave = await TokenSave();
      setToken(tokenSave.status == "success" ? tokenSave.token : "");

      const dailyOperator = await DailyOperator(
        tokenSave.status == "success" ? tokenSave.token : ""
      );
      setDailyOperator(
        dailyOperator.status == "success" ? dailyOperator.data : ""
      );
      setDailySha(dailyOperator.status == "success" ? dailyOperator.sha : "");
    };

    void getToken();
  }, []);

  const [localState, setLocalState] = useState<R6dleLocal>({
    op: opList[Math.floor(Math.random() * opList.length)],
    opList: opList,
    guesses: [],
    victory: false,
    correct: false,
    selectedOp: "",
    input: false,
  });

  const restartPage = () => {
    window.location.reload();
  };

  const onNameChange = (name: string) => {
    if (opList.includes(name)) {
      setLocalState({ ...localState, correct: true, selectedOp: name });
      guessOp(name);
    } else {
      setLocalState({ ...localState, correct: false });
    }
  };

  const onReturn = (name: string) => {
    guessOp(name);
  };

  const getCorrectOP = () => {
    if (playDaily) {
      return dailyOperator;
    } else {
      return localState.op;
    }
  };

  const guessOp = (name?: string) => {
    const currentState = { ...localState };
    if (name) {
      if (opList.includes(name)) {
        currentState.input = !currentState.input;
        if (name === getCorrectOP()) {
          currentState.victory = true;
        }
        currentState.guesses = Array.from(
          new Set([...localState.guesses, name])
        );
      }
    } else {
      currentState.selectedOp = "";
      currentState.correct = false;
      currentState.input = !currentState.input;
      if (localState.correct) {
        if (localState.selectedOp === getCorrectOP()) {
          currentState.victory = true;
        }
        currentState.guesses = Array.from(
          new Set([...localState.guesses, localState.selectedOp])
        );
      }
    }
    setLocalState(currentState);
  };

  return (
    <React.Fragment>
      <BackHome />
      <Leaderboard />
      <RightData text={["API Debug", `token:${token}`, `sha256:${dailySha}`]} />
      <Typography variant="h1">R6dle</Typography>
      <Typography variant="subtitle1">Guess the correct operator</Typography>
      {/* {dailyOperator} */}
      <Box sx={{ margin: "60px" }}>
        {!localState.victory ? (
          <>
            <NameSelect
              opList={opList}
              guessed={localState.guesses}
              onChange={onNameChange}
              onReturn={onReturn}
              reset={localState.input}
            />
            {localState.correct && (
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
              src={`/r6opicons/${getCorrectOP().toLowerCase()}.svg`}
              alt={getCorrectOP()}
              width="50px"
            />
            <Typography>{getCorrectOP()}</Typography>
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
        guesses={localState.guesses}
        correct={r6ops[getCorrectOP() as keyof typeof r6ops]}
        op={getCorrectOP()}
      />
    </React.Fragment>
  );
};

export default R6dle;
