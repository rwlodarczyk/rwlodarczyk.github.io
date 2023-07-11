import { Autocomplete, TextField } from "@mui/material";

type NameSelectProps = {
  opList: string[];
  onChange: (name: string) => void;
  reset: boolean;
};

const NameSelect = (props: NameSelectProps) => {
  return (
    <Autocomplete
      key={(props.reset) ? "reset" : "not reset"}
      freeSolo
      disableClearable
      options={props.opList}
      onChange={(_, v) => props.onChange(v)}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{width: "20%" }}
          label="Choose an operator"
          InputProps={{
            ...params.InputProps,
            type: "search",
            style: { textAlign: "center" },
          }}
        />
      )}
    />
  );
};

export default NameSelect;
