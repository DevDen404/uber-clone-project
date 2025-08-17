import React, { useState, useEffect, useRef } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: "750px"
}

const defaultCenter = {
  lat: -3.745,
  lng: -38.523
}

const LiveTracking = ({ mapPanelOpen }) => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter)
  const intervalRef = useRef(null)

  // Get initial location only once on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      setCurrentPosition({
        lat: latitude,
        lng: longitude
      })
    }, (error) => {
      console.error("Error getting initial location", error)
    }, {
      enableHighAccuracy: true
    })
  }, [])
  
  // Start polling every 10 seconds only when mapPanelOpen is true
  useEffect(() => {
    if (mapPanelOpen) {
      intervalRef.current = setInterval(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords
          setCurrentPosition({
            lat: latitude,
            lng: longitude
          })
        }, (error) => {
          console.error("Error updating location", error)
        }, {
          enableHighAccuracy: true
        })
      }, 10000)
    } else {
      // Clear interval if map is not open
      clearInterval(intervalRef.current)
    }

    // Cleanup on unmount or mapPanelOpen change
    return () => clearInterval(intervalRef.current)
  }, [mapPanelOpen])

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={currentPosition} zoom={15}>
        <Marker position={currentPosition} />
      </GoogleMap>
    </LoadScript>
  )
}

export default LiveTracking
