import React from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Select from 'react-select';
import { data } from 'jquery';

const containerStyle = {
    width: '730px',
    height: '40px'
};
const theme = theme => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary25: "#e0e0e0",
        primary: '#444444'
    }
});
const center = {
    lat: 32.0998,
    lng: 76.2691
};

function MyComponent(props) {
    const [map, setMap] = React.useState(null)
    const [isActive, setisActive] = React.useState(false)
    const [selected, setSelected] = React.useState({});
    console.log(props.stateContent, "in the data propss")

    const onLoad = React.useCallback(function callback(map) {
        // const bounds = new window.google.maps.LatLngBounds();
        // map.fitBounds(bounds);
        // setMap(map)
    }, [])
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
        setisActive(true)
    }, [])

    const onSelect = item => {
        console.log('item', item);
        setSelected(item);
    }

    return (
        <>
            <LoadScript
                googleMapsApiKey="AIzaSyCnyJJ2gorvX0rsuhBJLNUsfyioWSSep2Q"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    {
                        props.mapData && props.stateContent ? props.stateContent.map((data) => {
                            return (
                                <Marker key={data.id}
                                    position={{ lat: Number(data.lat), lng: Number(data.lang) }}
                                    onClick={() => onSelect(data)}
                                >
                                    {
                                        selected.id === data.id &&
                                        (
                                            <InfoWindow
                                                position={{ lat: Number(data.lat), lng: Number(data.lang) }}
                                                clickable={true}
                                                onCloseClick={() => setSelected({})}
                                            >
                                                <div className="map_over_box">

                                                    <span className="map_overlay_img"><img src={`https://admin.formeeexpress.com/uploads/maplogo/${data.image}`} height="100px" width="100px" /></span>
                                                    <span>
                                                        <p>{data.address}</p>
                                                        <a>Find out more</a>
                                                    </span>
                                                </div>
                                            </InfoWindow>
                                        )
                                    }
                                </Marker>
                            )
                        }) :
                            props.mapData && props.mapData.map((data) => {
                                return (
                                    <Marker key={data.id}
                                        position={{ lat: Number(data.lat), lng: Number(data.lang) }}
                                        onClick={() => onSelect(data)}
                                    >
                                        {
                                            selected.id === data.id &&
                                            (
                                                <InfoWindow
                                                    position={{ lat: Number(data.lat), lng: Number(data.lang) }}
                                                    clickable={true}
                                                    onCloseClick={() => setSelected({})}
                                                >
                                                    <div className="map_over_box">

                                                        <span className="map_overlay_img"><img src={`https://admin.formeeexpress.com/uploads/maplogo/${data.image}`} height="100px" width="100px" /></span>
                                                        <span>
                                                            <p>{data.address}</p>
                                                            <a>Find out more</a>
                                                        </span>
                                                    </div>

                                                </InfoWindow>
                                            )
                                        }
                                    </Marker>
                                )
                            })
                    }

                </GoogleMap>
            </LoadScript>
        </>
    )
}

export default React.memo(MyComponent)
