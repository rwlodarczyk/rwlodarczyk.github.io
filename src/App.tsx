import { Box, CircularProgress, Container, CssBaseline, IconButton, ThemeProvider, Typography, createTheme } from '@mui/material';
import React, { useEffect } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ShareIcon from '@mui/icons-material/Share';
import RefreshIcon from '@mui/icons-material/Refresh';
import './app.css';
import { Link, useParams } from 'react-router-dom';

const baseQuote =
{
  id: -1,
  link: "",
  data: "19.01.1970",
  content: ">.<"
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
  let { id } = useParams();

  const [darkMode, setDarkMode] = React.useState(true);
  const [quote, setQuote] = React.useState(baseQuote);
  const [quotes, setQuotes] = React.useState([baseQuote]);
  const [loaded, setLoaded] = React.useState(true);
  const darkIcon = <DarkModeIcon color="primary" />
  const lightIcon = <LightModeIcon color="primary" />

  useEffect(() => {
    const getQuotes = async () => {
      const serverData = await fetchArticles()
      setLoaded(true)
      setQuotes(serverData)
      console.log(id)
      if (id === undefined || id == null) {
        const index = Math.floor(Math.random() * quotes.length)
        setQuote(quotes[index])
      }
      if (id && loaded) {
        console.log(serverData)
        const q = serverData.find((q: any) => q.id == id)
        console.log(q)
        if (q) {
          setQuote(q)
        }
      }
    }
    getQuotes()
  }, [])

  const fetchArticles = async () => {
    const res = await fetch("https://raw.githubusercontent.com/rwlodarczyk/teacher-quotes/main/mw-quotes.json")
    const json = await res.json()
    return json
  }

  const changeMode = () => {
    setDarkMode(!darkMode);
  }

  const refresh = () => {
    const index = Math.floor(Math.random() * quotes.length)
    setQuote(quotes[index])
  }

  const share = () => {
    navigator.clipboard.writeText("https://rwlodarczyk.github.io/" + quote.id)
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
