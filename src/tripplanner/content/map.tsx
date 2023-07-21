import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import './map.css';
import {Box, Typography} from "@mui/material";
import {HeaderTextStyle, HeaderWrapperStyle} from "./text.tsx";

export type TripContentMapProps = {
    obj: {
        settings: {
            [key: string]: string
        },
        points: {
            [key: string]: string
        }[]
    }

}

const TripContentMap = ({obj}: TripContentMapProps) => {
    return (
        <>
            <Box sx={{...HeaderWrapperStyle,marginBottom:"20px"}}>
                <Typography sx={HeaderTextStyle}>{obj.settings.header}</Typography>
            </Box>
            <MapContainer center={[parseFloat(obj.settings.lat), parseFloat(obj.settings.lon)]} zoom={parseInt(obj.settings.zoom)} scrollWheelZoom={true} style={{height: "500px"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {obj.points.map((point,i) => {
                    return <Marker key={i} position={[parseFloat(point.lat), parseFloat(point.lon)]}>
                        <Popup>
                            A pretty CSS3 popup. <br/> Easily customizable.
                        </Popup>
                    </Marker>
                })}
            </MapContainer>
        </>
    );
}

export default TripContentMap