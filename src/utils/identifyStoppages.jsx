// src/utils/identifyStoppages.js
export const identifyStoppages = (data, thresholdMinutes) => {
  const stoppages = [];
  let stoppageStart = null;

  for (let i = 1; i < data.length; i++) {
    const prevPoint = data[i - 1];
    const currPoint = data[i];

    // Check if the vehicle is stationary
    if (prevPoint.latitude === currPoint.latitude && prevPoint.longitude === currPoint.longitude && currPoint.speed === 0) {
      if (!stoppageStart) {
        stoppageStart = prevPoint;
      }

      const duration = (currPoint.eventGeneratedTime - stoppageStart.eventGeneratedTime) / (1000 * 60); // convert ms to minutes
      if (duration >= thresholdMinutes) {
        stoppages.push({
          latitude: stoppageStart.latitude,
          longitude: stoppageStart.longitude,
          reachTime: stoppageStart.eventGeneratedTime,
          endTime: currPoint.eventGeneratedTime,
          duration
        });
        stoppageStart = null; // Reset after recording a stoppage
      }
    } else {
      stoppageStart = null; // Reset if vehicle moves
    }
  }

  return stoppages;
};
