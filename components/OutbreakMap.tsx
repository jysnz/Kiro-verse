'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import DashboardLayout from './DashboardLayout';

// Dynamically import the map to avoid SSR issues with Leaflet (window is not defined)
const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-[#e0e4ec]">
      <span className="text-[#424751] text-lg opacity-50">Loading map...</span>
    </div>
  ),
});

const clinics = [
  {
    id: 'clinic-1',
    name: 'HOO Dermatology Manila',
    address: '2F Padre Faura Wing, Robinsons Place, Ermita, Manila',
    phone: '(02) 8872-0874',
    distance: '0.9 mi',
    coordinates: { lat: 14.5772, lng: 120.9856 },
  },
  {
    id: 'clinic-2',
    name: 'SkinCell Advanced Derma Clinic',
    address: 'New Bocobo Center, Padre Faura St, Ermita, Manila',
    phone: '(0917) 832-2445',
    distance: '1.1 mi',
    coordinates: { lat: 14.5785, lng: 120.9832 },
  },
  {
    id: 'clinic-3',
    name: 'SG Aesthetic & Derma Clinic',
    address: 'Robinsons Manila, Padre Faura St, Ermita, Manila',
    phone: '(0920) 905-8783',
    distance: '1.3 mi',
    coordinates: { lat: 14.5768, lng: 120.9845 },
  },
  {
    id: 'clinic-4',
    name: 'Healthy Skin Laser & Dermatology',
    address: 'Padre Faura St, Ermita, Manila',
    phone: '(02) 8353-1404',
    distance: '1.5 mi',
    coordinates: { lat: 14.5791, lng: 120.9821 },
  },
  {
    id: 'clinic-5',
    name: 'CorDerm Advanced Dermatology',
    address: 'Suite 1502 Medical Plaza, Dela Rosa St, Makati',
    phone: '(02) 8808-8140',
    distance: '2.8 mi',
    coordinates: { lat: 14.5574, lng: 121.0152 },
  },
  {
    id: 'clinic-6',
    name: 'Dr. Katrina Habaluyas Luz Dermatology',
    address: "St. Luke's Medical Center, 5th Ave, BGC, Taguig",
    phone: '(0955) 115-7026',
    distance: '0.5 mi',
    coordinates: { lat: 14.5537, lng: 121.0494 },
  },
  {
    id: 'clinic-7',
    name: 'Phytocare Dermatology',
    address: 'King Court Bldg, 2129 Chino Roces Ave, Makati',
    phone: '(02) 8812-3456',
    distance: '2.2 mi',
    coordinates: { lat: 14.5578, lng: 121.0118 },
  },
  {
    id: 'clinic-8',
    name: 'Patria Dermatology',
    address: 'Strata 300 Suites, 300 P. Guevarra St, San Juan',
    phone: '(0917) 169-5700',
    distance: '3.7 mi',
    coordinates: { lat: 14.5991, lng: 121.0315 },
  },
  {
    id: 'clinic-9',
    name: 'Skin Wellness Dermatology & Laser Center',
    address: 'Rasver Bldg, 424 E Rodriguez Sr. Ave, Quezon City',
    phone: '(0906) 440-0220',
    distance: '5.2 mi',
    coordinates: { lat: 14.6224, lng: 121.0268 },
  },
  {
    id: 'clinic-10',
    name: 'Kutis By Kei Dermatology QC',
    address: '26 Sgt. E. A. Esguerra Ave, Diliman, Quezon City',
    phone: '(0966) 234-7011',
    distance: '6.1 mi',
    coordinates: { lat: 14.6375, lng: 121.0354 },
  },
  {
    id: 'clinic-11',
    name: 'Sunday Skin Dermatology Center',
    address: 'Unit 209, Little Baguio, San Juan',
    phone: '(0917) 770-1128',
    distance: '3.9 mi',
    coordinates: { lat: 14.5982, lng: 121.0341 },
  },
];

