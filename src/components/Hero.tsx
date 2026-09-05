import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import { EventItem } from '../types';
import { fetchUnifiedEvents } from '../utils/fetchEvents';

// Fix Leaflet's default icon paths in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Create custom icon for unclustered points
const customIcon = L.divIcon({
  html: `<div style="background-color: #dc2626; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3), 0 2px 4px -1px rgba(0,0,0,0.15);"></div>`,
  className: 'custom-pin',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -8],
  tooltipAnchor: [0, -8]
});

// Major cities for clean overlay
const majorCities = [
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777, anchorX: 50 },
  { name: 'Delhi', lat: 28.7041, lng: 77.1025, anchorX: 50 },
  { name: 'Bangalore', lat: 12.9716, lng: 77.5946, anchorX: 80 }, // Shift Bangalore left
  { name: 'Chennai', lat: 13.0827, lng: 80.2707, anchorX: -10 },  // Shift Chennai right
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639, anchorX: 50 }
];

const createCityLabelIcon = (cityName: string, anchorX: number) => {
  const align = anchorX < 50 ? 'left' : anchorX > 50 ? 'right' : 'center';
  return L.divIcon({
    className: 'custom-city-label',
    html: `<div style="font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 700; color: #1f2937; text-shadow: 0px 0px 4px white, 0px 0px 4px white, 0px 0px 4px white; white-space: nowrap; text-align: ${align};">${cityName}</div>`,
    iconSize: [100, 20],
    iconAnchor: [anchorX, 10]
  });
};

const CITY_COORDINATES: Record<string, [number, number]> = {
  'mumbai': [19.0760, 72.8777],
  'delhi': [28.7041, 77.1025],
  'new delhi': [28.7041, 77.1025],
  'bengaluru': [12.9716, 77.5946],
  'bangalore': [12.9716, 77.5946],
  'chennai': [13.0827, 80.2707],
  'kolkata': [22.5726, 88.3639],
  'hyderabad': [17.3850, 78.4867],
  'pune': [18.5204, 73.8567],
  'ahmedabad': [23.0225, 72.5714],
  'jaipur': [26.9124, 75.7873],
};



