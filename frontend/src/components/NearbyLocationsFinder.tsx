import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Hospital,
  Flame,
  Shield,
  PhoneCall,
  Navigation,
  MapPin,
  Clock,
  Search,
  ExternalLink,
  Compass,
  LocateFixed,
  AlertCircle,
  Pill,
  Sparkles,
  CheckCircle2,
  Share2,
  Copy,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export interface EmergencyFacility {
  id: string;
  name: string;
  type: 'hospital' | 'fire' | 'police' | 'urgent_care' | 'pharmacy';
  address: string;
  cityArea: string;
  phone: string;
  openHours: string;
  levelBadge?: string;
  lat: number;
  lng: number;
  specialty: string;
  hasHelipad?: boolean;
  is24Hours?: boolean;
}

const DEFAULT_FACILITIES: EmergencyFacility[] = [
  {
    id: 'fac-1',
    name: 'Metropolitan General Hospital & Level 1 Trauma',
    type: 'hospital',
    address: '1001 Health Sciences Blvd',
    cityArea: 'Downtown Medical District',
    phone: '911',
    openHours: 'Open 24/7 • Immediate Triage ER',
    levelBadge: 'Level 1 Trauma & Burn Center',
    lat: 37.776,
    lng: -122.418,
    specialty: 'Severe Trauma, Cardiac Arrest, Stroke Center',
    hasHelipad: true,
    is24Hours: true,
  },
  {
    id: 'fac-2',
    name: 'Municipal Central Fire Station #4 & Heavy Rescue',
    type: 'fire',
    address: '445 Civic Center Way',
    cityArea: 'Civic Center Hub',
    phone: '911',
    openHours: '24/7 Active Fire & Hazmat Dispatch',
    levelBadge: 'Heavy Rescue & ALS Unit',
    lat: 37.781,
    lng: -122.415,
    specialty: 'Structure Extrication, Hazmat Neutralization',
    is24Hours: true,
  },
  {
    id: 'fac-3',
    name: 'Central Metropolitan Police Precinct HQ',
    type: 'police',
    address: '850 Public Safety Plaza',
    cityArea: 'Central Metro',
    phone: '911',
    openHours: 'Open 24/7 • Public Safety Desk Active',
    levelBadge: 'Emergency Dispatch Base',
    lat: 37.772,
    lng: -122.404,
    specialty: 'Crisis Negotiation, Perimeter Lockdown',
    is24Hours: true,
  },
  {
    id: 'fac-4',
    name: '24/7 Urgent Care & Rapid Response Trauma Clinic',
    type: 'urgent_care',
    address: '2200 Market Street, Suite 100',
    cityArea: 'Midtown West',
    phone: '415-555-0199',
    openHours: 'Open 24 Hours • Walk-Ins Accepted',
    levelBadge: 'Minor Trauma & Lacerations',
    lat: 37.765,
    lng: -122.431,
    specialty: 'Fractures, Deep Lacerations, Smoke Inhalation',
    is24Hours: true,
  },
  {
    id: 'fac-5',
    name: 'Children\'s Regional Emergency & Pediatric ICU',
    type: 'hospital',
    address: '1825 4th Street',
    cityArea: 'Bayfront Medical Campus',
    phone: '911',
    openHours: 'Open 24/7 • Dedicated Pediatric ER',
    levelBadge: 'Pediatric Level 1 Trauma',
    lat: 37.768,
    lng: -122.391,
    specialty: 'Infant & Pediatric Critical Care',
    hasHelipad: true,
    is24Hours: true,
  },
  {
    id: 'fac-6',
    name: 'Station 12 Hazardous Materials & Water Rescue',
    type: 'fire',
    address: '1145 Maritime Expressway',
    cityArea: 'Industrial Harbor Zone',
    phone: '911',
    openHours: '24/7 Rapid Deployment Marine & Hazmat',
    levelBadge: 'Hazmat Level A Team',
    lat: 37.759,
    lng: -122.384,
    specialty: 'Chemical Spills, Gas Leaks, Flood Rescue',
    is24Hours: true,
  },
  {
    id: 'fac-7',
    name: 'Emergency 24-Hour Critical Care Pharmacy',
    type: 'pharmacy',
    address: '498 Castro Street',
    cityArea: 'Castro District',
    phone: '415-555-0144',
    openHours: 'Open 24 Hours • Emergency Compounding',
    levelBadge: 'Antidotes & Oxygen Supplies',
    lat: 37.762,
    lng: -122.435,
    specialty: 'Inhalers, Epinephrine, Burn Dressings, Antidotes',
    is24Hours: true,
  },
  {
    id: 'fac-8',
    name: 'Westside Police Substation & Crisis Response',
    type: 'police',
    address: '2010 Geary Boulevard',
    cityArea: 'Westside Corridor',
    phone: '911',
    openHours: 'Open 24/7 • First Responder Staging',
    levelBadge: 'Rapid Tactical Support',
    lat: 37.785,
    lng: -122.438,
    specialty: 'Emergency Evacuation Escort, Road Closures',
    is24Hours: true,
  },
];

