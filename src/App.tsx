import { Box, CircularProgress, Container, CssBaseline, IconButton, ThemeProvider, Typography, createTheme } from '@mui/material';
import React, { useEffect } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import RefreshIcon from '@mui/icons-material/Refresh';
import './app.css';
import mwcytaty from './mwcytaty.json';

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
  const [darkMode, setDarkMode] = React.useState(true);
  // const [quotes, setQuotes] = React.useState(mwcytaty);
  const [quote, setQuote] = React.useState(baseQuote);
  const [loaded, setLoaded] = React.useState(true);
  const darkIcon = <DarkModeIcon color="primary"/>
  const lightIcon = <LightModeIcon color="primary"/>

  useEffect(() => {
    refresh()
  },[])

  // useEffect(() => {
  //   const getQuotes = async () => {
  //     const serverData = await fetchArticles()
  //     setLoaded(true)
  //     setQuotes(serverData)
  //   }
  //   getQuotes()
  // }, [])

  // const fetchArticles = async () => {
  //   const res = await fetch("")
  //   const json = await res.json()
  //   return json
  // }

  const changeMode = () => {
    setDarkMode(!darkMode);
  }
  
  const refresh = () => {
    const index = Math.floor(Math.random() * mwcytaty.length)
    setQuote(mwcytaty[index])
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline/>
      <Container maxWidth="lg" sx={{paddingTop:"15pt"}}>
        <Typography variant="h4">Cytaty mojego ulubionego nauczyciela</Typography>
        <Box sx={{marginTop:"30pt",marginBottom:"30pt"}}>
        <IconButton onClick={refresh}>
          <RefreshIcon color="primary"/>
        </IconButton>
        <IconButton onClick={changeMode}>
          {darkMode ? lightIcon : darkIcon}
        </IconButton>
        </Box>
        <Box>
        {(loaded) ? 
        (<div><Typography variant="h3">
          "{quote.content}"
        </Typography>
        <Typography variant="h4">
          {quote.data.split(' ')[0]}
        </Typography></div>)
        :(
          <CircularProgress style={{color:"palette.primary"}}/>
        )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
