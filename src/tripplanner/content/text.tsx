import {Box, Typography} from "@mui/material";

type TripContentTextProps = {
    header: string;
    text: string;
}

export const HeaderWrapperStyle = {marginTop: "30px", textAlign: "left"}
export const HeaderTextStyle = {
    display: "inline",
    borderBottom: "3px solid #aa0000",
    paddingInline: "5px",
    paddingBlock: "5px",
    fontSize: "20px"
};
const TextStyle = {paddingInline: "10px", paddingBlock: "10px", textAlign: "justify", textJustify: "inter-word"};

const TripContentText = ({header, text}: TripContentTextProps) => {
    return (
        <>
            <Box sx={HeaderWrapperStyle}>
                <Typography sx={HeaderTextStyle}>{header}</Typography>
            </Box>
            <Typography sx={TextStyle}>
                {text}
            </Typography>
        </>
    );
}

export default TripContentText