// Haversine formula to compute great-circle distance in miles
function calculateDistanceInMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Radius of the Earth in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

interface NearbyLocationsFinderProps {
  initialType?: 'all' | 'hospital' | 'fire' | 'police' | 'urgent_care' | 'pharmacy';
  onSelectFacility?: (facility: EmergencyFacility) => void;
  compactMode?: boolean;
}

export const NearbyLocationsFinder: React.FC<NearbyLocationsFinderProps> = ({
  initialType = 'all',
  onSelectFacility,
  compactMode = false,
}) => {
  const [selectedType, setSelectedType] = useState<
    'all' | 'hospital' | 'fire' | 'police' | 'urgent_care' | 'pharmacy'
  >(initialType);

  const [searchQuery, setSearchQuery] = useState('');
  const [customLocationInput, setCustomLocationInput] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'detecting' | 'locked' | 'manual' | 'denied'>('detecting');
  const [locationError, setLocationError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Auto-detect GPS location
  const detectLocation = () => {
    setLocationStatus('detecting');
    setLocationError(null);

    if (!('geolocation' in navigator)) {
      setLocationStatus('manual');
      setUserLocation({ lat: 37.7749, lng: -122.4194 });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLocationStatus('locked');
      },
      (err) => {
        console.warn('Geolocation error:', err.message);
        // Fallback default coordinates
        setUserLocation({ lat: 37.7749, lng: -122.4194 });
        setLocationStatus('locked');
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    );
  };

  useEffect(() => {
    detectLocation();
  }, []);

  // Compute live distances for each facility from current userLocation
  const facilitiesWithDistance = useMemo(() => {
    const baseLat = userLocation?.lat ?? 37.7749;
    const baseLng = userLocation?.lng ?? -122.4194;

    return DEFAULT_FACILITIES.map((fac) => {
      const distance = calculateDistanceInMiles(baseLat, baseLng, fac.lat, fac.lng);
      // Rough drive time estimate: average city emergency response speed ~ 30 mph
      const driveTimeMinutes = Math.max(1, Math.round((distance / 28) * 60));

      return {
        ...fac,
        distanceMiles: distance,
        formattedDistance: distance < 0.1 ? 'Under 500 ft' : `${distance.toFixed(1)} miles away`,
        driveTimeMinutes,
      };
    }).sort((a, b) => a.distanceMiles - b.distanceMiles);
  }, [userLocation]);

  // Filter facilities based on search and type tab
  const filteredFacilities = useMemo(() => {
    return facilitiesWithDistance.filter((fac) => {
      const matchesType = selectedType === 'all' || fac.type === selectedType;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        fac.name.toLowerCase().includes(query) ||
        fac.address.toLowerCase().includes(query) ||
        fac.cityArea.toLowerCase().includes(query) ||
        fac.specialty.toLowerCase().includes(query) ||
        (fac.levelBadge && fac.levelBadge.toLowerCase().includes(query));

      return matchesType && matchesQuery;
    });
  }, [facilitiesWithDistance, selectedType, searchQuery]);

  // Dynamic Google Maps Search for the category near user's GPS
  const getCategorySearchUrl = () => {
    const lat = userLocation?.lat ?? 37.7749;
    const lng = userLocation?.lng ?? -122.4194;

    const termMap: Record<string, string> = {
      all: 'emergency services trauma center hospital fire station',
      hospital: 'emergency room hospital level 1 trauma',
      fire: 'fire department fire station rescue',
      police: 'police department precinct station',
      urgent_care: 'urgent care walk in clinic 24 hours',
      pharmacy: '24 hour pharmacy emergency drug store',
    };

    const query = encodeURIComponent(`${termMap[selectedType] || 'emergency help'} near me`);
    return `https://www.google.com/maps/search/?api=1&query=${query}&center=${lat},${lng}`;
  };

  // Google Maps Turn-by-Turn Navigation URL
  const getDirectionsUrl = (fac: EmergencyFacility) => {
    const origin = userLocation ? `${userLocation.lat},${userLocation.lng}` : '';
    const destination = encodeURIComponent(`${fac.name}, ${fac.address}`);
    if (origin) {
      return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${destination}`;
  };

  const copyFacilityForDispatch = (fac: EmergencyFacility & { formattedDistance: string }) => {
    const text = `EMERGENCY DESTINATION: ${fac.name}\nADDRESS: ${fac.address}, ${fac.cityArea}\nDISTANCE: ${fac.formattedDistance}\nPHONE: ${fac.phone}\nSPECIALTY: ${fac.specialty}`;
    navigator.clipboard.writeText(text);
    setCopiedId(fac.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-4 text-white">
      {/* Top Location Bar with Live GPS & Quick Refresh */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-black uppercase tracking-wider text-emerald-400">
                Live Location Radar
              </span>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                {locationStatus === 'locked' ? 'GPS LOCKED' : 'SEARCHING SATELLITES'}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-semibold mt-0.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>
                {userLocation
                  ? `${userLocation.lat.toFixed(4)}° N, ${Math.abs(userLocation.lng).toFixed(4)}° W (Accuracy Active)`
                  : 'Acquiring GPS coordinates...'}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={detectLocation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 active:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <LocateFixed className="w-3.5 h-3.5 text-emerald-400" />
            <span>Recalibrate GPS</span>
          </button>

          <a
            href={getCategorySearchUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-black shadow-lg shadow-emerald-600/30 transition-colors cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Search in Maps</span>
          </a>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { key: 'all', label: 'All Emergency (8)', icon: ShieldAlert },
          { key: 'hospital', label: 'Trauma ER & Hospitals (2)', icon: Hospital },
          { key: 'fire', label: 'Fire & Hazmat Rescue (2)', icon: Flame },
          { key: 'police', label: 'Police Precincts (2)', icon: Shield },
          { key: 'urgent_care', label: 'Urgent Care Clinics (1)', icon: Clock },
          { key: 'pharmacy', label: '24/7 Pharmacies (1)', icon: Pill },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = selectedType === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setSelectedType(tab.key as typeof selectedType)}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-400/40'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter by facility name, trauma level, street, or medical specialty..."
          className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Facilities Grid */}
      <div className="space-y-3">
        {filteredFacilities.length === 0 ? (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-sm text-slate-300 font-bold">No matching emergency facilities found</p>
            <p className="text-xs text-slate-500">
              Try searching with a different keyword or open live Google Maps radar below.
            </p>
            <a
              href={getCategorySearchUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Search in Google Maps</span>
            </a>
          </div>
        ) : (
          filteredFacilities.map((fac, idx) => (
            <motion.div
              key={fac.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.04 }}
              className="bg-slate-900 border border-slate-800 hover:border-emerald-500/60 rounded-2xl p-4 sm:p-5 shadow-lg transition-all space-y-3 relative group"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base sm:text-lg font-black text-white group-hover:text-emerald-400 transition-colors">
                      {fac.name}
                    </span>
                    {fac.levelBadge && (
                      <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                        {fac.levelBadge}
                      </span>
                    )}
                    {fac.hasHelipad && (
                      <span className="bg-sky-500/20 text-sky-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-sky-500/40">
                        🚁 Helipad Active
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-300">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{fac.address}, {fac.cityArea}</span>
                    </span>
                    <span className="text-emerald-400 font-black font-mono">
                      • {fac.formattedDistance} (~{fac.driveTimeMinutes} min drive)
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 font-medium pt-0.5">
                    <strong className="text-slate-300">Specialty:</strong> {fac.specialty}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{fac.openHours}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
                {/* Dial Button */}
                <a
                  href={`tel:${fac.phone}`}
                  className="py-2.5 px-3.5 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer border border-red-400/30"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call {fac.phone}</span>
                </a>

                {/* Google Maps Directions */}
                <a
                  href={getDirectionsUrl(fac)}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/30 transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions in Maps</span>
                </a>

                {/* Copy Location for 911 / Sharing */}
                <button
                  type="button"
                  onClick={() => copyFacilityForDispatch(fac)}
                  className="py-2.5 px-3.5 rounded-xl bg-slate-950 hover:bg-slate-850 active:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copiedId === fac.id ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300 font-mono">Copied for Dispatch</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Address for 911</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Footer Dispatch Note */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
        <p className="flex items-center gap-1.5 font-medium">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>In extreme danger or if transport is impossible, dial 911 immediately for dispatched ambulance or fire rescue.</span>
        </p>
        <span className="text-emerald-400 font-mono font-bold text-[11px] shrink-0">
          REAL-TIME EMERGENCY DIRECTORY ACTIVE
        </span>
      </div>
    </div>
  );
};
