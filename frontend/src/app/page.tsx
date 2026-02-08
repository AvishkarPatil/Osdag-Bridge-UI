'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  fetchStates,
  fetchCities,
  fetchLocationData,
  calculateGeometry,
} from '@/lib/api';
import type { StructureType, LocationData, GeoParams, CustomParams, ValidationErrors } from '@/types';

import { Select } from '@/components/ui/Select';
import { FormRow } from '@/components/ui/FormRow';

import { ProjectLocation } from '@/components/bridge-design/ProjectLocation';
import { GeometricDetails } from '@/components/bridge-design/GeometricDetails';
import { MaterialInputs } from '@/components/bridge-design/MaterialInputs';
import { Visualizer } from '@/components/bridge-design/Visualizer';
import { CustomParamsModal } from '@/components/bridge-design/CustomParamsModal';
import { GeometryModal } from '@/components/bridge-design/GeometryModal';

export default function GroupDesignPage() {
  const [structureType, setStructureType] = useState<StructureType>('Highway');
  const [locMode, setLocMode] = useState<'database' | 'custom'>('database');
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [customParams, setCustomParams] = useState<CustomParams>({
    wind: '', zone: 'III', factor: '', maxTemp: '', minTemp: ''
  });
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [span, setSpan] = useState<number>(30);
  const [carriageway, setCarriageway] = useState<number>(7.5);
  const [footpath, setFootpath] = useState<string>('None');
  const [skew, setSkew] = useState<number>(0);
  const [isGeoModalOpen, setIsGeoModalOpen] = useState(false);
  const [geoParams, setGeoParams] = useState<GeoParams>({ spacing: 2.5, numGirders: 5, overhang: 0 });
  const [girderMat, setGirderMat] = useState('E250');
  const [braceMat, setBraceMat] = useState('E250');
  const [deckMat, setDeckMat] = useState('M25');
  const [errors, setErrors] = useState<ValidationErrors>({});

  const isOther = structureType === 'Other';
  const overallWidth = carriageway + 5.0;

  useEffect(() => {
    fetchStates().then(setStates).catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetchCities(selectedState).then(setCities).catch(console.error);
      setSelectedCity('');
      setLocationData(null);
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedCity && locMode === 'database') {
      fetchLocationData(selectedCity)
        .then(setLocationData)
        .catch(console.error);
    }
  }, [selectedCity, locMode]);

  useEffect(() => {
    const newErrors: ValidationErrors = {};
    if (isOther) newErrors.structure = "Other structures not included.";
    if (!isOther) {
      if (span < 20 || span > 45) newErrors.span = "Outside software range (20-45m)";
      if (carriageway < 4.25 || carriageway >= 24) newErrors.carriageway = "Must be ≥4.25 and <24m";
      if (skew > 15 || skew < -15) newErrors.skew = "IRC 24 (2010) detailed analysis required";
    }
    setErrors(newErrors);
  }, [structureType, span, carriageway, skew, isOther]);

  const handleGeoUpdate = useCallback(async (field: keyof GeoParams, value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    const calcData: { carriageway_width: number; girder_spacing?: number; num_girders?: number; deck_overhang?: number } =
      { carriageway_width: carriageway };

    if (field === 'numGirders') {
      calcData.num_girders = numValue;
      calcData.deck_overhang = geoParams.overhang;
    } else if (field === 'spacing') {
      calcData.girder_spacing = numValue;
      calcData.deck_overhang = geoParams.overhang;
    } else if (field === 'overhang') {
      calcData.deck_overhang = numValue;
      calcData.girder_spacing = geoParams.spacing;
    }

    try {
      const result = await calculateGeometry(calcData);
      setGeoParams({
        spacing: result.girder_spacing,
        numGirders: result.num_girders,
        overhang: result.deck_overhang,
      });
    } catch {
      let newP = { ...geoParams, [field]: numValue };
      if (newP.spacing <= 0) newP.spacing = 0.1;
      if (field === 'numGirders' && newP.numGirders > 0) {
        newP.spacing = (overallWidth - newP.overhang) / newP.numGirders;
      } else if ((field === 'spacing' || field === 'overhang') && newP.spacing > 0) {
        newP.numGirders = Math.round((overallWidth - newP.overhang) / newP.spacing);
      }
      setGeoParams(newP);
    }
  }, [geoParams, carriageway, overallWidth]);

  const showLocationResult = (locMode === 'database' && !!locationData) || (locMode === 'custom' && !!customParams.wind);

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">

      {/* === LEFT PANEL === */}
      <div className="w-[420px] flex flex-col bg-white border-r border-gray-200 shrink-0">

        {/* Header */}
        <header className="px-4 py-3 border-b border-gray-100 flex items-center gap-3 bg-white">
          <Image
            src="/osdag-logo.png"
            alt="Osdag"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-tight">Osdag <span className="text-slate-400 font-light">| Group Design</span></h1>
            <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Open Steel Design & Graphics</p>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex">
          <button className="flex-1 py-3 text-xs font-semibold bg-amber-400 text-amber-900 transition-all">
            Basic Inputs
          </button>
          <button disabled className="flex-1 py-3 text-xs font-medium text-gray-400 bg-gray-50 border-b border-gray-200 cursor-not-allowed">
            Additional Inputs
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">

          {/* Type of Structure */}
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <FormRow label="Type of Structure" error={errors.structure}>
              <Select
                value={structureType}
                onChange={v => setStructureType(v as StructureType)}
                options={[{ value: 'Highway', label: 'Highway' }, { value: 'Other', label: 'Other' }]}
                error={!!errors.structure}
              />
            </FormRow>
          </div>

          <ProjectLocation
            isOther={isOther}
            locMode={locMode}
            setLocMode={setLocMode}
            states={states}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            cities={cities}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            locationData={locationData}
            customParams={customParams}
            setIsCustomModalOpen={setIsCustomModalOpen}
            showLocationResult={showLocationResult}
          />

          <GeometricDetails
            isOther={isOther}
            setIsGeoModalOpen={setIsGeoModalOpen}
            span={span}
            setSpan={setSpan}
            carriageway={carriageway}
            setCarriageway={setCarriageway}
            footpath={footpath}
            setFootpath={setFootpath}
            skew={skew}
            setSkew={setSkew}
            errors={errors}
          />

          <MaterialInputs
            isOther={isOther}
            girderMat={girderMat}
            setGirderMat={setGirderMat}
            braceMat={braceMat}
            setBraceMat={setBraceMat}
            deckMat={deckMat}
            setDeckMat={setDeckMat}
          />

        </div>
      </div>

      {/* === RIGHT PANEL === */}
      <Visualizer
        overallWidth={overallWidth}
        carriageway={carriageway}
        geoParams={geoParams}
      />

      <CustomParamsModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        customParams={customParams}
        setCustomParams={setCustomParams}
      />

      <GeometryModal
        isOpen={isGeoModalOpen}
        onClose={() => setIsGeoModalOpen(false)}
        geoParams={geoParams}
        handleGeoUpdate={handleGeoUpdate}
      />
    </div>
  );
}
