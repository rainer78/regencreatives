"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

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
  object: THREE.Mesh
  container: THREE.Object3D
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

    try {
      /*--------------------------------------------------------------
       * 1.  BASIC SET-UP
       *-------------------------------------------------------------*/
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0x000510)

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.set(0, 30, 60)

      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      mountRef.current.appendChild(renderer.domElement)

      const controls = new OrbitControls(camera, renderer.domElement)
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
          info: "Ceres is the largest object in the asteroid belt.",
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

      /*--------------------------------------------------------------
       * 5.  ANIMATION LOOP
       *-------------------------------------------------------------*/
      const baseSpeedValues = [
        0, 0.01, 0.008, 0.006, 0.005, 0.004, 0.002, 0.001, 0.0005, 0.0003, 0.0045, 0.0002, 0.00025, 0.00022,
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

      // Click interaction
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
        }

        controls.update()
        renderer.render(scene, camera)
      }
      animate()

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
      if (loadingElement) {
        loadingElement.style.display = "none"
      }
    }
  }, [])

  /*----- just the mounting target -------------------------------------------*/
  return <div ref={mountRef} className="w-full h-full" />
}
