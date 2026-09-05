export const generateMockEvents = () => {
  const cities = [
    { name: 'Bengaluru', center: { lat: 12.9121, lng: 77.6446 }, count: 30, spread: 0.05 }, // HSR Layout center roughly
    { name: 'Pune', center: { lat: 18.5204, lng: 73.8567 }, count: 15, spread: 0.04 },
    { name: 'Hyderabad', center: { lat: 17.3850, lng: 78.4867 }, count: 12, spread: 0.04 },
    { name: 'Delhi', center: { lat: 28.6139, lng: 77.2090 }, count: 20, spread: 0.05 },
    { name: 'Mumbai', center: { lat: 19.0760, lng: 72.8777 }, count: 25, spread: 0.06 },
  ];

  const features: any[] = [];

  cities.forEach(city => {
    for (let i = 0; i < city.count; i++) {
      // Randomize coordinates within the spread
      const lat = city.center.lat + (Math.random() - 0.5) * city.spread;
      const lng = city.center.lng + (Math.random() - 0.5) * city.spread;
      
      features.push({
        type: 'Feature',
        properties: {
          city: city.name,
          eventId: `${city.name}-${i}`
        },
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        }
      });
    }
  });

  return {
    type: 'FeatureCollection',
    features
  };
};

export const mockEventsGeoJson = generateMockEvents();
