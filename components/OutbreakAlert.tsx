'use client';

import { useState } from 'react';
import DashboardLayout from './DashboardLayout';

const actions = [
  'Avoid outdoor activities in affected zones',
  'Apply sunscreen SPF 50+ when going outside',
  'Monitor skin for any new changes or irritation',
  'Consult dermatologist if symptoms appear',
];

const additionalAlerts = [
  { severity: 'Medium', color: '#e65100', area: 'Westside District', date: 'Aug 12, 2026', description: 'Increased cases of contact dermatitis reported near industrial zone.' },
  { severity: 'Low', color: '#f9a825', area: 'Northpark Suburbs', date: 'Aug 10, 2026', description: 'Minor uptick in eczema cases possibly linked to seasonal allergens.' },
];

export default function OutbreakAlert() {
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false]);

  const toggleCheck = (index: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <DashboardLayout activePage="Alerts">
      <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-[#0b1c30] mb-4">Outbreak Alerts</h1>

        {/* Primary Alert Banner */}
        <div className="rounded-[24px] border border-[#c2c6d3] bg-white overflow-hidden mb-4">
          {/* Gradient strip */}
          <div className="h-2 bg-gradient-to-r from-[#ba1a1a] to-[#e65100]" />
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-lg font-bold text-[#0b1c30]">Outbreak Detected in Your Area</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ba1a1a] text-white text-xs font-semibold uppercase">
                HIGH
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <p className="text-sm text-[#424751] mb-2">
                  A significant outbreak of UV-related skin conditions has been detected within 2 miles of your location.
                  Multiple cases of severe sunburn and actinic keratosis have been reported in the Downtown and Eastside areas.
                </p>
                <p className="text-xs text-[#424751]">
                  <span className="font-medium text-[#0b1c30]">Affected area:</span> Downtown, Eastside, Midtown
                </p>
              </div>
              {/* Map thumbnail placeholder */}
              <div className="w-full sm:w-32 h-24 rounded-xl bg-[#e0e4ec] flex items-center justify-center shrink-0">
                <span className="text-xs text-[#424751] opacity-60">Map</span>
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-[#0b1c30] mb-2">Recommended Actions</p>
              <div className="flex flex-col gap-2">
                {actions.map((action, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked[i]}
                      onChange={() => toggleCheck(i)}
                      className="w-4 h-4 rounded border-[#c2c6d3] text-[#004287] accent-[#004287]"
                    />
                    <span className="text-sm text-[#424751]">{action}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="px-5 py-2.5 rounded-full bg-[#004287] text-white text-sm font-medium">
                View Details
              </button>
              <button className="px-5 py-2.5 rounded-full border border-[#004287] text-[#004287] text-sm font-medium">
                Share Alert
              </button>
            </div>
          </div>
        </div>

        {/* Additional Alerts */}
        {additionalAlerts.map((alert) => (
          <div
            key={alert.area}
            className="rounded-[24px] border border-[#c2c6d3] bg-white overflow-hidden mb-3"
          >
            <div className="h-1.5" style={{ backgroundColor: alert.color }} />
            <div className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-white text-xs font-semibold uppercase"
                  style={{ backgroundColor: alert.color }}
                >
                  {alert.severity}
                </span>
                <span className="text-sm font-semibold text-[#0b1c30]">{alert.area}</span>
                <span className="text-xs text-[#424751] ml-auto">{alert.date}</span>
              </div>
              <p className="text-sm text-[#424751]">{alert.description}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
