import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import {CardTravel} from "@mui/icons-material";

type TripTitleProps = {
    title: string;
    date: string;
}

const TripTitle = ({title,date}:TripTitleProps) => {
    return (
        <AppBar position="static" sx={{backgroundColor: "#aa0000", borderRadius: "10px"}}>
            <Toolbar sx={{justifyContent: "center"}}>
                <CardTravel sx={{fontSize: "30pt"}}/>
                <Box flexGrow="1"/>
                <Typography variant="h3">{title}</Typography>
                <Box flexGrow="1"/>
                <Typography>{date}</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default TripTitle;