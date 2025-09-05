export const solarSystemTourSteps = [
  {
    id: "welcome",
    title: "Welcome to Solar System Explorer",
    description:
      "Welcome! This interactive 3D solar system lets you explore planets, moons, and other celestial objects. Let's take a quick tour of the features.",
    position: "center" as const,
    highlight: false,
  },
  {
    id: "controls-panel",
    title: "Control Panel",
    description:
      "Here you'll find all the main controls. You can adjust simulation speed, pause the animation, reset the view, and toggle orbit visibility.",
    target: "#controls",
    position: "left" as const,
    highlight: true,
  },
  {
    id: "speed-control",
    title: "Simulation Speed",
    description:
      "Use this slider to control how fast the planets orbit around the Sun. You can slow it down to observe details or speed it up to see long-term orbital patterns.",
    target: "#speed-slider",
    position: "left" as const,
    highlight: true,
  },
  {
    id: "pause-button",
    title: "Pause Animation",
    description:
      "Click this button to pause or resume the planetary motion. This is useful when you want to examine objects without them moving.",
    target: "#pause-button",
    position: "left" as const,
    highlight: true,
  },
  {
    id: "reset-view",
    title: "Reset Camera View",
    description:
      "If you get lost navigating around the solar system, click this button to return to the default camera position and view.",
    target: "#reset-view",
    position: "left" as const,
    highlight: true,
  },
  {
    id: "toggle-orbits",
    title: "Toggle Orbit Lines",
    description:
      "This button shows or hides the orbital paths of the planets. The blue rings help you visualize the planetary orbits.",
    target: "#toggle-orbits",
    position: "left" as const,
    highlight: true,
  },
  {
    id: "guided-tour",
    title: "Guided Tour",
    description:
      "This button starts a comprehensive tour that visits every planet, moon, and major feature in the solar system with detailed information.",
    target: "#start-tour",
    position: "left" as const,
    highlight: true,
  },
  {
    id: "vr-mode",
    title: "Virtual Reality",
    description:
      "If you have a VR headset, click this button to experience the solar system in immersive virtual reality. Note that VR mode may not be available on all devices.",
    target: "#vr-button",
    position: "top" as const,
    highlight: true,
  },
  {
    id: "info-panel",
    title: "Information Panel",
    description:
      "When you click on any planet or moon, detailed information appears here. This panel shows the name and fascinating facts about the selected object.",
    target: "#info",
    position: "right" as const,
    highlight: true,
  },
  {
    id: "navigation",
    title: "Camera Navigation",
    description:
      "You can navigate around the solar system by clicking and dragging to rotate the view, scrolling to zoom in/out, and right-clicking and dragging to pan.",
    position: "center" as const,
    highlight: false,
  },
  {
    id: "interaction",
    title: "Object Interaction",
    description:
      "Click on any planet, moon, or celestial object to learn more about it. The information will appear in the bottom-left panel with detailed facts and descriptions.",
    position: "center" as const,
    highlight: false,
  },
  {
    id: "features",
    title: "Special Features",
    description:
      "The solar system includes all planets, major moons, dwarf planets like Pluto and Ceres, the asteroid belt, and even the distant Oort Cloud at the edge of our solar system.",
    position: "center" as const,
    highlight: false,
  },
  {
    id: "complete",
    title: "Tour Complete!",
    description:
      "You're now ready to explore the solar system! Try clicking on different objects, adjusting the speed, or starting the comprehensive guided tour for a detailed journey through space.",
    position: "center" as const,
    highlight: false,
  },
]
