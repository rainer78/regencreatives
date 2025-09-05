export const solarSystemTourSteps = [
  {
    id: "welcome",
    title: "Welcome to Solar System Explorer",
    description:
      "Welcome! This interactive tour will guide you through all the amazing features of our Solar System Explorer. You can navigate using the buttons or arrow keys.",
    position: "center" as const,
    highlight: false,
    delay: 0,
  },
  {
    id: "title",
    title: "Solar System Explorer",
    description:
      "This is your Solar System Explorer - an interactive 3D visualization of our cosmic neighborhood with all planets, moons, and celestial objects.",
    target: "#title",
    position: "bottom" as const,
    highlight: true,
  },
  {
    id: "controls-panel",
    title: "Control Panel",
    description:
      "Here you'll find all the main controls for the simulation. You can adjust speed, pause the animation, reset the view, and start tours.",
    target: "#controls",
    position: "left" as const,
    highlight: true,
  },
  {
    id: "speed-control",
    title: "Simulation Speed",
    description:
      "Use this slider to control how fast the planets orbit around the Sun. Slide left to slow down, right to speed up the simulation.",
    target: "#speed-slider",
    position: "left" as const,
    highlight: true,
    action: () => {
      const slider = document.getElementById("speed-slider") as HTMLInputElement
      if (slider) {
        slider.value = "0.5"
        slider.dispatchEvent(new Event("input", { bubbles: true }))
      }
    },
  },
  {
    id: "pause-button",
    title: "Pause & Resume",
    description:
      "Click this button to pause or resume the planetary motion. Great for taking a closer look at specific objects or their positions.",
    target: "#pause-button",
    position: "left" as const,
    highlight: true,
  },
  {
    id: "reset-view",
    title: "Reset Camera View",
    description:
      "Lost in space? Click this button to return to the default camera position and get a perfect overview of the entire solar system.",
    target: "#reset-view",
    position: "left" as const,
    highlight: true,
  },
  {
    id: "toggle-orbits",
    title: "Show/Hide Orbits",
    description:
      "Toggle the visibility of orbital paths. Hide them for a cleaner view, or show them to better understand planetary movements.",
    target: "#toggle-orbits",
    position: "left" as const,
    highlight: true,
    action: () => {
      const button = document.getElementById("toggle-orbits")
      if (button) {
        button.click()
        setTimeout(() => button.click(), 1500) // Show them again
      }
    },
  },
  {
    id: "planet-tour",
    title: "Guided Planet Tour",
    description:
      "Start an automated tour that will take you to visit each planet, moon, and celestial object with detailed information about each one.",
    target: "#start-tour",
    position: "left" as const,
    highlight: true,
  },
  {
    id: "vr-experience",
    title: "Virtual Reality",
    description:
      "If you have a VR headset, click here to experience the solar system in immersive virtual reality! (Requires WebXR compatible device)",
    target: "#vr-button",
    position: "top" as const,
    highlight: true,
  },
  {
    id: "interaction",
    title: "Interactive Objects",
    description:
      "Click on any planet, moon, or celestial object to learn more about it. An information panel will appear with fascinating details!",
    position: "center" as const,
    highlight: false,
    action: () => {
      // Simulate clicking on Earth
      const earthClickEvent = new MouseEvent("click", {
        clientX: window.innerWidth * 0.4,
        clientY: window.innerHeight * 0.5,
        bubbles: true,
      })
      window.dispatchEvent(earthClickEvent)
    },
  },
  {
    id: "info-panel",
    title: "Information Panel",
    description:
      "When you click on objects, detailed information appears here. Learn about each planet's characteristics, moons, and interesting facts.",
    target: "#info",
    position: "right" as const,
    highlight: true,
    delay: 1000,
  },
  {
    id: "navigation",
    title: "Camera Navigation",
    description:
      "Use your mouse to navigate: Left-click and drag to rotate the view, scroll to zoom in/out, and right-click and drag to pan around.",
    position: "center" as const,
    highlight: false,
  },
  {
    id: "objects-overview",
    title: "What You Can Explore",
    description:
      "Our solar system includes: 8 planets, 5 dwarf planets (including Pluto), over 80 moons, the asteroid belt, and the distant Oort Cloud!",
    position: "center" as const,
    highlight: false,
  },
  {
    id: "mobile-friendly",
    title: "Mobile & Touch Support",
    description:
      "This experience works great on mobile devices too! Use touch gestures to navigate and explore the solar system on your phone or tablet.",
    position: "center" as const,
    highlight: false,
  },
  {
    id: "completion",
    title: "Tour Complete!",
    description:
      "Congratulations! You're now ready to explore the solar system. Remember, you can restart this tour anytime from the help button. Enjoy your cosmic journey!",
    position: "center" as const,
    highlight: false,
  },
]
