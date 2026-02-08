import React from 'react';
import { FileText, Check } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Select } from '../ui/Select';
import { CustomParams } from '@/types';

interface CustomParamsModalProps {
    isOpen: boolean;
    onClose: () => void;
    customParams: CustomParams;
    setCustomParams: (params: CustomParams) => void;
}

export function CustomParamsModal({
    isOpen,
    onClose,
    customParams,
    setCustomParams,
}: CustomParamsModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Custom Loading Parameters"
            icon={<FileText size={16} className="text-gray-400" />}
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Basic Wind Speed (m/s)</label>
                    <input
                        type="number"
                        className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        value={customParams.wind}
                        onChange={e => setCustomParams({ ...customParams, wind: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Seismic Zone</label>
                        <Select
                            value={customParams.zone}
                            onChange={v => setCustomParams({ ...customParams, zone: v })}
                            options={['II', 'III', 'IV', 'V'].map(v => ({ value: v, label: v }))}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Zone Factor</label>
                        <input
                            type="number"
                            step="0.01"
                            className="w-full h-9 px-3 border border-gray-300 rounded-lg text-sm font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            value={customParams.factor}
                            onChange={e => setCustomParams({ ...customParams, factor: e.target.value })}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Max Temp (°C)</label>
                        <input
                            type="number"
                            className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            value={customParams.maxTemp}
                            onChange={e => setCustomParams({ ...customParams, maxTemp: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Min Temp (°C)</label>
                        <input
                            type="number"
                            className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            value={customParams.minTemp}
                            onChange={e => setCustomParams({ ...customParams, minTemp: e.target.value })}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 uppercase tracking-wide transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-gray-800 text-white rounded-lg text-xs font-semibold hover:bg-gray-900 flex items-center gap-1.5 transition-colors"
                    >
                        <Check size={14} /> Apply
                    </button>
                </div>
            </div>
        </Modal>
    );
}
