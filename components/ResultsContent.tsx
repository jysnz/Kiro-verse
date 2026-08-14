'use client';

import DashboardLayout from './DashboardLayout';

export default function ResultsContent() {
  return (
    <DashboardLayout activePage="Scan">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0b1c30]">Analysis Results</h1>
            <p className="text-sm text-[#424751] mt-1">Scan completed on August 14, 2026</p>
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
            <div className="h-2 bg-[#ffb4ab]" />
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#ffdad6] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[#93000a]">dermatology</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-[#0b1c30]">Eczema (Atopic Dermatitis)</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="px-3 py-1 bg-[#ffdad6] text-[#93000a] text-xs font-medium rounded-full">
                      High Confidence
                    </span>
                    <span className="text-2xl font-bold text-[#004287]">94%</span>
                  </div>
                  <p className="text-[#424751] mt-4 text-sm leading-relaxed">
                    Atopic dermatitis is a chronic inflammatory skin condition characterized by dry, itchy skin
                    and recurrent eczematous lesions. It commonly appears in areas with skin folds and is
                    associated with a personal or family history of allergic conditions. Early management and
                    consistent skincare routines are essential for controlling flare-ups.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Reference Card */}
          <div className="md:col-span-4 bg-white rounded-[24px] border border-[#c2c6d3] shadow-sm p-6">
            <h3 className="text-sm font-medium text-[#424751] mb-3">Analyzed Region</h3>
            <div className="w-full aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
              <span className="text-sm text-gray-400">Image preview area</span>
            </div>
          </div>

          {/* Symptoms Card */}
          <div className="md:col-span-6 bg-white rounded-[24px] border border-[#c2c6d3] shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#004287]">list_alt</span>
              <h3 className="text-lg font-semibold text-[#0b1c30]">Observed Symptoms</h3>
            </div>
            <ul className="space-y-3">
              {['Intense Pruritus', 'Erythematous Patches', 'Dry/Scaly Skin', 'Lichenification'].map((symptom) => (
                <li key={symptom} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#004287] text-xl">check_circle</span>
                  <span className="text-sm text-[#424751]">{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Care Tips Card */}
          <div className="md:col-span-6 bg-white rounded-[24px] border border-[#c2c6d3] shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#004287]">spa</span>
              <h3 className="text-lg font-semibold text-[#0b1c30]">Recommended Care</h3>
            </div>
            <ul className="space-y-3">
              {['Moisturize regularly', 'Avoid triggers', 'Cool compresses', 'Gentle cleansers'].map((tip) => (
                <li key={tip} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#004287] text-xl">tips_and_updates</span>
                  <span className="text-sm text-[#424751]">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sources Card */}
          <div className="md:col-span-12 bg-white rounded-[24px] border border-[#c2c6d3] shadow-sm p-6">
            <h3 className="text-lg font-semibold text-[#0b1c30] mb-4">Reference Sources</h3>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.aad.org" target="_blank" rel="noopener noreferrer" className="text-sm text-[#004287] underline hover:text-[#003570]">
                American Academy of Dermatology (AAD)
              </a>
              <a href="https://www.mayoclinic.org" target="_blank" rel="noopener noreferrer" className="text-sm text-[#004287] underline hover:text-[#003570]">
                Mayo Clinic
              </a>
              <a href="https://www.nih.gov" target="_blank" rel="noopener noreferrer" className="text-sm text-[#004287] underline hover:text-[#003570]">
                National Institutes of Health (NIH)
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
