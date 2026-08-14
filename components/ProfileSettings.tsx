'use client';

import { useState } from 'react';
import DashboardLayout from './DashboardLayout';

const scanHistory = [
  { date: 'Aug 8, 2026', condition: 'Eczema', status: 'Resolved', statusColor: '#16a34a' },
  { date: 'Jul 22, 2026', condition: 'Contact Dermatitis', status: 'Monitoring', statusColor: '#e65100' },
  { date: 'Jun 15, 2026', condition: 'Psoriasis', status: 'Active', statusColor: '#ba1a1a' },
];

const notificationDefaults = {
  push: true,
  email: true,
  outbreak: true,
  reminders: false,
};

export default function ProfileSettings() {
  const [notifications, setNotifications] = useState(notificationDefaults);

  const toggleNotification = (key: keyof typeof notificationDefaults) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <DashboardLayout activePage="Profile">
      <div className="p-4 max-w-2xl mx-auto">
        {/* User Info Card */}
        <div className="rounded-[24px] border border-[#c2c6d3] bg-white p-5 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#004287] flex items-center justify-center text-white font-bold text-lg shrink-0">
              AJ
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-[#0b1c30]">Alex Johnson</h2>
              <p className="text-sm text-[#424751]">alex.johnson@email.com</p>
            </div>
            <button className="px-4 py-2 rounded-full border border-[#004287] text-[#004287] text-sm font-medium">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Scan History */}
        <div className="rounded-[24px] border border-[#c2c6d3] bg-white p-5 mb-4">
          <h3 className="text-base font-semibold text-[#0b1c30] mb-3">Scan History</h3>
          <div className="flex flex-col gap-3">
            {scanHistory.map((scan) => (
              <div
                key={scan.date + scan.condition}
                className="flex items-center justify-between p-3 rounded-xl bg-[#f8f9ff] border border-[#c2c6d3]"
              >
                <div>
                  <p className="text-sm font-medium text-[#0b1c30]">{scan.condition}</p>
                  <p className="text-xs text-[#424751]">{scan.date}</p>
                </div>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: scan.statusColor }}
                >
                  {scan.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="rounded-[24px] border border-[#c2c6d3] bg-white p-5 mb-4">
          <h3 className="text-base font-semibold text-[#0b1c30] mb-3">Notification Preferences</h3>
          <div className="flex flex-col gap-4">
            {([
              { key: 'push' as const, label: 'Push Notifications' },
              { key: 'email' as const, label: 'Email Alerts' },
              { key: 'outbreak' as const, label: 'Outbreak Warnings' },
              { key: 'reminders' as const, label: 'Scan Reminders' },
            ]).map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-[#424751]">{label}</span>
                <button
                  onClick={() => toggleNotification(key)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    notifications[key] ? 'bg-[#004287]' : 'bg-[#c2c6d3]'
                  }`}
                  role="switch"
                  aria-checked={notifications[key]}
                  aria-label={label}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      notifications[key] ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Account Section */}
        <div className="rounded-[24px] border border-[#c2c6d3] bg-white p-5">
          <h3 className="text-base font-semibold text-[#0b1c30] mb-3">Account</h3>
          <div className="flex flex-col gap-3">
            <button className="w-full py-2.5 rounded-full border border-[#ba1a1a] text-[#ba1a1a] text-sm font-medium">
              Log Out
            </button>
            <button className="text-sm text-[#ba1a1a] underline">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
