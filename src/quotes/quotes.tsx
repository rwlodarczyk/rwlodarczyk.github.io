import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import BackHome from "../_general/backhome";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Refresh, Share } from "@mui/icons-material";

const baseQuote = {
  id: -1,
  link: "",
  data: "19.01.1970",
  content: ">.<",
  attachment: "",
};

type QuoteType = typeof baseQuote;

const Quotes = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("q") as unknown as number;

  const [quote, setQuote] = React.useState(baseQuote);
  const [quotes, setQuotes] = React.useState([baseQuote]);
  const [loaded, setLoaded] = React.useState(true);

  const refresh = () => {
    const index = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[index]);
  };

  useEffect(() => {
    const getQuotes = async () => {
      const serverData = await fetchQuotes();
      setQuotes(serverData);
      setLoaded(true);
    };
    void getQuotes();
  }, []);

  useEffect(() => {
    if (loaded) {
      console.log(id);
      const q = quotes.find((q: QuoteType) => q.id == id);
      if (q) {
        setQuote(q);
        return;
      } else {
        const index = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[index]);
      }
    }
  }, [id, loaded, quotes]);

  const fetchQuotes = async () => {
    const res = await fetch(
      "https://raw.githubusercontent.com/rwlodarczyk/teacher-quotes/main/mw-quotes.json"
    );
    const json = (await res.json()) as QuoteType[];
    return json;
  };

  const share = () => {
    void navigator.clipboard.writeText(
      "https://rwlodarczyk.github.io/#/quotes?q=" + quote.id.toString()
    );
  };

  return (
    <React.Fragment>
      <BackHome />
      <Container maxWidth="lg" sx={{ paddingTop: "15pt" }}>
        <Typography variant="h4">
          Cytaty mojego ulubionego nauczyciela
        </Typography>
        <Box sx={{ marginTop: "30pt", marginBottom: "30pt" }}>
          <IconButton onClick={refresh}>
            <Refresh color="primary" />
          </IconButton>
          <IconButton onClick={share}>
            <Share color="primary" />
          </IconButton>
        </Box>
        <Box>
          {loaded && quote.id !== -1 ? (
            <div>
              <Typography variant="h3">"{quote.content}"</Typography>
              <Typography variant="h5">{quote.data}</Typography>
              <Typography variant="h6">{quote.id}</Typography>
              {quote.attachment ? (
                quote.attachment.endsWith(".mp4") ||
                quote.attachment.endsWith(".webm") ? (
                  <video width="50%" height="30%" controls>
                    <source src={quote.attachment} type="video/mp4" />
                  </video>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              {quote.attachment ? (
                quote.attachment.endsWith(".jpg") ||
                quote.attachment.endsWith(".png") ||
                quote.attachment.endsWith(".gif") ? (
                  <img
                    width="50%"
                    height="30%"
                    alt="generated attachment"
                    src={quote.attachment}
                  ></img>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          ) : (
            <CircularProgress style={{ color: "palette.primary" }} />
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Quotes;
