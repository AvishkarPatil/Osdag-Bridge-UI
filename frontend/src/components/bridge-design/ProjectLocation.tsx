import React from 'react';
import { MapPin, FileSpreadsheet } from 'lucide-react';
import { Select } from '../ui/Select';
import { LocationData, CustomParams } from '@/types';

interface ProjectLocationProps {
    isOther: boolean;
    locMode: 'database' | 'custom';
    setLocMode: (mode: 'database' | 'custom') => void;
    states: string[];
    selectedState: string;
    setSelectedState: (state: string) => void;
    cities: string[];
    selectedCity: string;
    setSelectedCity: (city: string) => void;
    locationData: LocationData | null;
    customParams: CustomParams;
    setIsCustomModalOpen: (open: boolean) => void;
    showLocationResult: boolean;
}

export function ProjectLocation({
    isOther,
    locMode,
    setLocMode,
    states,
    selectedState,
    setSelectedState,
    cities,
    selectedCity,
    setSelectedCity,
    locationData,
    customParams,
    setIsCustomModalOpen,
    showLocationResult,
}: ProjectLocationProps) {
    return (
        <div className={`rounded-xl border border-gray-200 bg-white shadow-sm transition-opacity ${isOther ? 'opacity-40 pointer-events-none' : ''}`}>
            <div className="px-3 py-3 flex items-center justify-between border-b border-amber-200 bg-amber-50 rounded-t-xl">
                <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-amber-700" />
                    <span className="text-[12px] font-semibold text-gray-800">PROJECT LOCATION</span>
                </div>
                <div className="flex bg-gray-100 rounded-lg p-0.5">
                    <button
                        onClick={() => setLocMode('database')}
                        className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${locMode === 'database'
                            ? 'bg-white text-gray-800 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Database
                    </button>
                    <button
                        onClick={() => setLocMode('custom')}
                        className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${locMode === 'custom'
                            ? 'bg-white text-gray-800 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Custom
                    </button>
                </div>
            </div>

            <div className="p-4">
                {locMode === 'database' && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <Select
                            value={selectedState}
                            onChange={setSelectedState}
                            options={states.map(s => ({ value: s, label: s }))}
                            placeholder="Select State"
                        />
                        <Select
                            value={selectedCity}
                            onChange={setSelectedCity}
                            options={cities.map(c => ({ value: c, label: c }))}
                            placeholder="Select District"
                            disabled={!selectedState}
                        />
                    </div>
                )}

                {locMode === 'custom' && (
                    <div className="mb-4">
                        <button
                            onClick={() => setIsCustomModalOpen(true)}
                            className="w-full py-2.5 bg-gray-50 border border-dashed border-gray-300 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2 transition-all"
                        >
                            <FileSpreadsheet size={14} /> Enter Custom Parameters
                        </button>
                    </div>
                )}

                {showLocationResult && (
                    <>
                        <div className="h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent mb-4" />
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Wind Speed</div>
                                <div className="text-[16px] font-bold text-gray-800">
                                    {locMode === 'database' ? locationData?.wind_speed : customParams.wind}
                                </div>
                                <div className="text-[10px] text-gray-400">m/s</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Seismic Zone</div>
                                <div className="text-[16px] font-bold text-gray-800">
                                    {locMode === 'database' ? locationData?.seismic_zone : customParams.zone}
                                </div>
                                <div className="text-[10px] text-gray-400">
                                    Z={locMode === 'database' ? locationData?.seismic_zone_factor : customParams.factor}
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Temperature</div>
                                <div className="text-[16px] font-bold text-gray-800">
                                    {locMode === 'database' ? `${locationData?.min_temp}/${locationData?.max_temp}` : `${customParams.minTemp}/${customParams.maxTemp}`}
                                </div>
                                <div className="text-[10px] text-gray-400">°C</div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
