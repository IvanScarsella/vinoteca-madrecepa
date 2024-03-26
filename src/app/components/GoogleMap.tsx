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
   });

   const [map, setMap] = React.useState(null);

   const onLoad = React.useCallback(function callback(map: any) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map);
   }, []);

   const onUnmount = React.useCallback(function callback(map: any) {
      setMap(null);
   }, []);

   // Modificar la URL de la imagen del mapa para eliminar el token
   const modifiedMapImageUrl = 'satellite'; // Reemplazar 'URL del mapa sin token' con la URL del mapa sin el token

   return isLoaded ? (
      <GoogleMap
         mapContainerStyle={containerStyle}
         center={center}
         zoom={10}
         onLoad={onLoad}
         onUnmount={onUnmount}
         // Cambiar la URL del mapa a la versión modificada
         mapTypeId={modifiedMapImageUrl}
      >
         <Marker position={center} />
         <></>
      </GoogleMap>
   ) : <></>;
}


export default React.memo(Map)