const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [indiaStates, setIndiaStates] = React.useState<any>(null);
  const [events, setEvents] = React.useState<EventItem[]>([]);

  React.useEffect(() => {
    fetch('/india-states.json')
      .then(res => res.json())
      .then(data => setIndiaStates(data))
      .catch(err => console.error("Failed to load India states", err));

    fetchUnifiedEvents().then(eventsData => {
      setEvents(eventsData);
    });
  }, []);

  // Map events to coordinates
  const mappedEvents = React.useMemo(() => {
    return events
      .map(event => {
        let finalCoords = event.coords;
        let isTBA = false;

        if (!finalCoords) {
          const venueOrCity = (event.city || event.venue || "").toLowerCase();
          if (venueOrCity && venueOrCity !== "data not provided/will be shared upon signup") {
            const cityMatch = Object.keys(CITY_COORDINATES).find(c => venueOrCity.includes(c));
            if (cityMatch) {
              const jitterLat = (Math.random() - 0.5) * 0.08;
              const jitterLng = (Math.random() - 0.5) * 0.08;
              finalCoords = [CITY_COORDINATES[cityMatch][0] + jitterLat, CITY_COORDINATES[cityMatch][1] + jitterLng];
              isTBA = true;
            }
          }
        }
        
        return {
          ...event,
          coords: finalCoords,
          isTBA
        };
      })
      .filter(e => e.coords !== undefined && e.coords !== null);
  }, [events]);

  return (
    <section id="home" className="relative bg-white pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT HALF - CONTENT */}
          <div className="relative z-10 text-left flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-bold uppercase tracking-wider mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              Premier Startup Ecosystem
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-black tracking-tight leading-[1.1] mb-6"
            >
              Leveling up <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-red-600">Ideas.</span>
                <span className="absolute bottom-1 left-0 w-full h-4 bg-red-100 -z-0 skew-x-12"></span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed"
            >
              The Startup Tales is where 1M+ founders, investors, and creators collide. Submit your startup, join our accelerator, or attend our next mixer.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <a
                href="#submit-startup"
                className="group px-8 py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-red-600 transition-all shadow-xl shadow-gray-200 hover:shadow-red-200 flex items-center justify-center gap-2"
              >
                Submit Startup
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => navigate('/events')}
                className="px-8 py-4 bg-white text-black border-2 border-gray-100 rounded-xl font-bold text-lg hover:border-black hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                Explore Events
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 flex items-center gap-4 text-sm font-semibold text-gray-500"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 bg-cover"
                    style={{ backgroundImage: `url('https://picsum.photos/100/100?random=${i}')` }}
                  ></div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-red-50 flex items-center justify-center text-xs text-red-600 font-bold">+1k</div>
              </div>
              <p>Join 1,000+ Attendees</p>
            </motion.div>
          </div>

          {/* RIGHT HALF - MAP */}
          <div className="relative w-full h-[55vh] lg:h-[70vh] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 bg-[#f3f4f5] z-0">

            <MapContainer 
              center={[22.0, 79.0]} 
              zoom={4.5}
              zoomSnap={0.5}
              minZoom={4}
              maxBounds={[[6.7, 68.1], [35.5, 97.4]]}
              maxBoundsViscosity={1.0}
              scrollWheelZoom={false}
              style={{ width: '100%', height: '100%', zIndex: 0 }}
            >
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          />
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
          />
          
          {indiaStates && (
            <GeoJSON 
              data={indiaStates} 
              style={{
                color: '#ef4444', // Tailwind red-500
                weight: 1.2,
                opacity: 0.5, // Make borders subtle so they don't overpower markers
                fillOpacity: 0,
                dashArray: '4'
              }}
            />
          )}

          {majorCities.map((city, idx) => (
            <Marker 
              key={`city-${idx}`}
              position={[city.lat, city.lng]}
              icon={createCityLabelIcon(city.name, city.anchorX)}
              interactive={false}
            />
          ))}
          
          <MarkerClusterGroup
            chunkedLoading
            maxClusterRadius={50}
            iconCreateFunction={(cluster: any) => {
              const count = cluster.getChildCount();
              let bgColor = '#ef4444'; // red-500
              let size = 40;
              
              if (count >= 10 && count < 30) {
                bgColor = '#dc2626'; // red-600
                size = 45;
              } else if (count >= 30) {
                bgColor = '#7f1d1d'; // red-900 (maroon)
                size = 50;
              }
              
              return L.divIcon({
                html: `<div style="background-color: ${bgColor}; color: white; width: ${size}px; height: ${size}px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-family: Inter, sans-serif; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); border: 2px solid white; transition: all 0.3s ease;"><span>${count}</span></div>`,
                className: 'custom-cluster-icon',
                iconSize: [size, size]
              });
            }}
          >
            {mappedEvents.map((event: any) => (
              <Marker 
                key={event.id} 
                position={event.coords as [number, number]}
                icon={customIcon}
              >
                <Popup className="custom-popup bg-white border-0 shadow-xl rounded-xl">
                  <div className="p-1 min-w-[120px] max-w-[180px] flex flex-col gap-2 text-center pointer-events-auto">
                    <h3 className="font-bold text-gray-900 text-xs leading-tight line-clamp-2">
                      {event['event name']}
                    </h3>
                    {event.isTBA && (
                      <span className="text-[9px] text-gray-500 font-medium">📍 shared upon registration</span>
                    )}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const link = event['registration link'];
                        if (link && link !== "data not provided/will be shared upon signup") {
                          const mdMatch = link.match(/\]\((.*?)\)/);
                          window.open(mdMatch ? mdMatch[1] : link, '_blank');
                        } else {
                          navigate('/events');
                        }
                      }}
                      className="w-full bg-red-600 text-white text-[10px] font-bold py-1.5 rounded-lg hover:bg-red-700 transition-colors pointer-events-auto shadow-sm cursor-pointer"
                    >
                      REGISTER
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

