'use client';

import React, { useRef, useEffect, useState, Suspense, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-blue-300 text-sm">Loading Globe...</p>
      </div>
    </div>
  )
});

interface LocationPin {
  lat: number;
  lng: number;
  label: string;
  glowIntensity?: number;
  country?: string;
  size?: number;
  color?: string;
}

interface InteractiveGlobeProps {
  pins?: LocationPin[];
  autoRotate?: boolean;
  className?: string;
  globeImageUrl?: string;
  bumpImageUrl?: string;
}

const defaultPins: LocationPin[] = [
  { lat: 40.7128, lng: -74.0060, label: "New York", glowIntensity: 1.2, country: "USA", size: 0.8 },
  { lat: 51.5074, lng: -0.1278, label: "London", glowIntensity: 1.0, country: "UK", size: 0.6 },
  { lat: 35.6762, lng: 139.6503, label: "Tokyo", glowIntensity: 1.1, country: "Japan", size: 0.7 },
  { lat: -33.8688, lng: 151.2093, label: "Sydney", glowIntensity: 0.9, country: "Australia", size: 0.5 },
  { lat: 37.7749, lng: -122.4194, label: "San Francisco", glowIntensity: 1.3, country: "USA", size: 0.9 },
  { lat: 48.8566, lng: 2.3522, label: "Paris", glowIntensity: 1.0, country: "France", size: 0.6 },
  { lat: 55.7558, lng: 37.6176, label: "Moscow", glowIntensity: 0.8, country: "Russia", size: 0.5 },
  { lat: -23.5505, lng: -46.6333, label: "São Paulo", glowIntensity: 1.1, country: "Brazil", size: 0.7 },
  { lat: 1.3521, lng: 103.8198, label: "Singapore", glowIntensity: 1.0, country: "Singapore", size: 0.4 },
  { lat: -26.2041, lng: 28.0473, label: "Johannesburg", glowIntensity: 0.9, country: "South Africa", size: 0.5 }
];

// Generate animated arcs between major cities
const generateArcs = (pins: LocationPin[]) => {
  const arcs: unknown[] = [];
  const majorCities = pins.slice(0, 6); // Use first 6 cities for arcs
  
  for (let i = 0; i < majorCities.length; i++) {
    for (let j = i + 1; j < majorCities.length; j++) {
      if (Math.random() > 0.7) { // Only show some arcs to avoid clutter
        arcs.push({
          startLat: majorCities[i].lat,
          startLng: majorCities[i].lng,
          endLat: majorCities[j].lat,
          endLng: majorCities[j].lng,
          color: ['rgba(0, 150, 255, 0.6)', 'rgba(255, 100, 255, 0.6)'],
          strokeWidth: 2 + Math.random() * 2,
        });
      }
    }
  }
  return arcs;
};

// Generate rings/halos around points
const generateRings = (pins: LocationPin[]) => {
  return pins.map(pin => ({
    lat: pin.lat,
    lng: pin.lng,
    maxR: 3 + (pin.glowIntensity || 1) * 2,
    propagationSpeed: 2 + Math.random(),
    repeatPeriod: 1000 + Math.random() * 1000,
    color: pin.color || 'rgba(0, 150, 255, 0.8)'
  }));
};

