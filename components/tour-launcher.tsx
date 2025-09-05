"use client"

import { useState } from "react"
import { HelpCircle, Play, X } from "lucide-react"

interface TourLauncherProps {
  onStartTour: () => void
  isVisible: boolean
}

export default function TourLauncher({ onStartTour, isVisible }: TourLauncherProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 z-[9999]">
      {isExpanded ? (
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="text-blue-500" size={20} />
              <h3 className="font-semibold text-gray-900">Need Help?</h3>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close help"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Take a guided tour to learn about all the features and controls of the Solar System Explorer.
          </p>
          <button
            onClick={() => {
              onStartTour()
              setIsExpanded(false)
            }}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
          >
            <Play size={16} />
            Start Guided Tour
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-105"
          aria-label="Get help"
          style={{
            animation: "pulse 2s infinite",
          }}
        >
          <HelpCircle size={24} />
        </button>
      )}
    </div>
  )
}
