"use client";

import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Circle,
  Libraries,
} from "@react-google-maps/api";
import Loader from "../Loader";

const libraries: Libraries = ["places"];

const GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

const containerStyle = {
  width: "100%",
  height: "520px",
  minHeight: "380px",
};

const centerDefault = {
  lat: -33.8688,
  lng: 151.2093,
};

const radiusOptions = [
  { label: "3.5 km", value: 3500 },
  { label: "7.5 km", value: 7500 },
  { label: "12.5 km", value: 12500 },
];

const MapWithRadius: React.FC = () => {
  const [center, setCenter] = useState(centerDefault);
  const [radius, setRadius] = useState(3500);
  const [postalCode, setPostalCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePostalCodeSubmit = async () => {
    if (!postalCode.trim()) {
      setErrorMessage("Please enter a postal code.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const encodedPostalCode = encodeURIComponent(postalCode.trim());

      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedPostalCode},+Australia&key=${GOOGLE_MAPS_API_KEY}`
      );

      const data = await res.json();

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setCenter({ lat, lng });
      } else {
        setErrorMessage(
          "No location found for the entered postal code. Please try again."
        );
      }
    } catch (err) {
      console.error("Failed to fetch location", err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full rounded-2xl border border-[#0066FF]/20 bg-[#020B1C]/70 shadow-xl shadow-black/25 overflow-visible">
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
        {/* Search Area */}
        <div className="relative z-50 bg-[#071A33] border-b border-[#0066FF]/20 p-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Coverage Map
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Search postcode and select radius to view the coverage area.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {/* Postal Code Input */}
              <input
                type="text"
                placeholder="Enter Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading) {
                    handlePostalCodeSubmit();
                  }
                }}
                className="h-12 w-full sm:w-[260px] rounded-xl bg-[#020B1C] border border-[#0066FF]/30 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-[#00C2FF] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              />

              {/* Radius Select */}
              <select
                name="radius"
                aria-label="Select radius"
                className="relative z-50 h-12 min-w-[120px] rounded-xl bg-[#020B1C] border border-[#0066FF]/30 px-4 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-[#00C2FF] transition-all"
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value, 10))}
                style={{
                  colorScheme: "dark",
                  backgroundColor: "#020B1C",
                  color: "#FFFFFF",
                }}
              >
                {radiusOptions.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-[#020B1C] text-white"
                    style={{
                      backgroundColor: "#020B1C",
                      color: "#FFFFFF",
                    }}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* Search Button */}
              <button
                type="button"
                onClick={handlePostalCodeSubmit}
                className="h-12 inline-flex items-center justify-center rounded-xl bg-[#0066FF] px-6 text-white font-semibold hover:bg-[#0052CC] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
              <p className="text-sm text-red-300">{errorMessage}</p>
            </div>
          )}
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 z-40 flex justify-center items-center bg-[#071A33]/60 backdrop-blur-sm">
            <div className="rounded-xl bg-[#020B1C]/90 border border-[#0066FF]/30 px-6 py-4">
              <Loader />
            </div>
          </div>
        )}

        {/* Map */}
        <div
          className={`relative z-10 ${
            loading
              ? "opacity-50 pointer-events-none transition-opacity duration-300"
              : "opacity-100 transition-opacity duration-300"
          }`}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            options={{
              gestureHandling: "greedy",
              zoomControl: true,
              scrollwheel: true,
              disableDoubleClickZoom: true,
              mapTypeControl: true,
              streetViewControl: true,
              fullscreenControl: true,
            }}
          >
            <Circle
              center={center}
              radius={radius}
              options={{
                strokeColor: "#0066FF",
                strokeOpacity: 0.9,
                strokeWeight: 3,
                fillColor: "#00C2FF",
                fillOpacity: 0.22,
              }}
            />
          </GoogleMap>
        </div>
      </LoadScript>
    </div>
  );
};

export default MapWithRadius;