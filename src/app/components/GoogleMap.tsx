'use client'

import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
   width: '100%',
   height: '100%'
};

const center = {
   lat: -34.867438768183256,
   lng: -58.045042439541504
};

function Map() {
   const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.GOOGLEMAPS_KEY || ''
   })

   const [map, setMap] = React.useState(null)

   const onLoad = React.useCallback(function callback(map: any) {

      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map)
   }, [])

   const onUnmount = React.useCallback(function callback(map: any) {
      setMap(null)
   }, [])

   return isLoaded ? (
      <GoogleMap
         mapContainerStyle={containerStyle}
         // className='w-96 h-96'
         center={center}
         zoom={15}
         onLoad={onLoad}
         onUnmount={onUnmount}
      >
         <Marker position={center} />
         <></>
      </GoogleMap>
   ) : <></>
}

export default React.memo(Map)