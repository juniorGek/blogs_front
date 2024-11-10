import {useSite} from "../../contexts/site";
import {GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api";

const MapView = ({lat, lng, zoom = 12, height = 400}) => {
    const site = useSite()
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: site?.google_map_key,
        libraries: ["places"]
    })

    const center = {
        lat: -3.745,
        lng: -38.523
    }

    return (
        <>
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={{
                        width: "100%",
                        height: height,
                        borderRadius: 5,
                        marginBottom: 8
                    }}
                    center={{lat, lng}}
                    zoom={zoom}
                    options={{
                        disableDefaultUI: true,
                        zoomControl: true,
                        fullscreenControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        zoomControlOptions: {
                            position: 9
                        }
                    }}
                >
                    <Marker position={{lat, lng}}/>
                </GoogleMap>
            )}

        </>
    )
}

export default MapView;