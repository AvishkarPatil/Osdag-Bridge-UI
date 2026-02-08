import React from 'react';

interface MaterialInputsProps {
    isOther: boolean;
    girderMat: string;
    setGirderMat: (mat: string) => void;
    braceMat: string;
    setBraceMat: (mat: string) => void;
    deckMat: string;
    setDeckMat: (mat: string) => void;
}

export function MaterialInputs({
    isOther,
    girderMat,
    setGirderMat,
    braceMat,
    setBraceMat,
    deckMat,
    setDeckMat,
}: MaterialInputsProps) {
    const steelGrades = ['E250', 'E350', 'E450'].map(v => ({ value: v, label: v }));
    const concreteGrades = ['M25', 'M30', 'M35', 'M40', 'M45', 'M50', 'M55', 'M60'].map(v => ({ value: v, label: v }));

    return (
        <div className={`rounded-lg border border-gray-200 overflow-hidden ${isOther ? 'opacity-40 pointer-events-none' : ''}`}>
            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wide">Materials</span>
            </div>
            <div className="divide-y divide-gray-100">
                <div className="flex items-center justify-between px-3 py-2.5 bg-white hover:bg-gray-50 transition-colors">
                    <span className="text-xs font-medium text-gray-700">GIRDER STEEL</span>
                    <div className="w-20">
                        <select
                            value={girderMat}
                            onChange={e => setGirderMat(e.target.value)}
                            className="w-full h-7 px-2 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded cursor-pointer focus:ring-1 focus:ring-blue-300"
                        >
                            {steelGrades.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                    </div>
                </div>
                <div className="flex items-center justify-between px-3 py-2.5 bg-white hover:bg-gray-50 transition-colors">
                    <span className="text-xs font-medium text-gray-700">CROSS BRACING</span>
                    <div className="w-20">
                        <select
                            value={braceMat}
                            onChange={e => setBraceMat(e.target.value)}
                            className="w-full h-7 px-2 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded cursor-pointer focus:ring-1 focus:ring-blue-300"
                        >
                            {steelGrades.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                    </div>
                </div>
                <div className="flex items-center justify-between px-3 py-2.5 bg-white hover:bg-gray-50 transition-colors">
                    <span className="text-xs font-medium text-gray-700">DECK CONCRETE</span>
                    <div className="w-20">
                        <select
                            value={deckMat}
                            onChange={e => setDeckMat(e.target.value)}
                            className="w-full h-7 px-2 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded cursor-pointer focus:ring-1 focus:ring-blue-300"
                        >
                            {concreteGrades.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
