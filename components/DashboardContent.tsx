'use client';

import Link from 'next/link';
import DashboardLayout from './DashboardLayout';

export default function DashboardContent() {
  return (
    <DashboardLayout activePage="Home">
      <div className="bg-[#f8f9ff] min-h-screen p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0b1c30]">Good morning, Alex.</h1>
          <p className="text-[#424751] mt-1">Here is your daily skin health summary.</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Scan CTA Card */}
          <div className="md:col-span-8 bg-white rounded-[24px] border border-[#c2c6d3] p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#eff4ff] rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#004287]">photo_camera</span>
              </div>
              <h2 className="text-xl font-semibold text-[#0b1c30] mb-2">Scan Your Skin</h2>
              <p className="text-[#424751] text-sm">
                Use your camera to capture a photo of a mole or skin lesion. Our AI will analyze it and provide an instant risk assessment.
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/scan"
                className="inline-block bg-[#1e5aa8] text-white px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Begin Analysis
              </Link>
            </div>
          </div>

          {/* Recent Alerts Card */}
          <div className="md:col-span-4 bg-white rounded-[24px] border border-[#c2c6d3] shadow-sm overflow-hidden flex flex-col">
            <div className="h-2 bg-[#ba1a1a]" />
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <div className="w-12 h-12 bg-[#ffdad6] rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[#ba1a1a]">warning</span>
                </div>
                <p className="text-4xl font-bold text-[#0b1c30]">2</p>
                <p className="text-[#424751] text-sm mt-1">Action required</p>
              </div>
              <div className="mt-6">
                <button className="w-full bg-[#ffdad6] text-[#ba1a1a] px-4 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity">
                  Review Findings
                </button>
              </div>
            </div>
          </div>

          {/* Recent Scans List */}
          <div className="md:col-span-7 bg-white rounded-[24px] border border-[#c2c6d3] p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#0b1c30] mb-4">Recent Scans</h3>
            <div className="space-y-4">
              {/* Scan Item 1 */}
              <div className="flex items-center justify-between p-3 bg-[#eff4ff] rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#004287]">dermatology</span>
                  <div>
                    <p className="text-sm font-medium text-[#0b1c30]">Left forearm mole</p>
                    <p className="text-xs text-[#424751]">Aug 12, 2026</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#fff3cd] text-[#664d03]">
                  Monitor
                </span>
              </div>

              {/* Scan Item 2 */}
              <div className="flex items-center justify-between p-3 bg-[#eff4ff] rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#004287]">dermatology</span>
                  <div>
                    <p className="text-sm font-medium text-[#0b1c30]">Right shoulder spot</p>
                    <p className="text-xs text-[#424751]">Aug 8, 2026</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#d4edda] text-[#155724]">
                  Benign
                </span>
              </div>

              {/* Scan Item 3 */}
              <div className="flex items-center justify-between p-3 bg-[#eff4ff] rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#004287]">dermatology</span>
                  <div>
                    <p className="text-sm font-medium text-[#0b1c30]">Back lesion</p>
                    <p className="text-xs text-[#424751]">Aug 3, 2026</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a]">
                  Consult Doctor
                </span>
              </div>
            </div>
          </div>

          {/* Environmental Card */}
          <div className="md:col-span-5 bg-white rounded-[24px] border border-[#c2c6d3] p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#0b1c30] mb-4">Environmental</h3>

            {/* Map Placeholder */}
            <div className="w-full h-32 bg-[#eff4ff] rounded-2xl flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[#004287] text-4xl">map</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#eff4ff] rounded-2xl p-4 text-center">
                <span className="material-symbols-outlined text-[#004287] mb-1">wb_sunny</span>
                <p className="text-2xl font-bold text-[#0b1c30]">7</p>
                <p className="text-xs text-[#424751]">UV Index (High)</p>
              </div>
              <div className="bg-[#eff4ff] rounded-2xl p-4 text-center">
                <span className="material-symbols-outlined text-[#004287] mb-1">air</span>
                <p className="text-2xl font-bold text-[#0b1c30]">42</p>
                <p className="text-xs text-[#424751]">Air Quality (Good)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