// Outbreak data points
const outbreaks = [
  // Yellow dots - Taytay, Rizal (Low Severity)
  { id: 'ob-taytay-1', position: [14.5565, 121.1325] as [number, number], severity: 'low' as const, label: 'Taytay, Rizal', cases: 5, disease: 'Ringworm' },
  { id: 'ob-taytay-2', position: [14.5590, 121.1280] as [number, number], severity: 'low' as const, label: 'Taytay, Rizal', cases: 3, disease: 'Athlete\'s Foot' },
  { id: 'ob-taytay-3', position: [14.5540, 121.1350] as [number, number], severity: 'low' as const, label: 'Taytay, Rizal', cases: 4, disease: 'Acne' },
  { id: 'ob-taytay-4', position: [14.5610, 121.1300] as [number, number], severity: 'low' as const, label: 'Taytay, Rizal', cases: 2, disease: 'Nail-Fungus' },
  { id: 'ob-taytay-5', position: [14.5530, 121.1370] as [number, number], severity: 'low' as const, label: 'Taytay, Rizal', cases: 6, disease: 'Impetigo' },

  // Orange dots - Cubao, Quezon City (Medium Severity)
  { id: 'ob-cubao-1', position: [14.6192, 121.0530] as [number, number], severity: 'medium' as const, label: 'Cubao, Quezon City', cases: 12, disease: 'Cellulitis' },
  { id: 'ob-cubao-2', position: [14.6215, 121.0560] as [number, number], severity: 'medium' as const, label: 'Cubao, Quezon City', cases: 9, disease: 'Impetigo' },
  { id: 'ob-cubao-3', position: [14.6170, 121.0510] as [number, number], severity: 'medium' as const, label: 'Cubao, Quezon City', cases: 15, disease: 'Chickenpox' },
  { id: 'ob-cubao-4', position: [14.6235, 121.0545] as [number, number], severity: 'medium' as const, label: 'Cubao, Quezon City', cases: 8, disease: 'Ringworm' },
  { id: 'ob-cubao-5', position: [14.6180, 121.0575] as [number, number], severity: 'medium' as const, label: 'Cubao, Quezon City', cases: 11, disease: 'Cutaneous Larva Migrans' },

  // Red dots - Cubao, Quezon City (High Severity)
  { id: 'ob-cubao-h1', position: [14.6200, 121.0500] as [number, number], severity: 'high' as const, label: 'Cubao, Quezon City', cases: 28, disease: 'Chickenpox' },
  { id: 'ob-cubao-h2', position: [14.6225, 121.0480] as [number, number], severity: 'high' as const, label: 'Cubao, Quezon City', cases: 22, disease: 'Shingles' },
  { id: 'ob-cubao-h3', position: [14.6160, 121.0520] as [number, number], severity: 'high' as const, label: 'Cubao, Quezon City', cases: 31, disease: 'Cellulitis' },
  { id: 'ob-cubao-h4', position: [14.6240, 121.0505] as [number, number], severity: 'high' as const, label: 'Cubao, Quezon City', cases: 19, disease: 'Impetigo' },
  { id: 'ob-cubao-h5', position: [14.6175, 121.0490] as [number, number], severity: 'high' as const, label: 'Cubao, Quezon City', cases: 25, disease: 'Chickenpox' },

  // Orange dots - Taguig (Medium Severity)
  { id: 'ob-taguig-1', position: [14.5176, 121.0509] as [number, number], severity: 'medium' as const, label: 'Taguig City', cases: 10, disease: 'Ringworm' },
  { id: 'ob-taguig-2', position: [14.5210, 121.0545] as [number, number], severity: 'medium' as const, label: 'Taguig City', cases: 7, disease: 'Athlete\'s Foot' },
  { id: 'ob-taguig-3', position: [14.5148, 121.0480] as [number, number], severity: 'medium' as const, label: 'Taguig City', cases: 13, disease: 'Cellulitis' },
  { id: 'ob-taguig-4', position: [14.5235, 121.0525] as [number, number], severity: 'medium' as const, label: 'Taguig City', cases: 9, disease: 'Acne' },
  { id: 'ob-taguig-5', position: [14.5190, 121.0560] as [number, number], severity: 'medium' as const, label: 'Taguig City', cases: 11, disease: 'Cutaneous Larva Migrans' },

  // Yellow dots - Taguig (Low Severity)
  { id: 'ob-taguig-l1', position: [14.5250, 121.0490] as [number, number], severity: 'low' as const, label: 'Taguig City', cases: 3, disease: 'Nail-Fungus' },
  { id: 'ob-taguig-l2', position: [14.5160, 121.0535] as [number, number], severity: 'low' as const, label: 'Taguig City', cases: 2, disease: 'Acne' },
  { id: 'ob-taguig-l3', position: [14.5200, 121.0470] as [number, number], severity: 'low' as const, label: 'Taguig City', cases: 4, disease: 'Athlete\'s Foot' },

  // Red dots - Caloocan (High Severity)
  { id: 'ob-caloocan-h1', position: [14.6490, 120.9840] as [number, number], severity: 'high' as const, label: 'Caloocan City', cases: 26, disease: 'Chickenpox' },
  { id: 'ob-caloocan-h2', position: [14.6520, 120.9870] as [number, number], severity: 'high' as const, label: 'Caloocan City', cases: 20, disease: 'Shingles' },
  { id: 'ob-caloocan-h3', position: [14.6460, 120.9815] as [number, number], severity: 'high' as const, label: 'Caloocan City', cases: 33, disease: 'Cellulitis' },
  { id: 'ob-caloocan-h4', position: [14.6545, 120.9855] as [number, number], severity: 'high' as const, label: 'Caloocan City', cases: 18, disease: 'Impetigo' },
  { id: 'ob-caloocan-h5', position: [14.6475, 120.9890] as [number, number], severity: 'high' as const, label: 'Caloocan City', cases: 24, disease: 'Chickenpox' },

  // Orange dots - Caloocan (Medium Severity)
  { id: 'ob-caloocan-m1', position: [14.6510, 120.9825] as [number, number], severity: 'medium' as const, label: 'Caloocan City', cases: 14, disease: 'Ringworm' },
  { id: 'ob-caloocan-m2', position: [14.6535, 120.9900] as [number, number], severity: 'medium' as const, label: 'Caloocan City', cases: 8, disease: 'Cutaneous Larva Migrans' },
  { id: 'ob-caloocan-m3', position: [14.6450, 120.9860] as [number, number], severity: 'medium' as const, label: 'Caloocan City', cases: 11, disease: 'Athlete\'s Foot' },
  { id: 'ob-caloocan-m4', position: [14.6560, 120.9835] as [number, number], severity: 'medium' as const, label: 'Caloocan City', cases: 6, disease: 'Nail-Fungus' },
];