const GlobeScene: React.FC<InteractiveGlobeProps> = ({ 
  pins = defaultPins, 
  autoRotate = true, 
  className = "",
  globeImageUrl = "//unpkg.com/three-globe/example/img/earth-night.jpg",
  bumpImageUrl = "//unpkg.com/three-globe/example/img/earth-topology.png"
}) => {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const [arcs, setArcs] = useState<any[]>([]);
  const [rings, setRings] = useState<any[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<LocationPin | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle resize
  useEffect(() => {
    if (!isClient) return; // Only run on client

    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({ 
          width: clientWidth, 
          height: Math.max(clientHeight, 400) 
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isClient]);

  // Generate arcs and rings
  useEffect(() => {
    setArcs(generateArcs(pins));
    setRings(generateRings(pins));
  }, [pins]);

  // Auto rotation control
  useEffect(() => {
    if (globeRef.current) {
      if (autoRotate) {
        globeRef.current.controls().autoRotate = true;
        globeRef.current.controls().autoRotateSpeed = 0.5;
      } else {
        globeRef.current.controls().autoRotate = false;
      }
    }
  }, [autoRotate]);

  // Point hover handlers
  const handlePointHover = useCallback((point: object | null) => {
    setHoveredPoint(point as LocationPin | null);
    if (containerRef.current) {
      containerRef.current.style.cursor = point ? 'pointer' : 'grab';
    }
  }, []);

  // Point click handler
  const handlePointClick = useCallback((point: object, _event: MouseEvent, _coords: { lat: number; lng: number; altitude: number; }) => {
    if (globeRef.current) {
      const locationPoint = point as LocationPin;
      // Animate to point
      globeRef.current.pointOfView({
        lat: locationPoint.lat,
        lng: locationPoint.lng,
        altitude: 1.5
      }, 1000);
    }
  }, []);

  // Custom point label
  const getPointLabel = useCallback((obj: object) => {
    const point = obj as LocationPin;
    return `
      <div style="
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(59, 130, 246, 0.3);
        border-radius: 8px;
        padding: 8px 12px;
        color: white;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      ">
        <div style="font-weight: bold; color: #60A5FA;">${point.label}</div>
        <div style="color: #94A3B8; font-size: 10px;">${point.country || ''}</div>
        <div style="color: #34D399; font-size: 10px;">● Active</div>
      </div>
    `;
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-300 text-sm">Initializing Globe...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`w-full h-full relative ${className}`}
      style={{ minHeight: '400px' }}
    >
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        
        // Globe appearance
        globeImageUrl={globeImageUrl}
        bumpImageUrl={bumpImageUrl}
        showGlobe={true}
        showAtmosphere={true}
        atmosphereColor="#60A5FA"
        atmosphereAltitude={0.15}
        
        // Points/Pins
        pointsData={pins}
        pointLat="lat"
        pointLng="lng"
        pointColor={(point: any) => (point as LocationPin).color || '#60A5FA'}
        pointAltitude={(obj: any) => ((obj as LocationPin).size || 0.1) * 0.1}
        pointRadius={(obj: object) => ((obj as LocationPin).size || 0.5) * 0.8}
        pointResolution={12}
        pointsMerge={false}
        pointLabel={getPointLabel}
        onPointHover={handlePointHover}
        onPointClick={handlePointClick}
        
        // Arcs between cities
        arcsData={arcs}
        arcColor="color"
        arcStroke="strokeWidth"
        arcDashLength={0.9}
        arcDashGap={4}
        arcDashAnimateTime={2000}
        arcsTransitionDuration={1000}
        
        // Rings/Halos
        ringsData={rings}
        ringColor={() => 'rgba(59, 130, 246, 0.4)'}
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"
        ringResolution={64}
        
        // Interaction
        enablePointerInteraction={true}
        
        // Animation and controls
        animateIn={true}
        waitForGlobeReady={true}
        
        // Custom renderer settings
        rendererConfig={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        
        // Custom controls
        onGlobeReady={() => {
          if (globeRef.current) {
            // Set initial camera position
            globeRef.current.pointOfView({ altitude: 2.5 });
            
            // Configure controls
            const controls = globeRef.current.controls();
            controls.enableDamping = true;
            controls.dampingFactor = 0.1;
            controls.rotateSpeed = 0.8;
            controls.zoomSpeed = 1.2;
            controls.minDistance = 200;
            controls.maxDistance = 800;
            
            if (autoRotate) {
              controls.autoRotate = true;
              controls.autoRotateSpeed = 0.5;
            }
          }
        }}
      />
      
      {/* Hover tooltip overlay */}
      {hoveredPoint && (
        <div className="absolute top-4 left-4 bg-slate-800/90 backdrop-blur-sm border border-blue-500/30 rounded-lg p-3 pointer-events-none z-10">
          <div className="text-blue-300 font-semibold">{hoveredPoint.label}</div>
          <div className="text-slate-400 text-sm">{hoveredPoint.country}</div>
          <div className="flex items-center text-green-400 text-xs mt-1">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            Active Location
          </div>
        </div>
      )}
      
      {/* Loading overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm transition-opacity duration-1000 opacity-0 pointer-events-none" id="globe-loading">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-300 text-sm">Initializing Globe...</p>
        </div>
      </div>
    </div>
  );
};

const InteractiveGlobe: React.FC<InteractiveGlobeProps> = (props) => {
  return (
    <Suspense fallback={
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-300 text-sm">Loading Globe...</p>
        </div>
      </div>
    }>
      <GlobeScene {...props} />
    </Suspense>
  );
};

export default InteractiveGlobe;