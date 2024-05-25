import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import { fetchGPSData } from '../utils/fetchGPSData';
import { identifyStoppages } from '../utils/identifyStoppages';

const MapView = ({ threshold }) => {
  const [gpsData, setGpsData] = useState([]);
  const [stoppages, setStoppages] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchGPSData();
      setGpsData(data);
      const stoppages = identifyStoppages(data, threshold);
      setStoppages(stoppages);
    };
    getData();
  }, [threshold]);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline positions={gpsData.map(point => [point.latitude, point.longitude])} />
      {stoppages.map((stoppage, index) => (
        <Marker key={index} position={[stoppage.latitude, stoppage.longitude]}>
          <Popup>
            <div>
              <p><strong>Reach Time:</strong> {stoppage.reachTime.toLocaleString()}</p>
              <p><strong>End Time:</strong> {stoppage.endTime.toLocaleString()}</p>
              <p><strong>Duration:</strong> {stoppage.duration} minutes</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
