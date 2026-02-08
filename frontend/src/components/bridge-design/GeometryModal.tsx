import React from 'react';
import { Settings } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { GeoParams } from '@/types';

interface GeometryModalProps {
    isOpen: boolean;
    onClose: () => void;
    geoParams: GeoParams;
    handleGeoUpdate: (field: keyof GeoParams, value: string) => void;
}

export function GeometryModal({
    isOpen,
    onClose,
    geoParams,
    handleGeoUpdate,
}: GeometryModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Modify Geometry"
            icon={<Settings size={16} className="text-gray-400" />}
        >
            <div className="mb-5 p-3 rounded-lg border-2 border-amber-300 bg-amber-50 text-center">
                <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-2">Constraint Formula</div>
                <code className="font-mono text-sm text-gray-800 block">
                    (Width − Overhang) / Spacing = N
                </code>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Girder Spacing (m)</label>
                    <input
                        type="number"
                        step="0.1"
                        className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        value={geoParams.spacing.toFixed(1)}
                        onChange={e => handleGeoUpdate('spacing', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">No. of Girders (N)</label>
                    <input
                        type="number"
                        className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm font-mono bg-amber-50 text-amber-800 font-semibold focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                        value={geoParams.numGirders}
                        onChange={e => handleGeoUpdate('numGirders', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Overhang (m)</label>
                    <input
                        type="number"
                        step="0.1"
                        className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        value={geoParams.overhang.toFixed(1)}
                        onChange={e => handleGeoUpdate('overhang', e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-100">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 uppercase tracking-wide transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={onClose}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 uppercase tracking-wide transition-all"
                >
                    Update Geometry
                </button>
            </div>
        </Modal>
    );
}
