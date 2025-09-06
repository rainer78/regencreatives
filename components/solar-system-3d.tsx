"use client"

import { useEffect, useRef } from "react"

// --- typed helpers -----------------------------------------------------------
type PlanetInfo = {
  name: string
  radius: number
  color: number
  distance?: number
  info: string
}
type MoonInfo = {
  name: string
  radius: number
  color: number
  distance: number
  orbitSpeed: number
  info: string
}
interface MoonEntry {
  object: any
  container: any
  data: MoonInfo
  planetName: string
}
// -----------------------------------------------------------------------------

export default function SolarSystem3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Hide loading screen immediately when component mounts
    const loadingElement = document.getElementById("loading")
    if (loadingElement) {
      loadingElement.style.display = "none"
    }

    // Function to initialize the solar system once Three.js is loaded
    const initSolarSystem = () => {
      try {
        // @ts-ignore - THREE is loaded globally
        const THREE = window.THREE
        if (!THREE) {
          throw new Error("Three.js not loaded")
        }

        /*--------------------------------------------------------------
         * 1.  BASIC SET-UP
         *-------------------------------------------------------------*/
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x000510)

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.set(0, 30, 60)

        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        mountRef.current!.appendChild(renderer.domElement)

        // @ts-ignore - OrbitControls loaded globally
        const controls = new THREE.OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true

        /*--------------------------------------------------------------
         * 2.  LIGHTS & BACKGROUND
         *-------------------------------------------------------------*/
        scene.add(new THREE.AmbientLight(0x333333))
        scene.add(new THREE.PointLight(0xffffff, 1.5))

        // simple star-field
        {
          const starGeo = new THREE.BufferGeometry()
          const vertices: number[] = []
          for (let i = 0; i < 500; i++) {
            vertices.push(
              THREE.MathUtils.randFloatSpread(500),
              THREE.MathUtils.randFloatSpread(500),
              THREE.MathUtils.randFloatSpread(500),
            )
          }
          starGeo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
          const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 })
          scene.add(new THREE.Points(starGeo, starMat))
        }

        /*--------------------------------------------------------------
         * 3.  DATA & HELPERS
         *-------------------------------------------------------------*/
        const planetData: PlanetInfo[] = [
          { name: "Sun", radius: 5, color: 0xffdd00, info: "The Sun is the star at the center of our Solar System." },
          {
            name: "Mercury",
            radius: 0.5,
            color: 0xa5a5a5,
            distance: 10,
            info: "Mercury is the smallest planet in our Solar System.",
          },
          {
            name: "Venus",
            radius: 0.9,
            color: 0xe39b4f,
            distance: 15,
            info: "Venus is the hottest planet in our Solar System.",
          },
          {
            name: "Earth",
            radius: 1,
            color: 0x2233ff,
            distance: 20,
            info: "Earth is the only planet known to harbor life.",
          },
          { name: "Mars", radius: 0.8, color: 0xdd5500, distance: 25, info: "Mars is known as the Red Planet." },
          {
            name: "Jupiter",
            radius: 2,
            color: 0xd9ad7c,
            distance: 35,
            info: "Jupiter is the largest planet in our Solar System.",
          },
          {
            name: "Saturn",
            radius: 1.8,
            color: 0xe6c278,
            distance: 45,
            info: "Saturn is known for its beautiful rings.",
          },
          { name: "Uranus", radius: 1.4, color: 0x75b8ff, distance: 55, info: "Uranus rotates on its side." },
          {
            name: "Neptune",
            radius: 1.4,
            color: 0x3c5dff,
            distance: 65,
            info: "Neptune is the farthest planet from the Sun.",
          },
          {
            name: "Pluto",
            radius: 0.4,
            color: 0xd3bc8d,
            distance: 75,
            info: "Pluto is a dwarf planet in the Kuiper belt.",
          },
          {
            name: "Ceres",
            radius: 0.3,
            color: 0x8a8a8a,
            distance: 30,
            info: "Ceres is the largest object in the asteroid belt and classified as a dwarf planet.",
          },
          {
            name: "Eris",
            radius: 0.4,
            color: 0xe0e0e0,
            distance: 85,
            info: "Eris is the most massive dwarf planet in the Solar System.",
          },
          {
            name: "Haumea",
            radius: 0.3,
            color: 0xf0f0f0,
            distance: 80,
            info: "Haumea has an elongated shape and rapid rotation.",
          },
          {
            name: "Makemake",
            radius: 0.35,
            color: 0xd8c2a0,
            distance: 82,
            info: "Makemake is the second-brightest Kuiper belt object.",
          },
          {
            name: "Oort Cloud",
            radius: 0.2,
            color: 0x666666,
            distance: 400,
            info: "The Oort Cloud is a dense spherical shell of over 15,000 icy objects at the very edge of our Solar System, source of long-period comets. It contains trillions of objects in multiple layers extending nearly halfway to the nearest star.",
          },
        ]

        const moonData: Record<string, any[]> = {
          Earth: [
            {
              name: "Moon",
              radius: 0.27,
              color: 0xaaaaaa,
              distance: 2,
              orbitSpeed: 0.03,
              info: "Earth's only natural satellite and the fifth largest moon in the Solar System.",
            },
          ],
          Mars: [
            {
              name: "Phobos",
              radius: 0.06,
              color: 0x887766,
              distance: 1.2,
              orbitSpeed: 0.04,
              info: "The larger and closer of Mars's two moons, heavily cratered and irregularly shaped.",
            },
            {
              name: "Deimos",
              radius: 0.04,
              color: 0x998877,
              distance: 1.8,
              orbitSpeed: 0.02,
              info: "The smaller and outer of Mars's two moons with a smooth surface.",
            },
          ],
          Jupiter: [
            {
              name: "Io",
              radius: 0.2,
              color: 0xf7e7bd,
              distance: 2.5,
              orbitSpeed: 0.04,
              info: "The most volcanically active body in the Solar System.",
            },
            {
              name: "Europa",
              radius: 0.18,
              color: 0xd8c596,
              distance: 3.2,
              orbitSpeed: 0.03,
              info: "Has a smooth, icy surface and possibly a subsurface ocean.",
            },
            {
              name: "Ganymede",
              radius: 0.25,
              color: 0xb5a67e,
              distance: 4,
              orbitSpeed: 0.02,
              info: "The largest moon in the Solar System, larger than Mercury.",
            },
            {
              name: "Callisto",
              radius: 0.22,
              color: 0x847e6b,
              distance: 4.8,
              orbitSpeed: 0.015,
              info: "The most heavily cratered object in the Solar System.",
            },
          ],
          Saturn: [
            {
              name: "Titan",
              radius: 0.22,
              color: 0xf0d082,
              distance: 3,
              orbitSpeed: 0.025,
              info: "The second-largest moon in the Solar System with a thick atmosphere.",
            },
            {
              name: "Enceladus",
              radius: 0.08,
              color: 0xffffff,
              distance: 2.4,
              orbitSpeed: 0.035,
              info: "Has active geysers that spew water vapor from its south pole.",
            },
          ],
          Uranus: [
            {
              name: "Titania",
              radius: 0.12,
              color: 0xcccccc,
              distance: 2.2,
              orbitSpeed: 0.03,
              info: "The largest moon of Uranus with a complex geological history.",
            },
            {
              name: "Oberon",
              radius: 0.11,
              color: 0xbbbbbb,
              distance: 2.7,
              orbitSpeed: 0.025,
              info: "The outermost of Uranus's five major moons.",
            },
          ],
          Neptune: [
            {
              name: "Triton",
              radius: 0.14,
              color: 0xdddddd,
              distance: 2.3,
              orbitSpeed: 0.02,
              info: "The largest moon of Neptune, orbits in the opposite direction to Neptune's rotation.",
            },
          ],
          Pluto: [
            {
              name: "Charon",
              radius: 0.12,
              color: 0xcccccc,
              distance: 1.2,
              orbitSpeed: 0.02,
              info: "Pluto's largest moon, so large that the Pluto-Charon system is sometimes considered a double dwarf planet.",
            },
          ],
        }

        /*--------------------------------------------------------------
         * 4.  OBJECT CREATION
         *-------------------------------------------------------------*/
        const planets: any[] = []
        const orbits: any[] = []
        const allMoons: any[] = []

        planetData.forEach((data, index) => {
          const geometry = new THREE.SphereGeometry(data.radius, 32, 16)
          const material = new THREE.MeshBasicMaterial({ color: data.color })
          const planet = new THREE.Mesh(geometry, material)

          if (index === 0) {
            // Sun at center
            scene.add(planet)
          } else {
            // Position planet
            planet.position.x = data.distance!

            // Create orbit
            const orbitGeometry = new THREE.RingGeometry(data.distance! - 0.1, data.distance! + 0.1, 64)
            const orbitMaterial = new THREE.MeshBasicMaterial({
              color: 0x3366ff,
              opacity: 0.3,
              transparent: true,
              side: THREE.DoubleSide,
            })
            const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial)
            orbit.rotation.x = Math.PI / 2
            scene.add(orbit)
            orbits.push(orbit)

            // Create planet container for orbit
            const container = new THREE.Object3D()
            container.add(planet)
            scene.add(container)

            // Add Saturn's rings
            if (data.name === "Saturn") {
              const ringsGeometry = new THREE.RingGeometry(data.radius + 0.5, data.radius + 2, 32)
              const ringsMaterial = new THREE.MeshBasicMaterial({
                color: 0xf6d298,
                opacity: 0.7,
                transparent: true,
                side: THREE.DoubleSide,
              })
              const rings = new THREE.Mesh(ringsGeometry, ringsMaterial)
              rings.rotation.x = Math.PI / 2
              planet.add(rings)
            }

            // Add moons
            if (moonData[data.name] && moonData[data.name].length > 0) {
              moonData[data.name].forEach((moonInfo: any, moonIndex: number) => {
                const moonGeometry = new THREE.SphereGeometry(moonInfo.radius, 16, 16)
                const moonMaterial = new THREE.MeshBasicMaterial({ color: moonInfo.color })
                const moon = new THREE.Mesh(moonGeometry, moonMaterial)

                moon.position.x = moonInfo.distance

                const moonContainer = new THREE.Object3D()
                moonContainer.add(moon)

                const angle = (moonIndex / moonData[data.name].length) * Math.PI * 2
                moonContainer.rotation.y = angle
                moonContainer.rotation.x = (Math.random() - 0.5) * 0.5

                planet.add(moonContainer)

                allMoons.push({
                  object: moon,
                  container: moonContainer,
                  data: moonInfo,
                  planetName: data.name,
                })

                moon.userData = {
                  name: moonInfo.name,
                  info: moonInfo.info,
                  isMoon: true,
                  parentPlanet: data.name,
                }
              })
            }
          }

          planets.push({
            object: planet,
            container: index === 0 ? null : planet.parent,
            data: data,
          })
        })

        // Create asteroid belt
        function createAsteroidBelt(innerRadius: number, outerRadius: number, count: number) {
          const asteroidGroup = new THREE.Group()
          const asteroidGeometry = new THREE.SphereGeometry(0.1, 4, 4)
          const asteroidMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 })

          for (let i = 0; i < count; i++) {
            const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial)
            const radius = innerRadius + Math.random() * (outerRadius - innerRadius)
            const theta = Math.random() * Math.PI * 2

            asteroid.position.x = radius * Math.cos(theta)
            asteroid.position.z = radius * Math.sin(theta)
            asteroid.position.y = (Math.random() - 0.5) * 2

            const scale = Math.random() * 0.3 + 0.1
            asteroid.scale.set(scale, scale, scale)

            asteroidGroup.add(asteroid)
          }
          return asteroidGroup
        }

        const asteroidBelt = createAsteroidBelt(28, 33, 1000)
        scene.add(asteroidBelt)

        // Create Oort Cloud with Different Object Types
        const createOortCloud = () => {
          const oortGroup = new THREE.Group()

          // Define different types of Oort Cloud objects
          const objectTypes = [
            {
              name: "Icy Planetesimal",
              geometry: new THREE.SphereGeometry(0.08, 8, 8),
              color: 0x666666,
              info: "Icy planetesimals are the most common objects in the Oort Cloud. These frozen remnants from the early Solar System are composed mainly of water ice, methane, and ammonia. They range from 1-20 km in diameter and serve as the building blocks for comets.",
              count: 8000,
            },
            {
              name: "Comet Nucleus",
              geometry: new THREE.SphereGeometry(0.12, 8, 8),
              color: 0x888888,
              info: "Comet nuclei are larger icy bodies that become visible comets when they approach the Sun. These 'dirty snowballs' contain rock, dust, and frozen gases. When heated by solar radiation, they develop the characteristic tail we see from Earth.",
              count: 3000,
            },
            {
              name: "Carbonaceous Object",
              geometry: new THREE.SphereGeometry(0.06, 6, 6),
              color: 0x444444,
              info: "Dark, carbon-rich objects that absorbed organic compounds during the Solar System's formation. These primitive bodies preserve the original chemistry from 4.6 billion years ago and may contain the building blocks of life.",
              count: 2000,
            },
            {
              name: "Metallic Fragment",
              geometry: new THREE.SphereGeometry(0.05, 6, 6),
              color: 0x999999,
              info: "Rare metallic fragments ejected from the inner Solar System during planetary formation. These objects contain iron, nickel, and other heavy elements, representing less than 1% of Oort Cloud objects.",
              count: 500,
            },
            {
              name: "Ice Giant Ejecta",
              geometry: new THREE.SphereGeometry(0.1, 8, 8),
              color: 0x7799bb,
              info: "Objects originally from the outer Solar System, ejected by gravitational interactions with Jupiter, Saturn, Uranus, and Neptune. These bodies retain the chemical signatures of their formation near the ice giants.",
              count: 1500,
            },
            {
              name: "Interstellar Capture",
              geometry: new THREE.SphereGeometry(0.07, 6, 6),
              color: 0xaa8866,
              info: "Rare objects captured from interstellar space as our Solar System moved through the galaxy. These exotic visitors have different compositions and may provide clues about other star systems.",
              count: 200,
            },
          ]

          // Create multiple layers for better density
          const layers = [
            { innerRadius: 300, outerRadius: 350, opacity: 0.9 },
            { innerRadius: 350, outerRadius: 400, opacity: 0.8 },
            { innerRadius: 400, outerRadius: 450, opacity: 0.7 },
            { innerRadius: 450, outerRadius: 500, opacity: 0.6 },
          ]

          objectTypes.forEach((objectType) => {
            layers.forEach((layer) => {
              const layerCount = Math.floor(objectType.count / layers.length)

              for (let i = 0; i < layerCount; i++) {
                const oortObject = new THREE.Mesh(
                  objectType.geometry,
                  new THREE.MeshBasicMaterial({
                    color: objectType.color,
                    transparent: true,
                    opacity: layer.opacity,
                  }),
                )

                // Create spherical shell distribution with some clustering
                const radius = layer.innerRadius + Math.random() * (layer.outerRadius - layer.innerRadius)

                // Add some clustering by biasing certain areas
                let theta = Math.random() * Math.PI * 2
                let phi = Math.acos(2 * Math.random() - 1)

                // Create some denser regions (clusters)
                if (Math.random() < 0.3) {
                  // Cluster around certain angles
                  const clusterTheta = Math.floor(Math.random() * 8) * (Math.PI / 4)
                  const clusterPhi = Math.floor(Math.random() * 4) * (Math.PI / 2)
                  theta = clusterTheta + (Math.random() - 0.5) * 0.5
                  phi = clusterPhi + (Math.random() - 0.5) * 0.5
                }

                oortObject.position.x = radius * Math.sin(phi) * Math.cos(theta)
                oortObject.position.y = radius * Math.sin(phi) * Math.sin(theta)
                oortObject.position.z = radius * Math.cos(phi)

                // Vary the size
                const scale = Math.random() * 0.5 + 0.5
                oortObject.scale.set(scale, scale, scale)

                // Add userData for identification
                oortObject.userData = {
                  name: objectType.name,
                  info: objectType.info,
                  isOortObject: true,
                  objectType: objectType.name,
                }

                oortGroup.add(oortObject)
              }
            })
          })

          return oortGroup
        }

        const oortCloud = createOortCloud()
        scene.add(oortCloud)

        /*--------------------------------------------------------------
         * 5.  ANIMATION LOOP
         *-------------------------------------------------------------*/
        const baseSpeedValues = [
          0, 0.01, 0.008, 0.006, 0.005, 0.004, 0.002, 0.001, 0.0005, 0.0003, 0.0045, 0.0002, 0.00025, 0.00022, 0.00001,
        ]

        let speedMultiplier = 1.0
        let isPaused = false

        // Event listeners for controls
        const speedSlider = document.getElementById("speed-slider") as HTMLInputElement
        if (speedSlider) {
          speedSlider.addEventListener("input", function () {
            speedMultiplier = Number.parseFloat(this.value)
            const speedValue = document.getElementById("speed-value")
            if (speedValue) speedValue.textContent = speedMultiplier.toFixed(1)
          })
        }

        const pauseButton = document.getElementById("pause-button")
        if (pauseButton) {
          pauseButton.addEventListener("click", function () {
            isPaused = !isPaused
            this.textContent = isPaused ? "Resume" : "Pause"
          })
        }

        const resetButton = document.getElementById("reset-view")
        if (resetButton) {
          resetButton.addEventListener("click", () => {
            camera.position.set(0, 30, 60)
            camera.lookAt(0, 0, 0)
            controls.target.set(0, 0, 0)
            controls.update()
          })
        }

        let orbitsVisible = true
        const toggleOrbitsButton = document.getElementById("toggle-orbits")
        if (toggleOrbitsButton) {
          toggleOrbitsButton.addEventListener("click", function () {
            orbitsVisible = !orbitsVisible
            orbits.forEach((orbit) => {
              orbit.visible = orbitsVisible
            })
            this.textContent = orbitsVisible ? "Hide Orbits" : "Show Orbits"
          })
        }

        // Guided Tour System
        let tourActive = false
        let currentTourStep = 0
        const tourSteps = [
          {
            name: "Sun",
            position: [0, 10, 20],
            info: "Welcome to our Solar System! Let's start with the Sun, our nearest star.",
          },
          {
            name: "Mercury",
            position: [10, 5, 15],
            info: "Mercury, the smallest and fastest planet, completes an orbit in just 88 Earth days.",
          },
          {
            name: "Venus",
            position: [15, 5, 20],
            info: "Venus, the hottest planet with surface temperatures of 900°F due to its thick atmosphere.",
          },
          {
            name: "Earth",
            position: [20, 8, 25],
            info: "Earth, our home planet, the only known planet with life in the universe.",
          },
          {
            name: "Moon",
            position: [22, 8, 25],
            info: "Earth's Moon, responsible for our tides and stabilizing Earth's rotation.",
          },
          {
            name: "Mars",
            position: [25, 8, 30],
            info: "Mars, the Red Planet, with the largest volcano and canyon in the solar system.",
          },
          {
            name: "Ceres",
            position: [30, 8, 35],
            info: "Ceres, the largest object in the asteroid belt and classified as a dwarf planet.",
          },
          {
            name: "Jupiter",
            position: [35, 15, 45],
            info: "Jupiter, the largest planet, with a mass greater than all other planets combined.",
          },
          { name: "Io", position: [37, 15, 45], info: "Io, Jupiter's volcanic moon with over 400 active volcanoes." },
          {
            name: "Europa",
            position: [38, 15, 45],
            info: "Europa, with a subsurface ocean that may harbor life beneath its icy crust.",
          },
          {
            name: "Ganymede",
            position: [39, 15, 45],
            info: "Ganymede, the largest moon in the solar system, even bigger than Mercury.",
          },
          {
            name: "Callisto",
            position: [40, 15, 45],
            info: "Callisto, the most heavily cratered object in the solar system.",
          },
          {
            name: "Saturn",
            position: [45, 15, 55],
            info: "Saturn, famous for its spectacular ring system made of ice and rock particles.",
          },
          {
            name: "Titan",
            position: [48, 15, 55],
            info: "Titan, Saturn's largest moon with a thick atmosphere and methane lakes.",
          },
          {
            name: "Enceladus",
            position: [47, 15, 55],
            info: "Enceladus, with geysers of water vapor erupting from its south pole.",
          },
          { name: "Uranus", position: [55, 15, 65], info: "Uranus, the tilted ice giant that rotates on its side." },
          {
            name: "Titania",
            position: [57, 15, 65],
            info: "Titania, Uranus's largest moon with a complex geological history.",
          },
          {
            name: "Neptune",
            position: [65, 15, 75],
            info: "Neptune, the windiest planet with speeds up to 1,200 mph.",
          },
          {
            name: "Triton",
            position: [67, 15, 75],
            info: "Triton, Neptune's largest moon, orbiting backwards around the planet.",
          },
          {
            name: "Pluto",
            position: [75, 15, 85],
            info: "Pluto, the famous dwarf planet at the edge of our solar system.",
          },
          {
            name: "Charon",
            position: [76, 15, 85],
            info: "Charon, Pluto's largest moon, forming almost a double planet system.",
          },
          {
            name: "Eris",
            position: [85, 20, 95],
            info: "Eris, the most massive dwarf planet, located in the scattered disk.",
          },
          {
            name: "Haumea",
            position: [80, 18, 90],
            info: "Haumea, an elongated dwarf planet that spins incredibly fast.",
          },
          {
            name: "Makemake",
            position: [82, 18, 92],
            info: "Makemake, a dwarf planet in the Kuiper Belt with a reddish surface.",
          },
          {
            name: "Oort Cloud",
            position: [200, 100, 300],
            info: "The Oort Cloud contains six different types of objects: Icy Planetesimals (most common), Comet Nuclei (future comets), Carbonaceous Objects (organic-rich), Metallic Fragments (rare metals), Ice Giant Ejecta (from outer planets), and Interstellar Captures (from other star systems). Click on individual objects to learn more!",
          },
        ]

        const startTour = () => {
          tourActive = true
          currentTourStep = 0
          isPaused = true
          if (pauseButton) pauseButton.textContent = "Resume"

          // Show tour UI
          const tourUI = document.getElementById("tour-ui")
          if (tourUI) tourUI.style.display = "block"

          nextTourStep()
        }

        const nextTourStep = () => {
          if (currentTourStep >= tourSteps.length) {
            endTour()
            return
          }

          const step = tourSteps[currentTourStep]

          // Animate camera to position
          const targetPosition = step.position
          const startPosition = [camera.position.x, camera.position.y, camera.position.z]

          let progress = 0
          const animateTour = () => {
            progress += 0.02
            if (progress >= 1) progress = 1

            // Smooth interpolation
            const easeInOut = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2

            camera.position.x = startPosition[0] + (targetPosition[0] - startPosition[0]) * easeInOut
            camera.position.y = startPosition[1] + (targetPosition[1] - startPosition[1]) * easeInOut
            camera.position.z = startPosition[2] + (targetPosition[2] - startPosition[2]) * easeInOut

            camera.lookAt(0, 0, 0)
            controls.target.set(0, 0, 0)
            controls.update()

            if (progress < 1) {
              requestAnimationFrame(animateTour)
            } else {
              // Show step info
              updateTourInfo(step)
            }
          }

          animateTour()
        }

        const updateTourInfo = (step: any) => {
          const tourTitle = document.getElementById("tour-title")
          const tourDescription = document.getElementById("tour-description")
          const tourProgress = document.getElementById("tour-progress")

          if (tourTitle) tourTitle.textContent = step.name
          if (tourDescription) tourDescription.textContent = step.info
          if (tourProgress) tourProgress.textContent = `${currentTourStep + 1} / ${tourSteps.length}`
        }

        const nextStep = () => {
          currentTourStep++
          nextTourStep()
        }

        const prevStep = () => {
          if (currentTourStep > 0) {
            currentTourStep--
            nextTourStep()
          }
        }

        const endTour = () => {
          tourActive = false
          currentTourStep = 0

          // Hide tour UI
          const tourUI = document.getElementById("tour-ui")
          if (tourUI) tourUI.style.display = "none"

          // Reset camera
          camera.position.set(0, 30, 60)
          camera.lookAt(0, 0, 0)
          controls.target.set(0, 0, 0)
          controls.update()
        }

        // Tour button event listener
        const startTourButton = document.getElementById("start-tour")
        if (startTourButton) {
          startTourButton.addEventListener("click", startTour)
        }

        // Tour navigation buttons
        const tourNext = document.getElementById("tour-next")
        const tourPrev = document.getElementById("tour-prev")
        const tourEnd = document.getElementById("tour-end")

        if (tourNext) tourNext.addEventListener("click", nextStep)
        if (tourPrev) tourPrev.addEventListener("click", prevStep)
        if (tourEnd) tourEnd.addEventListener("click", endTour)

        // Enhanced Click interaction with Oort Cloud objects
        const raycaster = new THREE.Raycaster()
        const mouse = new THREE.Vector2()

        window.addEventListener("click", (event) => {
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

          raycaster.setFromCamera(mouse, camera)
          const intersects = raycaster.intersectObjects(scene.children, true)

          if (intersects.length > 0) {
            let clickedObject = null
            let clickedInfo = null

            // Check if it's a planet
            for (let i = 0; i < planets.length; i++) {
              if (intersects[0].object === planets[i].object) {
                clickedObject = planets[i].data.name
                clickedInfo = planets[i].data.info
                break
              }
            }

            // Check if it's a moon
            if (!clickedObject && intersects[0].object.userData && intersects[0].object.userData.isMoon) {
              clickedObject = intersects[0].object.userData.name
              clickedInfo = intersects[0].object.userData.info
            }

            // Check if it's an Oort Cloud object
            if (!clickedObject && intersects[0].object.userData && intersects[0].object.userData.isOortObject) {
              clickedObject = intersects[0].object.userData.name
              clickedInfo = intersects[0].object.userData.info
            }

            if (clickedObject) {
              const infoPanel = document.getElementById("info")
              const planetName = document.getElementById("planet-name")
              const planetInfo = document.getElementById("planet-info")
              if (infoPanel && planetName && planetInfo) {
                planetName.textContent = clickedObject
                planetInfo.textContent = clickedInfo
                infoPanel.style.display = "block"
              }
            }
          }
        })

        // Handle window resize
        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener("resize", handleResize)

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate)

          if (!isPaused) {
            planets.forEach((planet, index) => {
              if (index > 0) {
                planet.container.rotation.y += baseSpeedValues[index] * speedMultiplier
                planet.object.rotation.y += 0.01 * speedMultiplier
              } else {
                planet.object.rotation.y += 0.001 * speedMultiplier
              }
            })

            allMoons.forEach((moon: any) => {
              moon.container.rotation.y += moon.data.orbitSpeed * speedMultiplier
              moon.object.rotation.y += 0.02 * speedMultiplier
            })

            asteroidBelt.rotation.y += 0.0001 * speedMultiplier
            oortCloud.rotation.y += 0.00001 * speedMultiplier
          }

          controls.update()
          renderer.render(scene, camera)
        }
        animate()

        console.log("Solar System 3D initialized successfully!")

        // Cleanup
        return () => {
          window.removeEventListener("resize", handleResize)
          if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement)
          }
          renderer.dispose()
        }
      } catch (error) {
        console.error("Error initializing solar system:", error)
        const errorElement = document.getElementById("error")
        if (errorElement) {
          errorElement.style.display = "flex"
        }
      }
    }

    // Check if Three.js is already loaded
    // @ts-ignore
    if (window.THREE) {
      initSolarSystem()
      return
    }

    // Load Three.js from CDN
    const loadThreeJS = () => {
      const script = document.createElement("script")
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
      script.onload = () => {
        // Load OrbitControls
        const controlsScript = document.createElement("script")
        controlsScript.src = "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"
        controlsScript.onload = () => {
          initSolarSystem()
        }
        controlsScript.onerror = () => {
          console.error("Failed to load OrbitControls")
          initSolarSystem() // Try without OrbitControls
        }
        document.head.appendChild(controlsScript)
      }
      script.onerror = () => {
        console.error("Failed to load Three.js")
        const errorElement = document.getElementById("error")
        if (errorElement) {
          errorElement.style.display = "flex"
        }
      }
      document.head.appendChild(script)
    }

    loadThreeJS()
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}
