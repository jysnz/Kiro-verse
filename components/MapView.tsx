'use client';

import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue with Leaflet + bundlers
const clinicIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance: string;
  coordinates: { lat: number; lng: number };
}

interface OutbreakPoint {
  id: string;
  position: [number, number];
  severity: 'high' | 'medium' | 'low';
  label: string;
  cases: number;
  disease: string;
}

interface MapViewProps {
  clinics: Clinic[];
  center: [number, number];
  outbreaks: OutbreakPoint[];
}

const severityColors: Record<string, string> = {
  high: '#ba1a1a',
  medium: '#e65100',
  low: '#f9a825',
};

export default function MapView({ clinics, center, outbreaks }: MapViewProps) {
  return (
    <MapContainer
      center={center}
      zoom={11}
      scrollWheelZoom={true}
      className="h-full w-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Outbreak markers */}
      {outbreaks.map((outbreak) => (
        <CircleMarker
          key={outbreak.id}
          center={outbreak.position}
          radius={10}
          pathOptions={{
            fillColor: severityColors[outbreak.severity],
            color: '#ffffff',
            weight: 2,
            fillOpacity: 0.9,
          }}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-semibold" style={{ color: severityColors[outbreak.severity] }}>
                {outbreak.severity.charAt(0).toUpperCase() + outbreak.severity.slice(1)} Severity
              </p>
              <p className="text-gray-800 font-medium mt-1">{outbreak.disease}</p>
              <p className="text-gray-600">{outbreak.label}</p>
              <p className="text-gray-600">{outbreak.cases} reported cases</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}

      {/* Clinic markers */}
      {clinics.map((clinic) => (
        <Marker
          key={clinic.id}
          position={[clinic.coordinates.lat, clinic.coordinates.lng]}
          icon={clinicIcon}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-semibold text-[#004287]">{clinic.name}</p>
              <p className="text-gray-600 mt-1">{clinic.address}</p>
              <p className="text-gray-600">{clinic.phone}</p>
              <p className="text-[#004287] font-medium mt-1">{clinic.distance} away</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
