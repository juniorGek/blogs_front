"use client"

import {Autocomplete, GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api";
import {Form, Modal} from "antd";
import {useEffect, useRef, useState} from "react";
import {MdOutlineMyLocation} from "react-icons/md";
import {FiMap} from "react-icons/fi";
import Button from "../common/button";
import {useSite} from "../../contexts/site";

const LocationInput = ({country, rules, isModal}) => {
    const site = useSite()
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: site?.google_map_key,
        libraries: ["places"]
    })

    const [visible, setVisible] = useState(false);

    const Wrapper = ({children}) => isModal ?
        <Modal
            open={visible}
            onCancel={() => setVisible(false)}
            title="Location"
            footer={null}
           >{children}
        </Modal> : children

    return (
        <>
            <Form.Item
                name="address"
                label="Address"
                rules={rules}
                className="mb-3"
                initialValue={{
                    name: '',
                    lat: '',
                    lng: ''
                }}

            >
                {isLoaded && <MapSelector wrapper={Wrapper} country={country} isModal={isModal} visible={visible} setVisible={setVisible}/>}
            </Form.Item>

        </>
    )
}

export default LocationInput


const MapSelector = ({value, onChange, country, isModal, setVisible, wrapper: Wrapper}) => {
    const [zoom, setZoom] = useState(10);
    const [center, setCenter] = useState({
        lat: -3.745,
        lng: -38.523
    })

    const [map, setMap] = useState(null)

    useEffect(() => {
        if (!!country && !value?.name) {
            let geocoder = new google.maps.Geocoder();
            geocoder.geocode({address: country}).then(({results}) => {
                if (results?.length > 0) {
                    onChange({
                        name: '',
                        lat: results[0]?.geometry?.location?.lat(),
                        lng: results[0]?.geometry?.location?.lng(),
                        country: results[0]?.address_components.find((c) => c.types.includes('country'))?.long_name,
                        city: results[0]?.address_components.find((c) => c.types.includes('locality'))?.long_name
                    })
                }
            })
        }
    }, [country])

    useEffect(() => {
        if (!!value?.lat && !!value?.lng) {
            map?.panTo({
                lat: value?.lat,
                lng: value?.lng
            })
            setZoom(13)
        }
    }, [value])

    const [autocomplete, setAutocomplete] = useState(null);


    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                Notification.error({
                    title: 'Error',
                    message: 'User denied the request for Geolocation.'
                })
                break;
            case error.POSITION_UNAVAILABLE:
                Notification.error({
                    title: 'Error',
                    message: 'Location information is unavailable.'
                })
                break;
            case error.TIMEOUT:
                Notification.error({
                    title: 'Error',
                    message: 'The request to get user location timed out.'
                })
                break;
            case error.UNKNOWN_ERROR:
                Notification.error({
                    title: 'Error',
                    message: 'An unknown error occurred.'
                })
                break;
        }
    }

    const getLocation = location => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({location}).then((response) => {
            if (response.results[0]) {
                onChange({
                    name: response.results[0].formatted_address,
                    lat: location.lat,
                    lng: location.lng,
                    country: response.results[0].address_components.find((c) => c.types.includes('country'))?.long_name,
                    city: response.results[0].address_components.find((c) => c.types.includes('locality'))?.long_name
                })
            }
        })
    }



    return (

        <>

            <div className="position-relative">
                <Autocomplete
                    onLoad={setAutocomplete}
                    onPlaceChanged={() => {
                        let addressObject = autocomplete.getPlace();
                        onChange({
                            name: addressObject.formatted_address,
                            lat: addressObject.geometry.location.lat(),
                            lng: addressObject.geometry.location.lng(),
                            country: addressObject.address_components.find((c) => c.types.includes('country'))?.long_name,
                            city: addressObject.address_components.find((c) => c.types.includes('locality'))?.long_name,
                        })
                    }}
                    // eslint-disable-next-line react/no-children-prop
                    children={<input
                        className="form-control"
                        style={{
                            paddingRight: isModal ? 60 : 32,
                            marginBottom: isModal ? 0 : 16,
                        }}
                        value={value?.name}
                        onChange={(e) => {
                            onChange({
                                ...value,
                                name: e.target.value,
                            })
                        }}
                    />}
                />
                {isModal && (
                    <FiMap
                        className="position-absolute text-dark"
                        role="button"
                        onClick={() => {
                            setVisible(true)
                        }}
                        size={18}
                        style={{
                            right: 36,
                            top: 10,
                        }}
                    />
                )}
                <MdOutlineMyLocation
                    role="button"
                    onClick={() => {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition((position) => {
                                let location = {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude
                                }
                                getLocation(location)
                            }, showError);
                        } else {
                            Notification.error({
                                title: 'Error',
                                message: 'Geolocation is not supported by this browser.'
                            })
                        }
                    }}
                    size={18}
                    style={{
                        right: 10,
                        top: 10,
                    }}
                    className="position-absolute text-dark"/>
            </div>

            <Wrapper>
                <GoogleMap
                    onLoad={setMap}
                    mapContainerStyle={{
                        width: "100%",
                        height: 300,
                        borderRadius: 5,
                        marginBottom: 8
                    }}
                    onClick={(e) => {
                        let location = {
                            lat: e.latLng.lat(),
                            lng: e.latLng.lng()
                        }
                        getLocation(location)
                    }}
                    className="rounded"
                    center={center}
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
                    {value?.lat && value?.lng && <Marker position={{
                        lat: value?.lat,
                        lng: value?.lng
                    }} draggable={true} onDragEnd={(e) => {
                        let location = {
                            lat: e.latLng.lat(),
                            lng: e.latLng.lng()
                        }
                        getLocation(location)
                    }}/>}
                </GoogleMap>
                <div className="mt-3" style={{textAlign: 'right', display: isModal ? 'initial' : 'none'}}>
                    <Button variant="primary" className="d-inline-block" onClick={() => setVisible(false)}>Done</Button>
                </div>
            </Wrapper>


        </>

    )
}