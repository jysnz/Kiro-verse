'use client';

import { useState } from 'react';
import DashboardLayout from './DashboardLayout';

const clinics = [
  { name: 'Downtown Dermatology', address: '123 Main St, Suite 200', phone: '(555) 234-5678', distance: '0.8 mi' },
  { name: 'SkinCare Plus Clinic', address: '456 Oak Ave, Floor 3', phone: '(555) 345-6789', distance: '1.2 mi' },
  { name: 'Metro Skin Health', address: '789 Pine Rd', phone: '(555) 456-7890', distance: '2.4 mi' },
  { name: 'ClearSkin Medical', address: '321 Elm Blvd, Unit 5', phone: '(555) 567-8901', distance: '3.1 mi' },
];

export default function OutbreakMap() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DashboardLayout activePage="Map">
      <div className="flex flex-col h-full">
        {/* Filter Panel */}
        <div className="flex flex-wrap gap-3 p-4 bg-white border-b border-[#c2c6d3]">
          <select className="px-3 py-2 rounded-lg border border-[#c2c6d3] text-sm text-[#424751] bg-white">
            <option>All Diseases</option>
            <option>Eczema</option>
            <option>Psoriasis</option>
            <option>Dermatitis</option>
            <option>Skin Cancer</option>
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
          <div className="relative flex-1 bg-[#e0e4ec]">
            {/* Placeholder map background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#424751] text-lg opacity-50">Map View</span>
            </div>

            {/* Outbreak pins */}
            <div className="absolute top-[20%] left-[30%] w-4 h-4 rounded-full bg-[#ba1a1a] border-2 border-white shadow-md" title="High severity outbreak" />
            <div className="absolute top-[35%] left-[55%] w-4 h-4 rounded-full bg-[#e65100] border-2 border-white shadow-md" title="Medium severity outbreak" />
            <div className="absolute top-[50%] left-[40%] w-3.5 h-3.5 rounded-full bg-[#f9a825] border-2 border-white shadow-md" title="Low severity outbreak" />
            <div className="absolute top-[60%] left-[70%] w-4 h-4 rounded-full bg-[#e65100] border-2 border-white shadow-md" title="Medium severity outbreak" />
            <div className="absolute top-[25%] left-[75%] w-3.5 h-3.5 rounded-full bg-[#f9a825] border-2 border-white shadow-md" title="Low severity outbreak" />

            {/* Clinic pins */}
            <div className="absolute top-[45%] left-[25%] w-4 h-4 rounded-full bg-[#004287] border-2 border-white shadow-md" title="Downtown Dermatology" />
            <div className="absolute top-[30%] left-[65%] w-4 h-4 rounded-full bg-[#004287] border-2 border-white shadow-md" title="SkinCare Plus Clinic" />
            <div className="absolute top-[70%] left-[50%] w-4 h-4 rounded-full bg-[#004287] border-2 border-white shadow-md" title="Metro Skin Health" />

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-[#c2c6d3] text-xs">
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
          <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-80 border-l border-[#c2c6d3] bg-white overflow-y-auto absolute md:relative inset-0 md:inset-auto z-10`}>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-[#0b1c30] mb-4">Nearby Clinics</h2>
              <div className="flex flex-col gap-3">
                {clinics.map((clinic) => (
                  <div
                    key={clinic.name}
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
