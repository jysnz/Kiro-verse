'use client';

import { useMemo, useSyncExternalStore } from 'react';
import Link from 'next/link';
import DashboardLayout from './DashboardLayout';
import { getSkinDiseaseInfo } from '@/lib/skinDiseaseInfo';
import type { SkinDiseasePrediction } from '@/lib/kiroverse';

const LAST_SCAN_KEY = 'kiroverse:lastScan';

interface StoredScan extends SkinDiseasePrediction {
  imageUrl: string;
  scannedAt: string;
}

// sessionStorage is a browser-only API — read it through useSyncExternalStore
// so the initial server/hydration render stays consistent and the value
// still refreshes correctly after hydration (no manual effect + setState).
function subscribeToLastScan() {
  return () => {};
}
function getLastScanSnapshot() {
  return sessionStorage.getItem(LAST_SCAN_KEY);
}
function getLastScanServerSnapshot() {
  return null;
}

function confidenceLabel(confidence: number) {
  if (confidence >= 80) return { text: 'High Confidence', tone: 'red' as const };
  if (confidence >= 50) return { text: 'Moderate Confidence', tone: 'amber' as const };
  return { text: 'Low Confidence', tone: 'gray' as const };
}

const TONE_CLASSES = {
  red: { bar: 'bg-[#ffb4ab]', badge: 'bg-[#ffdad6] text-[#93000a]', icon: 'bg-[#ffdad6] text-[#93000a]' },
  amber: { bar: 'bg-amber-300', badge: 'bg-amber-100 text-amber-800', icon: 'bg-amber-100 text-amber-800' },
  gray: { bar: 'bg-gray-300', badge: 'bg-gray-100 text-gray-700', icon: 'bg-gray-100 text-gray-700' },
};

// Deep-links each source's own search for the detected condition, rather
// than pointing everyone at the same generic homepage.
function referenceSources(disease: string) {
  const q = encodeURIComponent(disease);
  return [
    { name: 'AAD', url: `https://www.aad.org/search?query=${q}` },
    { name: 'Mayo Clinic', url: `https://www.mayoclinic.org/search/search-results?q=${q}` },
    { name: 'MedlinePlus (NIH)', url: `https://medlineplus.gov/search/?query=${q}` },
  ];
}

export default function ResultsContent() {
  const raw = useSyncExternalStore(subscribeToLastScan, getLastScanSnapshot, getLastScanServerSnapshot);
  const scan = useMemo<StoredScan | null>(() => {
    if (!raw) return null;
    try {
      return JSON.parse(raw) as StoredScan;
    } catch {
      return null;
    }
  }, [raw]);

  if (!scan) {
    return (
      <DashboardLayout activePage="Scan">
        <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
          <span className="material-symbols-outlined text-5xl text-[#c2c6d3]">image_search</span>
          <h1 className="text-xl font-semibold text-[#0b1c30]">No scan results yet</h1>
          <p className="text-sm text-[#424751] max-w-sm">
            Upload and analyze a photo on the Scan page to see results here.
          </p>
          <Link
            href="/scan"
            className="mt-2 px-5 py-2.5 bg-[#004287] text-white rounded-full text-sm font-medium hover:bg-[#003570] transition-colors"
          >
            Go to Scan
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const info = getSkinDiseaseInfo(scan.disease);
  const { text: confText, tone } = confidenceLabel(scan.confidence);
  const toneClasses = TONE_CLASSES[tone];
  const scannedDate = new Date(scan.scannedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const sortedProbabilities = Object.entries(scan.probabilities || {}).sort(([, a], [, b]) => b - a);
  const sources = referenceSources(scan.disease);

  return (
    <DashboardLayout activePage="Scan">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0b1c30]">Analysis Results</h1>
            <p className="text-sm text-[#424751] mt-1">Scan completed on {scannedDate}</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 bg-[#e5eeff] text-[#004287] rounded-full text-sm font-medium hover:bg-[#d0e0ff] transition-colors">
              Save to History
            </button>
            <button className="px-5 py-2.5 bg-[#004287] text-white rounded-full text-sm font-medium hover:bg-[#003570] transition-colors">
              Find Clinic
            </button>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Primary Result Card */}
          <div className="md:col-span-8 bg-white rounded-[24px] border border-[#c2c6d3] shadow-sm overflow-hidden">
            <div className={`h-2 ${toneClasses.bar}`} />
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${toneClasses.icon}`}>
                  <span className="material-symbols-outlined">dermatology</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-[#0b1c30]">{scan.disease}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${toneClasses.badge}`}>
                      {confText}
                    </span>
                    <span className="text-2xl font-bold text-[#004287]">{Math.round(scan.confidence)}%</span>
                  </div>
                  <p className="text-[#424751] mt-4 text-sm leading-relaxed">{info.description}</p>
                </div>
              </div>

              {sortedProbabilities.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-[#424751] mb-3">All Class Probabilities</h3>
                  <div className="space-y-2">
                    {sortedProbabilities.map(([label, pct]) => (
                      <div key={label} className="flex items-center gap-3">
                        <span className="w-40 text-xs text-[#424751] truncate">{label}</span>
                        <div className="flex-1 h-2 bg-[#eff4ff] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#004287] rounded-full"
                            style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
                          />
                        </div>
                        <span className="w-12 text-right text-xs text-[#424751]">{pct.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Image Reference Card */}
          <div className="md:col-span-4 bg-white rounded-[24px] border border-[#c2c6d3] shadow-sm p-6">
            <h3 className="text-sm font-medium text-[#424751] mb-3">Analyzed Region</h3>
            <div className="w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={scan.imageUrl} alt="Analyzed skin photo" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Symptoms Card */}
          <div className="md:col-span-6 bg-white rounded-[24px] border border-[#c2c6d3] shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#004287]">list_alt</span>
              <h3 className="text-lg font-semibold text-[#0b1c30]">Common Symptoms</h3>
            </div>
            <ul className="space-y-3">
              {info.symptoms.map((symptom) => (
                <li key={symptom} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#004287] text-xl">check_circle</span>
                  <span className="text-sm text-[#424751]">{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Non-Medical Remedies Card */}
          <div className="md:col-span-6 bg-white rounded-[24px] border border-[#c2c6d3] shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#004287]">spa</span>
              <h3 className="text-lg font-semibold text-[#0b1c30]">Non-Medical Remedies</h3>
            </div>
            <ul className="space-y-3">
              {info.remedies.map((tip) => (
                <li key={tip} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#004287] text-xl">tips_and_updates</span>
                  <span className="text-sm text-[#424751]">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sources Card */}
          <div className="md:col-span-12 bg-white rounded-[24px] border border-[#c2c6d3] shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#424751]">menu_book</span>
              <div>
                <h3 className="text-sm font-semibold text-[#0b1c30]">Clinical References</h3>
                <p className="text-xs text-[#424751] mt-0.5">
                  What trusted medical sources say about {scan.disease}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {sources.map((source) => (
                <a
                  key={source.name}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-[#c2c6d3] text-[#004287] text-xs font-medium hover:bg-[#eff4ff] hover:border-[#005fac] transition-colors flex items-center gap-1.5"
                >
                  {source.name}
                  <span className="material-symbols-outlined text-base leading-none">open_in_new</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-[#424751] text-center max-w-2xl mx-auto pb-4">
          This is an automated screening result from the KIROVERSE model, not a medical diagnosis. Please consult a
          licensed dermatologist for confirmation and treatment.
        </p>
      </div>
    </DashboardLayout>
  );
}
