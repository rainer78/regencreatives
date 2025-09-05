"use client"

import { useState, useEffect } from "react"

interface TourStep {
  id: string
  title: string
  description: string
  target?: string
  position: "top" | "bottom" | "left" | "right" | "center"
  action?: () => void
  highlight?: boolean
  delay?: number
}

interface UseTourOptions {
  steps: TourStep[]
  autoStart?: boolean
  localStorage?: boolean
  storageKey?: string
}

export function useTour({
  steps,
  autoStart = false,
  localStorage = true,
  storageKey = "solar-system-tour-completed",
}: UseTourOptions) {
  const [isActive, setIsActive] = useState(false)
  const [hasCompletedBefore, setHasCompletedBefore] = useState(false)

  useEffect(() => {
    if (localStorage && typeof window !== "undefined") {
      const completed = window.localStorage.getItem(storageKey) === "true"
      setHasCompletedBefore(completed)

      if (autoStart && !completed) {
        // Delay auto-start to ensure page is fully loaded
        setTimeout(() => {
          setIsActive(true)
        }, 2000)
      }
    }
  }, [autoStart, localStorage, storageKey])

  const startTour = () => {
    setIsActive(true)
  }

  const completeTour = () => {
    setIsActive(false)
    if (localStorage && typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, "true")
      setHasCompletedBefore(true)
    }
  }

  const skipTour = () => {
    setIsActive(false)
  }

  const resetTour = () => {
    if (localStorage && typeof window !== "undefined") {
      window.localStorage.removeItem(storageKey)
      setHasCompletedBefore(false)
    }
  }

  return {
    isActive,
    hasCompletedBefore,
    startTour,
    completeTour,
    skipTour,
    resetTour,
    steps,
  }
}
