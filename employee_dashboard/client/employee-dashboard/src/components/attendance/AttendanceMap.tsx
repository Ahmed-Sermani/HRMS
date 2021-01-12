import React, { useState, useEffect, useContext } from 'react'
import { GoogleMap, Marker, withGoogleMap, withScriptjs, Polygon } from "react-google-maps"
import { Spin } from 'antd'
import { shiftSubContext } from '../../context';

const AttendanceProxyMap = withScriptjs(withGoogleMap(() => {

const shiftSub = useContext(shiftSubContext)

  const [location, setLocation] = useState({})
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {

      setLocation({
        //@ts-ignore
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })

    })
  }, [])

  // @ts-ignore
  if (location.hasOwnProperty('lat') && location.hasOwnProperty('lng')) {
    return (
      <GoogleMap
        defaultZoom={18}
        defaultCenter={location}
      >
        <Polygon
          defaultPaths={shiftSub?.shift?.polygon}
        />
        <Marker clickable title='Your Location' position={location} />
      </GoogleMap>
    )
  }
  else {
    return (<Spin />)
  }
}
)
)


const AttendanceMap = () => (
  <AttendanceProxyMap
    //@ts-ignore
    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&libraries=geometry,drawing,places`}
    //@ts-ignore
    loadingElement={<div style={{ height: `100%` }} />}
    //@ts-ignore
    containerElement={<div style={{ height: `600px` }} />}
    //@ts-ignore
    mapElement={<div style={{ height: `100%` }} />}
  />
)



export default AttendanceMap

