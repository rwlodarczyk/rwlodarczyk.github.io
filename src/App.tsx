import { Box, CircularProgress, Container, CssBaseline, IconButton, ThemeProvider, Typography, createTheme } from '@mui/material';
import React, { useEffect } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ShareIcon from '@mui/icons-material/Share';
import RefreshIcon from '@mui/icons-material/Refresh';
import './app.css';
import { useSearchParams } from 'react-router-dom';

const baseQuote =
{
  id: -1,
  link: "",
  data: "19.01.1970",
  content: ">.<",
  attachment: "",
}


const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#cccccc'
    },
    background: {
      default: "#242424"
    },
    text: {
      primary: "#cccccc"
    }
  },
  typography: {
    fontFamily: 'Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif',
  }
})

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#242424'
    },
    background: {
      default: "#f5f5f5"
    },
    text: {
      primary: "#121212"
    }
  },
  typography: {
    fontFamily: 'Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif',
  }
})


function App() {
  let [searchParams] = useSearchParams();
  let id = searchParams.get("q");
  console.log(id)

  const [darkMode, setDarkMode] = React.useState(true);
  const [quote, setQuote] = React.useState(baseQuote);
  const [quotes, setQuotes] = React.useState([baseQuote]);
  const [loaded, setLoaded] = React.useState(true);
  const darkIcon = <DarkModeIcon color="primary" />
  const lightIcon = <LightModeIcon color="primary" />

  const refresh = () => {
    const index = Math.floor(Math.random() * quotes.length)
    setQuote(quotes[index])
  }

  useEffect(() => {
    const getQuotes = async () => {
      const serverData = await fetchArticles()
      setQuotes(serverData)
      setLoaded(true)
      const index = Math.floor(Math.random() * serverData.length)
      setQuote(serverData[index])
      if (id && loaded) {
        const q = serverData.find((q: any) => q.id == id)
        if (q) {
          setQuote(q)
        }
      }
    }
    getQuotes()
  }, [id, loaded])

  const fetchArticles = async () => {
    const res = await fetch("https://raw.githubusercontent.com/rwlodarczyk/teacher-quotes/main/mw-quotes.json")
    const json = await res.json()
    return json
  }

  const changeMode = () => {
    setDarkMode(!darkMode);
  }

  const share = () => {
    navigator.clipboard.writeText("https://rwlodarczyk.github.io/?q=" + quote.id)
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ paddingTop: "15pt" }}>
        <Typography variant="h4">Cytaty mojego ulubionego nauczyciela</Typography>
        <Box sx={{ marginTop: "30pt", marginBottom: "30pt" }}>
          <IconButton onClick={refresh}>
            <RefreshIcon color="primary" />
          </IconButton>
          <IconButton onClick={changeMode}>
            {darkMode ? lightIcon : darkIcon}
          </IconButton>
          <IconButton onClick={share}>
            <ShareIcon color="primary" />
          </IconButton>
        </Box>
        <Box>
          {(loaded && quote.id !== -1) ?
            (<div><Typography variant="h3">
              "{quote.content}"
            </Typography>
              <Typography variant="h5">
                {quote.data}
              </Typography>
              <Typography variant="h6">
                {quote.id}
              </Typography>
              {(quote.attachment.endsWith(".mp4") || quote.attachment.endsWith(".webm"))?
              <video width="50%" height="30%" controls>
                <source src={quote.attachment} type="video/mp4"/>
              </video>:""}
              {(quote.attachment.endsWith(".jpg") || quote.attachment.endsWith(".png") || quote.attachment.endsWith(".gif"))?
              <img width="50%" height="30%" alt="generated attachment" src={quote.attachment}></img>:""}

            </div>)
            : (
              <CircularProgress style={{ color: "palette.primary" }} />
            )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
