import React from 'react';
import { Settings } from 'lucide-react';
import { FormRow } from '../ui/FormRow';
import { NumberInput } from '../ui/NumberInput';
import { Select } from '../ui/Select';
import { ValidationErrors } from '@/types';

interface GeometricDetailsProps {
    isOther: boolean;
    setIsGeoModalOpen: (open: boolean) => void;
    span: number;
    setSpan: (span: number) => void;
    carriageway: number;
    setCarriageway: (width: number) => void;
    footpath: string;
    setFootpath: (footpath: string) => void;
    skew: number;
    setSkew: (skew: number) => void;
    errors: ValidationErrors;
}

export function GeometricDetails({
    isOther,
    setIsGeoModalOpen,
    span,
    setSpan,
    carriageway,
    setCarriageway,
    footpath,
    setFootpath,
    skew,
    setSkew,
    errors,
}: GeometricDetailsProps) {
    const footpathOpts = ['None', 'Single-sided', 'Both'].map(v => ({ value: v, label: v }));

    return (
        <div className={`p-3 bg-gray-50 rounded-lg border border-gray-200 ${isOther ? 'opacity-40 pointer-events-none' : ''}`}>
            <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Geometric Details</span>
                <button
                    onClick={() => setIsGeoModalOpen(true)}
                    className="px-3 py-1.5 text-[10px] font-semibold rounded-full bg-amber-400 text-amber-900 hover:bg-amber-500 flex items-center gap-1.5 transition-colors shadow-sm"
                >
                    <Settings size={10} /> Modify Geometry
                </button>
            </div>

            <div className="space-y-3">
                <FormRow label="Span (m)" error={errors.span} disabled={isOther}>
                    <NumberInput value={span} onChange={setSpan} error={!!errors.span} mono />
                </FormRow>
                <FormRow label="Carriageway Width (m)" error={errors.carriageway} disabled={isOther}>
                    <NumberInput value={carriageway} onChange={setCarriageway} step={0.1} error={!!errors.carriageway} mono />
                </FormRow>
                <FormRow label="Footpath" disabled={isOther}>
                    <Select value={footpath} onChange={setFootpath} options={footpathOpts} />
                </FormRow>
                <FormRow label="Skew Angle (degrees)" error={errors.skew} disabled={isOther}>
                    <NumberInput value={skew} onChange={setSkew} error={!!errors.skew} mono />
                </FormRow>
            </div>
        </div>
    );
}
