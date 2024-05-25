// src/utils/fetchGPSData.js
import Papa from 'papaparse';
import gpsDataCsv from '../data/gps_data.csv';

export const fetchGPSData = async () => {
  return new Promise((resolve, reject) => {
    Papa.parse(gpsDataCsv, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const data = results.data.map(row => ({
          equipmentId: row.EquipmentId,
          latitude: parseFloat(row.latitude),
          longitude: parseFloat(row.longitude),
          speed: parseFloat(row.speed),
          odometer: parseFloat(row['odometer reading']),
          eventDate: new Date(parseInt(row.eventDate)),
          eventGeneratedTime: new Date(parseInt(row.eventGeneratedTime))
        }));
        resolve(data);
      },
      error: (error) => {
        console.error('Error parsing CSV data', error);
        reject(error);
      }
    });
  });
};
