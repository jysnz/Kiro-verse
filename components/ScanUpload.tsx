'use client';

import { useState, useRef } from 'react';
import DashboardLayout from './DashboardLayout';

type ScanState = 'idle' | 'preview' | 'analyzing' | 'complete';

export default function ScanUpload() {
  const [state, setState] = useState<ScanState>('idle');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setState('preview');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeImage = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
    setState('idle');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = () => {
    setState('analyzing');
    setTimeout(() => {
      setState('complete');
    }, 3000);
  };

  return (
    <DashboardLayout activePage="Scan">
      <div className="p-6 md:p-10 bg-[#f8f9ff] min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#0b1c30]">New Skin Scan</h1>
          <p className="text-[#004287] mt-1">
            Upload a clear photo of the affected area for AI analysis.
          </p>
        </div>

        {/* Upload Zone */}
        <div className="flex justify-center mb-8">
          <div
            className={`relative w-full max-w-2xl aspect-video border-2 border-dashed rounded-[24px] flex flex-col items-center justify-center cursor-pointer transition-colors ${
              state === 'idle'
                ? 'border-[#c2c6d3] hover:border-[#005fac] hover:bg-[#eff4ff] bg-white'
                : 'border-[#c2c6d3] bg-white'
            }`}
            onClick={() => state === 'idle' && fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleInputChange}
            />

            {state === 'idle' && (
              <>
                <div className="w-16 h-16 rounded-full bg-[#eff4ff] flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[#004287] text-3xl">
                    add_a_photo
                  </span>
                </div>
                <p className="text-[#0b1c30] font-medium">Drag and drop your photo here</p>
                <p className="text-sm text-[#004287] mt-1">or click to browse files</p>
                <p className="text-xs text-[#c2c6d3] mt-3">
                  Supported formats: JPG, PNG, WebP
                </p>
              </>
            )}

            {state === 'preview' && imageUrl && (
              <div className="relative w-full h-full p-4">
                <img
                  src={imageUrl}
                  alt="Selected skin photo"
                  className="w-full h-full object-contain rounded-[16px]"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                  className="absolute top-6 right-6 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-red-500 text-xl">close</span>
                </button>
              </div>
            )}

            {state === 'analyzing' && (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-[#004287] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-[#0b1c30] font-medium">Analyzing your photo...</p>
                <p className="text-sm text-[#004287] mt-1">This may take a few moments</p>
              </div>
            )}

            {state === 'complete' && (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-green-600 text-3xl">
                    check_circle
                  </span>
                </div>
                <p className="text-[#0b1c30] font-medium">Analysis Complete</p>
                <p className="text-sm text-[#004287] mt-1">View your results below</p>
              </div>
            )}
          </div>
        </div>

        {/* Photo Guidelines */}
        <div className="bg-white rounded-[16px] border border-[#c2c6d3] p-6 max-w-2xl mx-auto mb-8">
          <h2 className="text-lg font-semibold text-[#0b1c30] mb-4">Photo Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center p-4">
              <span className="material-symbols-outlined text-[#004287] text-2xl mb-2">
                light_mode
              </span>
              <p className="font-medium text-[#0b1c30] text-sm">Good lighting</p>
              <p className="text-xs text-[#004287] mt-1">
                Use natural light and avoid shadows
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <span className="material-symbols-outlined text-[#004287] text-2xl mb-2">
                zoom_in
              </span>
              <p className="font-medium text-[#0b1c30] text-sm">Close-up</p>
              <p className="text-xs text-[#004287] mt-1">
                Get close enough to see details clearly
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <span className="material-symbols-outlined text-[#004287] text-2xl mb-2">
                center_focus_strong
              </span>
              <p className="font-medium text-[#0b1c30] text-sm">Steady focus</p>
              <p className="text-xs text-[#004287] mt-1">
                Keep the camera still for a sharp image
              </p>
            </div>
          </div>
        </div>

        {/* Analyze Button */}
        <div className="flex justify-center">
          <button
            onClick={handleAnalyze}
            disabled={state !== 'preview'}
            className="px-8 py-3 bg-[#004287] text-white font-medium rounded-[12px] transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
          >
            Analyze Skin
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
