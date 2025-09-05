"use client"

import { useState } from "react"
import { HelpCircle, Play, BookOpen } from "lucide-react"

interface TourLauncherProps {
  onStartTour: () => void
  isVisible?: boolean
}

export default function TourLauncher({ onStartTour, isVisible = true }: TourLauncherProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-6 z-[9996]">
      {/* Expanded help panel */}
      {isExpanded && (
        <div className="mb-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-xs">
          <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Take a guided tour to learn about all the features of the Solar System Explorer.
          </p>
          <div className="space-y-2">
            <button
              onClick={() => {
                onStartTour()
                setIsExpanded(false)
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
            >
              <Play size={16} />
              Start Guided Tour
            </button>
            <button
              onClick={() => setIsExpanded(false)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              <BookOpen size={16} />
              Quick Tips
            </button>
          </div>
        </div>
      )}

      {/* Help button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200 hover:scale-105"
        aria-label="Help and guided tour"
        title="Get help or start a guided tour"
      >
        <HelpCircle size={24} />
      </button>

      {/* Pulse animation for first-time users */}
      <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20 pointer-events-none" />
    </div>
  )
}