// Center to cover all areas (Caloocan north, Taguig south, Taytay east)
const MANILA_CENTER: [number, number] = [14.5850, 121.0400];

export default function OutbreakMap() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState('All Diseases');

  const filteredOutbreaks = selectedDisease === 'All Diseases'
    ? outbreaks
    : outbreaks.filter((ob) => ob.disease === selectedDisease);

  return (
    <DashboardLayout activePage="Map">
      <div className="flex flex-col h-full">
        {/* Filter Panel */}
        <div className="flex flex-wrap gap-3 p-4 bg-white border-b border-[#c2c6d3]">
          <select
            value={selectedDisease}
            onChange={(e) => setSelectedDisease(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[#c2c6d3] text-sm text-[#424751] bg-white"
          >
            <option>All Diseases</option>
            <option>Acne</option>
            <option value="Athlete's Foot">Athlete&apos;s Foot</option>
            <option>Cellulitis</option>
            <option>Chickenpox</option>
            <option>Cutaneous Larva Migrans</option>
            <option>Impetigo</option>
            <option>Nail-Fungus</option>
            <option>Ringworm</option>
            <option>Shingles</option>
            <option>Unknown</option>
          </select>
          <select className="px-3 py-2 rounded-lg border border-[#c2c6d3] text-sm text-[#424751] bg-white">
            <option>Within 5 mi</option>
            <option>Within 10 mi</option>
            <option>Within 25 mi</option>
            <option>Within 50 mi</option>
          </select>
          <select className="px-3 py-2 rounded-lg border border-[#c2c6d3] text-sm text-[#424751] bg-white">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto md:hidden px-3 py-2 rounded-lg bg-[#004287] text-white text-sm"
          >
            {sidebarOpen ? 'Hide Clinics' : 'Show Clinics'}
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Map Area */}
          <div className="relative flex-1">
            <MapView clinics={clinics} center={MANILA_CENTER} outbreaks={filteredOutbreaks} />

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-[#c2c6d3] text-xs z-[1000]">
              <p className="font-semibold text-[#0b1c30] mb-2">Legend</p>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ba1a1a]" />
                  <span className="text-[#424751]">High Severity</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#e65100]" />
                  <span className="text-[#424751]">Medium Severity</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#f9a825]" />
                  <span className="text-[#424751]">Low Severity</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#004287]" />
                  <span className="text-[#424751]">Clinic</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-80 border-l border-[#c2c6d3] bg-white absolute md:relative inset-0 md:inset-auto z-10 flex flex-col h-full overflow-hidden`}>
            <div className="p-4 pb-2 shrink-0">
              <h2 className="text-lg font-semibold text-[#0b1c30]">Nearby Clinics</h2>
            </div>
            <div className="overflow-y-auto px-4 pb-4 flex-1 min-h-0">
              <div className="flex flex-col gap-3">
                {clinics.map((clinic) => (
                  <div
                    key={clinic.id}
                    className="p-3 rounded-[16px] border border-[#c2c6d3] bg-[#f8f9ff]"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-[#004287] text-lg mt-0.5">📍</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#0b1c30] text-sm">{clinic.name}</p>
                        <p className="text-xs text-[#424751] mt-0.5">{clinic.address}</p>
                        <p className="text-xs text-[#424751]">{clinic.phone}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-[#004287] font-medium">{clinic.distance}</span>
                          <button className="px-3 py-1 text-xs rounded-full bg-[#004287] text-white">
                            Contact
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}
