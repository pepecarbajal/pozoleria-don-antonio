import React, { useEffect, useState } from 'react'

let isScriptLoaded = false;

export default function LocationMap() {
  const[mapElement, setMapElement] = useState(null)
  const location = { lat: 17.5519, lng: -99.5019 } // Coordenadas de Chilpancingo, Guerrero

  useEffect(() => {
    if (!mapElement) return;

    const loadMap = () => {
      if (!window.google || !window.google.maps) {
        console.error('Google Maps API not loaded');
        return;
      }

      const map = new window.google.maps.Map(mapElement, {
        center: location,
        zoom: 15,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }],
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }],
          },
        ],
      });

      // Add marker
      new window.google.maps.Marker({
        position: location,
        map: map,
        title: "Restaurante Don Antonio"
      });
    };

    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        loadMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC2e8vbsZOlmldb0KjVql0DtFEoZmyNY8w&callback=initMap&libraries=maps,marker&v=beta`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      window.initMap = () => {
        isScriptLoaded = true;
        loadMap();
      };
    };

    loadGoogleMapsScript();

    return () => {
      // Cleanup
      if (window.google && window.google.maps) {
        window.google.maps = undefined;
      }
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, [mapElement]);

  return (
    <div ref={setMapElement} className="w-full h-[400px] rounded-lg" />
  );
}

