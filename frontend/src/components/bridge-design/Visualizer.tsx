import React from 'react';
import Image from 'next/image';
import { MonitorPlay } from 'lucide-react';
import { GeoParams } from '@/types';

interface VisualizerProps {
    overallWidth: number;
    carriageway: number;
    geoParams: GeoParams;
}

export function Visualizer({
    overallWidth,
    carriageway,
    geoParams,
}: VisualizerProps) {
    return (
        <div className="flex-1 bg-[#0f172a] relative flex flex-col items-center justify-center p-6 overflow-hidden">
            <div className="absolute inset-0 z-0 cad-grid pointer-events-none" />

            {/* Header Tag - Visualizer style */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-3">
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-xl flex items-center gap-3">
                    <div className="p-1.5 bg-emerald-500 rounded-full text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                        <MonitorPlay size={14} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Visualizer</span>
                        <span className="text-xs font-bold text-slate-100 leading-none mt-1">Cross Section View</span>
                    </div>
                </div>
            </div>

            {/* XYZ Axis Indicator */}
            <div className="absolute bottom-4 right-4 z-10 w-12 h-12 bg-[#374151] rounded-lg shadow-lg flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    {/* X axis - Red */}
                    <line x1="18" y1="18" x2="32" y2="18" stroke="#ef4444" strokeWidth="2" />
                    <polygon points="32,18 28,16 28,20" fill="#ef4444" />
                    <text x="34" y="20" fill="#ef4444" fontSize="8" fontWeight="bold">X</text>
                    {/* Y axis - Green */}
                    <line x1="18" y1="18" x2="8" y2="28" stroke="#22c55e" strokeWidth="2" />
                    <polygon points="8,28 10,24 13,26" fill="#22c55e" />
                    <text x="4" y="32" fill="#22c55e" fontSize="8" fontWeight="bold">Y</text>
                    {/* Z axis - Blue */}
                    <line x1="18" y1="18" x2="18" y2="4" stroke="#3b82f6" strokeWidth="2" />
                    <polygon points="18,4 16,8 20,8" fill="#3b82f6" />
                    <text x="20" y="6" fill="#3b82f6" fontSize="8" fontWeight="bold">Z</text>
                </svg>
            </div>

            {/* Image Container */}
            <div className="relative z-10 w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-700 group">
                <Image
                    src="/bridge-section.png"
                    alt="Bridge Cross Section"
                    width={1200}
                    height={600}
                    className="w-full h-auto object-contain"
                    priority
                />

                {/* Data Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-[#0f172a]/90 text-white px-2.5 py-1 rounded text-[10px] font-mono flex items-center gap-1.5 border border-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Overall Width: <span className="text-emerald-400 font-semibold">{overallWidth.toFixed(2)}m</span>
                    </div>
                    <div className="bg-[#0f172a]/90 text-white px-2.5 py-1 rounded text-[10px] font-mono flex items-center gap-1.5 border border-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        Carriageway: <span className="text-blue-400 font-semibold">{carriageway}m</span>
                    </div>
                    <div className="bg-[#0f172a]/90 text-white px-2.5 py-1 rounded text-[10px] font-mono flex items-center gap-1.5 border border-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        Girders: <span className="text-amber-400 font-semibold">{geoParams.numGirders}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
