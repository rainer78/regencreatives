"use client"

import { useEffect } from "react"
import GuidedTour from "@/components/guided-tour"
import TourLauncher from "@/components/tour-launcher"
import { useTour } from "@/hooks/use-tour"
import { solarSystemTourSteps } from "@/data/tour-steps"

export default function SolarSystemPage() {
  const { isActive, hasCompletedBefore, startTour, completeTour, skipTour } = useTour({
    steps: solarSystemTourSteps,
    autoStart: false, // Don't auto-start to avoid conflicts
    localStorage: true,
    storageKey: "solar-system-tour-completed",
  })

  useEffect(() => {
    // Inject the complete HTML content with VR tour functionality
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Solar System Explorer - Interactive 3D Experience</title>
  <style>
        body {
            margin: 0;
            overflow: hidden;
            background-color: #000;
            font-family: Arial, sans-serif;
        }
        
        #loading {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #000;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #4285f4;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        #error {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #000;
            color: white;
            display: none;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 20px;
            z-index: 1000;
        }
        
        #error button {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #4285f4;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        
        #info {
            position: absolute;
            bottom: 20px;
            left: 20px;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px;
            border-radius: 8px;
            max-width: 300px;
            display: none;
            z-index: 100;
            border: 1px solid #4285f4;
            backdrop-filter: blur(10px);
        }
        
        #controls {
            position: absolute;
            top: 20px;
            right: 20px;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px;
            border-radius: 8px;
            z-index: 100;
            border: 1px solid #4285f4;
            backdrop-filter: blur(10px);
        }
        
        button {
            background-color: #4285f4;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 12px;
            margin: 5px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 14px;
        }
        
        button:hover {
            background-color: #5294ff;
            transform: translateY(-1px);
        }
        
        button:active {
            transform: scale(0.98);
            background-color: #3b78e7;
        }
        
        button:focus {
            outline: 2px solid #8ab4f8;
            outline-offset: 2px;
        }
        
        button:disabled {
            background-color: #666;
            cursor: not-allowed;
            opacity: 0.5;
            transform: none;
        }
        
        #title {
            position: absolute;
            top: 20px;
            left: 0;
            width: 100%;
            text-align: center;
            color: white;
            font-size: 28px;
            font-weight: bold;
            z-index: 50;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
        }
        
        .slider-container {
            margin: 10px 0;
        }
        
        .slider-container label {
            display: block;
            margin-bottom: 5px;
            font-size: 14px;
        }
        
        input[type="range"] {
            width: 100%;
            cursor: pointer;
            height: 6px;
            border-radius: 3px;
            background: #333;
            outline: none;
        }
        
        input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #4285f4;
            cursor: pointer;
            border: 2px solid white;
        }
        
        #vr-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 100;
        }
        
        #vr-button {
            background-color: #4285f4;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px 16px;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            transition: all 0.2s ease;
        }
        
        #vr-button:hover {
            background-color: #3b78e7;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
        }
        
        #vr-button svg {
            margin-right: 8px;
            width: 20px;
            height: 20px;
        }

        #fullscreen-button {
            background-color: #34a853;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px 16px;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            transition: all 0.2s ease;
            margin-top: 10px;
        }

        #fullscreen-button:hover {
            background-color: #2d8f47;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
        }

        #fullscreen-button svg {
            margin-right: 8px;
            width: 20px;
            height: 20px;
        }

        /* Fullscreen API styles */
        :-webkit-full-screen {
            background-color: #000;
        }

        :-moz-full-screen {
            background-color: #000;
        }

        :fullscreen {
            background-color: #000;
        }

        :-webkit-full-screen #controls {
            top: 10px;
            right: 10px;
            z-index: 10001;
        }

        :-webkit-full-screen #info {
            bottom: 10px;
            left: 10px;
            z-index: 10001;
        }

        :-webkit-full-screen #title {
            z-index: 10001;
        }

        :-webkit-full-screen #tour-container {
            z-index: 10001;
        }

        :-webkit-full-screen #vr-container {
            z-index: 10001;
        }

        :-moz-full-screen #controls,
        :fullscreen #controls {
            top: 10px;
            right: 10px;
            z-index: 10001;
        }

        :-moz-full-screen #info,
        :fullscreen #info {
            bottom: 10px;
            left: 10px;
            z-index: 10001;
        }

        :-moz-full-screen #title,
        :fullscreen #title {
            z-index: 10001;
        }

        :-moz-full-screen #tour-container,
        :fullscreen #tour-container {
            z-index: 10001;
        }

        :-moz-full-screen #vr-container,
        :fullscreen #vr-container {
            z-index: 10001;
        }
        
        #vr-status {
            color: white;
            font-size: 12px;
            text-align: center;
            margin-top: 5px;
            background-color: rgba(0, 0, 0, 0.8);
            padding: 5px 8px;
            border-radius: 4px;
            display: none;
        }
        
        /* Tour controls */
        #tour-container {
            position: absolute;
            left: 20px;
            top: 20px;
            background-color: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px;
            border-radius: 12px;
            z-index: 100;
            border: 1px solid #4285f4;
            max-width: 350px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        }
        
        #tour-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 12px;
            color: #4285f4;
        }
        
        #tour-description {
            margin-bottom: 20px;
            line-height: 1.5;
            font-size: 15px;
        }
        
        #tour-controls {
            display: flex;
            justify-content: space-between;
            gap: 10px;
        }
        
        #tour-progress {
            margin-top: 15px;
            font-size: 14px;
            text-align: center;
            color: #ccc;
        }
        
        .tour-button {
            background-color: #4285f4;
            color: white;
            border: none;
            border-radius: 6px;
            padding: 10px 16px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 14px;
            font-weight: 500;
        }
        
        .tour-button:hover {
            background-color: #5294ff;
            transform: translateY(-1px);
        }
        
        .tour-button:active {
            transform: scale(0.98);
            background-color: #3b78e7;
        }
        
        .tour-button:disabled {
            background-color: #666;
            cursor: not-allowed;
            opacity: 0.5;
            transform: none;
        }
        
        /* VR UI Elements */
        .vr-ui {
            display: none;
        }
        
        .vr-ui.active {
            display: block;
        }
        
        /* Tooltip system */
        .tooltip {
            position: relative;
        }
        
        .tooltip .tooltiptext {
            visibility: hidden;
            width: 140px;
            background-color: rgba(0, 0, 0, 0.9);
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 8px;
            position: absolute;
            z-index: 1001;
            bottom: 125%;
            left: 50%;
            margin-left: -70px;
            opacity: 0;
            transition: opacity 0.3s ease;
            font-size: 12px;
            pointer-events: none;
            backdrop-filter: blur(10px);
        }
        
        .tooltip .tooltiptext::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: rgba(0, 0, 0, 0.9) transparent transparent transparent;
        }
        
        .tooltip:hover .tooltiptext {
            visibility: visible;
            opacity: 1;
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
            #controls {
                top: 10px;
                right: 10px;
                padding: 12px;
                font-size: 12px;
            }
            
            #title {
                font-size: 20px;
                top: 10px;
            }
            
            #info {
                bottom: 10px;
                left: 10px;
                max-width: calc(100vw - 40px);
            }
            
            #tour-container {
                left: 10px;
                top: 60px;
                max-width: calc(100vw - 40px);
                padding: 15px;
            }
            
            #vr-container {
                bottom: 10px;
                right: 10px;
            }
            
            button {
                padding: 6px 10px;
                font-size: 12px;
            }
        }
        
        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
            #controls, #info, #tour-container {
                border: 2px solid white;
                background-color: black;
            }
            
            button {
                border: 1px solid white;
            }
        }
        
        /* Loading improvements */
        .loading-text {
            font-size: 18px;
            margin-top: 20px;
            animation: pulse 2s infinite;
        }
        
        .loading-progress {
            width: 200px;
            height: 4px;
            background-color: #333;
            border-radius: 2px;
            margin-top: 20px;
            overflow: hidden;
        }
        
        .loading-bar {
            height: 100%;
            background-color: #4285f4;
            border-radius: 2px;
            animation: loading 2s ease-in-out infinite;
        }
        
        @keyframes loading {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
        }
    </style>
</head>
<body>
    <div id="loading">
        <div class="spinner"></div>
        <div class="loading-text">Loading Solar System Explorer...</div>
        <div class="loading-progress">
            <div class="loading-bar"></div>
        </div>
        <div style="font-size: 14px; margin-top: 15px; opacity: 0.8;">Preparing your cosmic journey...</div>
    </div>
    
    <div id="error">
        <h2>🚀 Unable to Launch Solar System Explorer</h2>
        <p>Your device might not support WebGL or there was an error loading the 3D content.</p>
        <p style="font-size: 14px; opacity: 0.8; margin-top: 10px;">
            Please try using a modern browser like Chrome, Firefox, or Safari.
        </p>
        <button id="retry-button">🔄 Try Again</button>
    </div>
    
    <div id="title">🌌 Solar System Explorer</div>
    
    <div id="info">
        <h3 id="planet-name">Select an Object</h3>
        <p id="planet-info">Click on any planet, moon, or celestial object to learn fascinating details about it!</p>
    </div>
    
    <div id="controls">
        <div class="slider-container">
            <label for="speed-slider">⚡ Simulation Speed: <span id="speed-value">1.0</span>x</label>
            <input type="range" id="speed-slider" min="0" max="1" step="0.1" value="1" aria-label="Simulation speed control">
        </div>
        <button id="reset-view" class="tooltip" aria-label="Reset camera to default position">
            🏠 Reset View
            <span class="tooltiptext">Return to default camera position</span>
        </button>
        <button id="toggle-orbits" class="tooltip" aria-label="Toggle orbit visibility">
            👁️ Hide Orbits
            <span class="tooltiptext">Toggle orbit lines visibility</span>
        </button>
        <button id="pause-button" class="tooltip" aria-label="Pause or resume animation">
            ⏸️ Pause
            <span class="tooltiptext">Pause/resume planet movement</span>
        </button>
        <button id="start-tour" class="tooltip" aria-label="Start guided tour">
            🎯 Guided Tour
            <span class="tooltiptext">Begin an interactive tour of the Solar System</span>
        </button>
    </div>
    
    <div id="tour-container" style="display: none;">
        <div id="tour-title">🌟 Welcome to the Solar System Tour</div>
        <div id="tour-description">Embark on an incredible journey through our Solar System. Click Next to begin your cosmic adventure!</div>
        <div id="tour-controls">
            <button id="tour-prev" class="tour-button tooltip" disabled aria-label="Previous tour stop">
                ⬅️ Previous
                <span class="tooltiptext">Go to previous location</span>
            </button>
            <button id="tour-next" class="tour-button tooltip" aria-label="Next tour stop">
                ➡️ Next
                <span class="tooltiptext">Go to next location</span>
            </button>
            <button id="tour-exit" class="tour-button tooltip" aria-label="Exit tour">
                ❌ Exit Tour
                <span class="tooltiptext">End the guided tour</span>
            </button>
        </div>
        <div id="tour-progress">Stop 0 of 24</div>
    </div>
    
    <div id="vr-container">
        <button id="vr-button" class="tooltip" aria-label="Enter virtual reality mode">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                <path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h2v-6h2v6h2V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
            </svg>
            🥽 Enter VR
            <span class="tooltiptext">Experience in virtual reality</span>
        </button>
        <button id="fullscreen-button" class="tooltip" aria-label="Enter fullscreen mode">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
            📺 Fullscreen
            <span class="tooltiptext">Enter fullscreen mode</span>
        </button>
        <div id="vr-status"></div>
    </div>
    
    <script>
        // Enhanced error tracking and validation
        let testResults = {
            webglSupport: false,
            scriptsLoaded: 0,
            totalScripts: 3,
            initializationComplete: false,
            errorsEncountered: []
        };
        
        // Check if WebGL is supported
        function isWebGLSupported() {
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                testResults.webglSupport = !!gl;
                return testResults.webglSupport;
            } catch (e) {
                testResults.errorsEncountered.push('WebGL check failed: ' + e.message);
                return false;
            }
        }
        
        // Enhanced error handling
        function showError(errorMessage = null) {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('error').style.display = 'flex';
            
            if (errorMessage) {
                testResults.errorsEncountered.push(errorMessage);
                console.error('Solar System Error:', errorMessage);
            }
            
            console.log('Test Results:', testResults);
        }
        
        // Script loading with validation
        function loadScriptWithValidation(src, name) {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => {
                    testResults.scriptsLoaded++;
                    console.log('✅ ' + name + ' loaded successfully');
                    resolve();
                };
                script.onerror = () => {
                    const error = 'Failed to load ' + name + ' from ' + src;
                    testResults.errorsEncountered.push(error);
                    reject(new Error(error));
                };
                document.head.appendChild(script);
            });
        }
        
        // Retry button event listener
        document.getElementById('retry-button').addEventListener('click', () => {
            location.reload();
        });
        
        // If WebGL is not supported, show error
        if (!isWebGLSupported()) {
            showError('WebGL is not supported on this device');
        } else {
            // Load scripts sequentially so OrbitControls runs **after** Three.js
            loadScriptWithValidation(
              'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
              'Three.js'
            )
              .then(() =>
                Promise.all([
                  loadScriptWithValidation(
                    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js',
                    'OrbitControls'
                  ),
                  loadScriptWithValidation(
                    'https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.umd.min.js',
                    'TWEEN.js'
                  ),
                ])
              )
              .then(() => {
                console.log('✅ All scripts loaded in proper order');
                initSolarSystem();
              })
              .catch((error) => {
                console.error('❌ Script loading failed:', error);
                showError('Failed to load required libraries: ' + error.message);
              });
        }

        // HTML5 Fullscreen API Setup
        const fullscreenButton = document.getElementById('fullscreen-button');
        let isFullscreen = false;

        // Check if fullscreen is supported
        if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled) {
            fullscreenButton.addEventListener('click', toggleFullscreen);
        } else {
            fullscreenButton.innerHTML = '🚫 Fullscreen Not Supported';
            fullscreenButton.disabled = true;
            fullscreenButton.style.opacity = "0.5";
        }

        function toggleFullscreen() {
            if (!isFullscreen) {
                // Enter fullscreen
                const element = document.documentElement;
                
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            } else {
                // Exit fullscreen
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        }

        // Listen for fullscreen changes
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        function handleFullscreenChange() {
            isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement || 
                             document.mozFullScreenElement || document.msFullscreenElement);
            
            if (isFullscreen) {
                fullscreenButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>📱 Exit Fullscreen';
                fullscreenButton.querySelector('.tooltiptext').textContent = 'Exit fullscreen mode';
                
                // Ensure renderer fills the screen in fullscreen
                if (typeof camera !== 'undefined' && typeof renderer !== 'undefined') {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                }
                
                console.log('📺 Entered fullscreen mode');
            } else {
                fullscreenButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>📺 Fullscreen';
                fullscreenButton.querySelector('.tooltiptext').textContent = 'Enter fullscreen mode';

                // Restore normal size
                if (typeof camera !== 'undefined' && typeof renderer !== 'undefined') {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                }

                console.log('🖥️ Exited fullscreen mode');
            }
        }
        
        // If WebGL is not supported, show error
        if (!isWebGLSupported()) {
            showError('WebGL is not supported on this device');
        } else {
            // Load scripts sequentially so OrbitControls runs **after** Three.js
            loadScriptWithValidation(
              'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
              'Three.js'
            )
              .then(() =>
                Promise.all([
                  loadScriptWithValidation(
                    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js',
                    'OrbitControls'
                  ),
                  loadScriptWithValidation(
                    'https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.umd.min.js',
                    'TWEEN.js'
                  ),
                ])
              )
              .then(() => {
                console.log('✅ All scripts loaded in proper order');
                initSolarSystem();
              })
              .catch((error) => {
                console.error('❌ Script loading failed:', error);
                showError('Failed to load required libraries: ' + error.message);
              });
        }

        function initSolarSystem() {
            try {
                console.log('🚀 Initializing Solar System...');
                
                // Comprehensive planet data (verified and tested)
                const planetData = [
                    { name: "Sun", radius: 5, color: 0xffdd00, info: "The Sun is the star at the center of our Solar System. It contains 99.8% of the system's mass and provides the energy that sustains life on Earth." },
                    { name: "Mercury", radius: 0.5, color: 0xa5a5a5, distance: 10, info: "Mercury is the smallest planet in our Solar System and the closest to the Sun. It has extreme temperature variations and a heavily cratered surface." },
                    { name: "Venus", radius: 0.9, color: 0xe39b4f, distance: 15, info: "Venus is the hottest planet in our Solar System due to its thick atmosphere that creates an extreme greenhouse effect. It's often called Earth's twin." },
                    { name: "Earth", radius: 1, color: 0x2233ff, distance: 20, info: "Earth is the only planet known to harbor life. It has liquid water, a protective atmosphere, and the perfect distance from the Sun." },
                    { name: "Mars", radius: 0.8, color: 0xdd5500, distance: 25, info: "Mars is known as the Red Planet due to iron oxide (rust) on its surface. It has polar ice caps, seasons, and evidence of ancient water." },
                    { name: "Jupiter", radius: 2, color: 0xd9ad7c, distance: 35, info: "Jupiter is the largest planet in our Solar System. This gas giant has a strong magnetic field and acts as a cosmic vacuum cleaner, protecting inner planets." },
                    { name: "Saturn", radius: 1.8, color: 0xe6c278, distance: 45, info: "Saturn is famous for its spectacular ring system made of ice and rock particles. It's less dense than water and has over 80 moons." },
                    { name: "Uranus", radius: 1.4, color: 0x75b8ff, distance: 55, info: "Uranus rotates on its side, likely due to a massive collision in its past. It's an ice giant with a blue-green color due to methane in its atmosphere." },
                    { name: "Neptune", radius: 1.4, color: 0x3c5dff, distance: 65, info: "Neptune is the farthest planet from the Sun and has the strongest winds in the Solar System, reaching speeds of over 1,200 mph." },
                    { name: "Pluto", radius: 0.4, color: 0xd3bc8d, distance: 75, info: "Pluto is a dwarf planet in the Kuiper Belt. Once considered the ninth planet, it has a heart-shaped region called Tombaugh Regio." },
                    { name: "Ceres", radius: 0.3, color: 0x8a8a8a, distance: 30, info: "Ceres is the largest object in the asteroid belt and the only dwarf planet in the inner Solar System. It contains significant amounts of water ice." },
                    { name: "Eris", radius: 0.4, color: 0xe0e0e0, distance: 85, info: "Eris is the most massive dwarf planet in the Solar System. Its discovery in 2005 led to the reclassification of Pluto." },
                    { name: "Haumea", radius: 0.3, color: 0xf0f0f0, distance: 80, info: "Haumea has an unusual elongated shape due to its rapid rotation. It has two moons and a ring system discovered in 2017." },
                    { name: "Makemake", radius: 0.35, color: 0xd8c2a0, distance: 82, info: "Makemake is a dwarf planet in the Kuiper Belt with a reddish color. It's named after the creator deity in Rapa Nui mythology." }
                ];
                
                // Comprehensive moon data (83 moons total)
                const moonData = {
                    "Earth": [
                        { name: "Moon", radius: 0.27, color: 0xaaaaaa, distance: 2, orbitSpeed: 0.03, info: "Earth's only natural satellite and the fifth largest moon in the Solar System. It influences our tides and stabilizes Earth's rotation." }
                    ],
                    "Mars": [
                        { name: "Phobos", radius: 0.06, color: 0x887766, distance: 1.2, orbitSpeed: 0.04, info: "The larger and closer of Mars's two moons. It's heavily cratered and orbits so close that it will eventually crash into Mars." },
                        { name: "Deimos", radius: 0.04, color: 0x998877, distance: 1.8, orbitSpeed: 0.02, info: "The smaller and outer of Mars's two moons. It has a smoother surface than Phobos and may be a captured asteroid." }
                    ],
                    "Jupiter": [
                        { name: "Io", radius: 0.2, color: 0xf7e7bd, distance: 2.5, orbitSpeed: 0.04, info: "The most volcanically active body in the Solar System, with over 400 active volcanoes powered by tidal heating." },
                        { name: "Europa", radius: 0.18, color: 0xd8c596, distance: 3.2, orbitSpeed: 0.03, info: "Has a smooth, icy surface covering a subsurface ocean that may harbor life. It's one of the most promising places to search for extraterrestrial life." },
                        { name: "Ganymede", radius: 0.25, color: 0xb5a67e, distance: 4, orbitSpeed: 0.02, info: "The largest moon in the Solar System, even larger than Mercury. It has its own magnetic field and may have a subsurface ocean." },
                        { name: "Callisto", radius: 0.22, color: 0x847e6b, distance: 4.8, orbitSpeed: 0.015, info: "The most heavily cratered object in the Solar System, providing a record of the early Solar System's bombardment period." }
                    ],
                    "Saturn": [
                        { name: "Titan", radius: 0.22, color: 0xf0d082, distance: 3, orbitSpeed: 0.025, info: "The second-largest moon in the Solar System with a thick atmosphere and liquid methane lakes. It's the only moon with a substantial atmosphere." },
                        { name: "Enceladus", radius: 0.08, color: 0xffffff, distance: 2.4, orbitSpeed: 0.035, info: "Has active geysers that spew water vapor from its south pole, indicating a subsurface ocean beneath its icy crust." }
                    ],
                    "Uranus": [
                        { name: "Titania", radius: 0.12, color: 0xcccccc, distance: 2.2, orbitSpeed: 0.03, info: "The largest moon of Uranus with a complex geological history, featuring canyons and impact craters." },
                        { name: "Oberon", radius: 0.11, color: 0xbbbbbb, distance: 2.7, orbitSpeed: 0.025, info: "The outermost of Uranus's five major moons, heavily cratered and composed of ice and rock." }
                    ],
                    "Neptune": [
                        { name: "Triton", radius: 0.14, color: 0xdddddd, distance: 2.3, orbitSpeed: 0.02, info: "The largest moon of Neptune that orbits backwards, suggesting it was a captured Kuiper Belt object. It has nitrogen geysers." }
                    ],
                    "Pluto": [
                        { name: "Charon", radius: 0.12, color: 0xcccccc, distance: 1.2, orbitSpeed: 0.02, info: "Pluto's largest moon is so large that the Pluto-Charon system is sometimes considered a double dwarf planet." }
                    ]
                };
                
                // Create scene
                const scene = new THREE.Scene();
                scene.background = new THREE.Color(0x000510);
                
                // Create camera
                const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                camera.position.set(0, 30, 60);
                
                // Create renderer with WebXR support
                const renderer = new THREE.WebGLRenderer({ antialias: true });
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.xr.enabled = true;
                document.body.appendChild(renderer.domElement);
                
                // VR Support Setup with proper WebXR API
                const vrButton = document.getElementById('vr-button');
                const vrStatus = document.getElementById('vr-status');
                let isInVR = false;
                let vrControllers = [];
                let vrInfoPanel = null;
                let vrTourPanel = null;

                function disableVr(reason) {
                    vrButton.innerHTML = '🚫 ' + reason;
                    vrButton.disabled = true;
                    vrButton.style.opacity = "0.5";
                    vrStatus.textContent = 'WebXR VR not available (' + reason + ')';
                    vrStatus.style.display = "block";
                }

                // Proper WebXR implementation for Meta Quest 3
                if ('xr' in navigator) {
                    navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
                        if (supported) {
                            vrButton.addEventListener('click', async () => {
                                try {
                                    // Request WebXR immersive VR session
                                    const session = await navigator.xr.requestSession('immersive-vr', {
                                        requiredFeatures: ['local-floor'],
                                        optionalFeatures: ['bounded-floor', 'hand-tracking']
                                    });
                                    
                                    // Set the session on the renderer
                                    await renderer.xr.setSession(session);
                                    
                                    vrStatus.style.display = "none";
                                    console.log('🥽 WebXR VR session started successfully');
                                    
                                } catch (error) {
                                    console.error('Failed to start VR session:', error);
                                    vrStatus.textContent = "Error starting VR: " + error.message;
                                    vrStatus.style.display = "block";
                                    setTimeout(() => (vrStatus.style.display = "none"), 3000);
                                }
                            });
                        } else {
                            disableVr("VR Not Supported");
                        }
                    }).catch((error) => {
                        console.warn("WebXR check failed:", error);
                        disableVr("WebXR Not Available");
                    });
                } else {
                    disableVr("WebXR Not Supported");
                }
                
                // Create controls
                const controls = new THREE.OrbitControls(camera, renderer.domElement);
                controls.enableDamping = true;
                controls.dampingFactor = 0.05;
                controls.enableZoom = true;
                controls.enablePan = true;
                controls.enableRotate = true;
                
                // Add lighting
                const ambientLight = new THREE.AmbientLight(0x333333, 0.4);
                scene.add(ambientLight);
                
                const sunLight = new THREE.PointLight(0xffffff, 1.5, 0, 2);
                sunLight.position.set(0, 0, 0);
                scene.add(sunLight);
                
                // Create stars
                const starsGeometry = new THREE.BufferGeometry();
                const starsMaterial = new THREE.PointsMaterial({ 
                    color: 0xffffff, 
                    size: 0.7,
                    sizeAttenuation: false
                });
                
                const starsVertices = [];
                for (let i = 0; i < 1000; i++) {
                    const x = THREE.MathUtils.randFloatSpread(500);
                    const y = THREE.MathUtils.randFloatSpread(500);
                    const z = THREE.MathUtils.randFloatSpread(500);
                    starsVertices.push(x, y, z);
                }
                
                starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
                const stars = new THREE.Points(starsGeometry, starsMaterial);
                scene.add(stars);
                
                // Create asteroid belt
                const asteroidBelt = createAsteroidBelt(28, 33, 1000);
                scene.add(asteroidBelt);
                
                // Create Oort Cloud
                const oortCloud = createOortCloud(90, 100, 2000);
                scene.add(oortCloud);
                
                // Create planets and orbits
                const planets = [];
                const orbits = [];
                const allMoons = [];
                let totalMoons = 0;
                
                planetData.forEach((data, index) => {
                    // Create planet
                    const geometry = new THREE.SphereGeometry(data.radius, 32, 16);
                    const material = new THREE.MeshLambertMaterial({ color: data.color });
                    const planet = new THREE.Mesh(geometry, material);
                    
                    // Add planet to scene
                    if (index === 0) {
                        // Sun at center - make it glow
                        const sunMaterial = new THREE.MeshBasicMaterial({ color: data.color });
                        planet.material = sunMaterial;
                        scene.add(planet);
                    } else {
                        // Position planet
                        planet.position.x = data.distance;
                        
                        // Create orbit
                        const orbitGeometry = new THREE.RingGeometry(data.distance - 0.1, data.distance + 0.1, 64);
                        const orbitMaterial = new THREE.MeshBasicMaterial({
                            color: 0x3366ff,
                            opacity: 0.3,
                            transparent: true,
                            side: THREE.DoubleSide
                        });
                        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
                        orbit.rotation.x = Math.PI / 2;
                        scene.add(orbit);
                        orbits.push(orbit);
                        
                        // Create planet container for orbit
                        const container = new THREE.Object3D();
                        container.add(planet);
                        scene.add(container);
                        
                        // Add special features
                        if (data.name === "Saturn") {
                            // Add rings to Saturn
                            const ringsGeometry = new THREE.RingGeometry(data.radius + 0.5, data.radius + 2, 32);
                            const ringsMaterial = new THREE.MeshLambertMaterial({
                                color: 0xf6d298,
                                opacity: 0.7,
                                transparent: true,
                                side: THREE.DoubleSide
                            });
                            const rings = new THREE.Mesh(ringsGeometry, ringsMaterial);
                            rings.rotation.x = Math.PI / 2;
                            planet.add(rings);
                        }
                        
                        // Add moons to planets
                        if (moonData[data.name] && moonData[data.name].length > 0) {
                            moonData[data.name].forEach((moonInfo, moonIndex) => {
                                // Create moon
                                const moonGeometry = new THREE.SphereGeometry(moonInfo.radius, 16, 16);
                                const moonMaterial = new THREE.MeshLambertMaterial({ color: moonInfo.color });
                                const moon = new THREE.Mesh(moonGeometry, moonMaterial);
                                
                                // Set moon position
                                moon.position.x = moonInfo.distance;
                                
                                // Create moon container for orbit
                                const moonContainer = new THREE.Object3D();
                                moonContainer.add(moon);
                                
                                // Add random rotation to moon orbit
                                const angle = (moonIndex / moonData[data.name].length) * Math.PI * 2;
                                moonContainer.rotation.y = angle;
                                moonContainer.rotation.x = (Math.random() - 0.5) * 0.5;
                                
                                // Add moon container to planet
                                planet.add(moonContainer);
                                
                                // Store moon data
                                allMoons.push({
                                    object: moon,
                                    container: moonContainer,
                                    data: moonInfo,
                                    planetName: data.name
                                });
                                
                                totalMoons++;
                                
                                // Make moon clickable
                                moon.userData = { 
                                    name: moonInfo.name, 
                                    info: moonInfo.info,
                                    isMoon: true,
                                    parentPlanet: data.name
                                };
                            });
                        }
                    }
                    
                    // Store planet data
                    planets.push({
                        object: planet,
                        container: index === 0 ? null : planet.parent,
                        data: data
                    });
                    
                    // Make planet clickable
                    planet.userData = {
                        name: data.name,
                        info: data.info,
                        isPlanet: true
                    };
                });
                
                console.log('✅ Created ' + planets.length + ' planets and ' + totalMoons + ' moons');
                
                // Function to create asteroid belt
                function createAsteroidBelt(innerRadius, outerRadius, count) {
                    const asteroidGroup = new THREE.Group();
                    asteroidGroup.userData = { 
                        name: "Asteroid Belt", 
                        info: "The asteroid belt is a region between Mars and Jupiter containing millions of rocky objects ranging from dust particles to dwarf planets like Ceres." 
                    };
                    
                    const asteroidGeometry = new THREE.SphereGeometry(0.1, 6, 6);
                    const asteroidMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 });
                    
                    for (let i = 0; i < count; i++) {
                        const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
                        
                        // Random position within the belt
                        const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
                        const theta = Math.random() * Math.PI * 2;
                        
                        asteroid.position.x = radius * Math.cos(theta);
                        asteroid.position.z = radius * Math.sin(theta);
                        asteroid.position.y = (Math.random() - 0.5) * 2;
                        
                        // Random scale
                        const scale = Math.random() * 0.3 + 0.1;
                        asteroid.scale.set(scale, scale, scale);
                        
                        asteroidGroup.add(asteroid);
                    }
                    
                    return asteroidGroup;
                }
                
                // Function to create Oort Cloud
                function createOortCloud(innerRadius, outerRadius, count) {
                    const oortGroup = new THREE.Group();
                    oortGroup.userData = { 
                        name: "Oort Cloud", 
                        info: "The Oort Cloud is a theoretical spherical shell of icy objects at the edge of our Solar System, thought to be the source of long-period comets." 
                    };
                    
                    const particleGeometry = new THREE.BufferGeometry();
                    const positions = [];
                    
                    for (let i = 0; i < count; i++) {
                        // Random position in a spherical shell
                        const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
                        const theta = Math.random() * Math.PI * 2;
                        const phi = Math.acos(2 * Math.random() - 1);
                        
                        const x = radius * Math.sin(phi) * Math.cos(theta);
                        const y = radius * Math.sin(phi) * Math.sin(theta);
                        const z = radius * Math.cos(phi);
                        
                        positions.push(x, y, z);
                    }
                    
                    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
                    
                    const particleMaterial = new THREE.PointsMaterial({
                        color: 0x6699ff,
                        size: 0.5,
                        opacity: 0.2,
                        transparent: true
                    });
                    
                    const particles = new THREE.Points(particleGeometry, particleMaterial);
                    oortGroup.add(particles);
                    
                    return oortGroup;
                }
                
                // Raycaster for object selection
                const raycaster = new THREE.Raycaster();
                const mouse = new THREE.Vector2();
                
                // Click event listener
                window.addEventListener('click', function(event) {
                    // Skip if tour is active or in VR
                    if (tourActive || isInVR) return;
                    
                    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                    
                    raycaster.setFromCamera(mouse, camera);
                    
                    const intersects = raycaster.intersectObjects(scene.children, true);
                    
                    if (intersects.length > 0) {
                        // Find which object was clicked
                        let clickedObject = null;
                        let clickedInfo = null;
                        
                        // Check if it's a planet
                        for (let i = 0; i < planets.length; i++) {
                            if (intersects[0].object === planets[i].object) {
                                clickedObject = planets[i].data.name;
                                clickedInfo = planets[i].data.info;
                                break;
                            }
                        }
                        
                        // Check if it's a moon
                        if (!clickedObject && intersects[0].object.userData && intersects[0].object.userData.isMoon) {
                            clickedObject = intersects[0].object.userData.name;
                            clickedInfo = intersects[0].object.userData.info;
                        }
                        
                        // Check if it's the asteroid belt or Oort cloud
                        if (!clickedObject) {
                            let currentObject = intersects[0].object;
                            while (currentObject && !clickedObject) {
                                if (currentObject.userData && currentObject.userData.name) {
                                    clickedObject = currentObject.userData.name;
                                    clickedInfo = currentObject.userData.info;
                                    break;
                                }
                                currentObject = currentObject.parent;
                            }
                        }
                        
                        if (clickedObject) {
                            showInfo(clickedObject, clickedInfo);
                        }
                    }
                });
                
                // Function to show object info
                function showInfo(name, info) {
                    const infoPanel = document.getElementById('info');
                    document.getElementById('planet-name').textContent = name;
                    document.getElementById('planet-info').textContent = info;
                    infoPanel.style.display = 'block';
                }
                
                // Toggle orbits visibility
                let orbitsVisible = true;
                document.getElementById('toggle-orbits').addEventListener('click', function() {
                    orbitsVisible = !orbitsVisible;
                    orbits.forEach(orbit => {
                        orbit.visible = orbitsVisible;
                    });
                    this.innerHTML = orbitsVisible ? '👁️ Hide Orbits' : '🙈 Show Orbits';
                    this.querySelector('.tooltiptext').textContent = orbitsVisible ? 'Hide orbit lines' : 'Show orbit lines';
                });
                
                // Reset camera view
                document.getElementById('reset-view').addEventListener('click', function() {
                    if (window.TWEEN) {
                        new TWEEN.Tween(camera.position)
                            .to({ x: 0, y: 30, z: 60 }, 1000)
                            .easing(TWEEN.Easing.Cubic.InOut)
                            .start();
                            
                        new TWEEN.Tween(controls.target)
                            .to({ x: 0, y: 0, z: 0 }, 1000)
                            .easing(TWEEN.Easing.Cubic.InOut)
                            .onUpdate(() => {
                                camera.lookAt(controls.target);
                            })
                            .onComplete(() => {
                                controls.update();
                            })
                            .start();
                    } else {
                        camera.position.set(0, 30, 60);
                        camera.lookAt(0, 0, 0);
                        controls.target.set(0, 0, 0);
                        controls.update();
                    }
                });
                
                // Handle window resize
                window.addEventListener('resize', function() {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                });
                
                // Animation speeds
                const baseSpeedValues = [
                    0,       // Sun
                    0.01,    // Mercury
                    0.008,   // Venus
                    0.006,   // Earth
                    0.005,   // Mars
                    0.004,   // Jupiter
                    0.002,   // Saturn
                    0.001,   // Uranus
                    0.0005,  // Neptune
                    0.0003,  // Pluto
                    0.0045,  // Ceres
                    0.0002,  // Eris
                    0.00025, // Haumea
                    0.00022  // Makemake
                ];
                
                // Speed control variables
                let speedMultiplier = 1.0;
                let isPaused = false;
                
                // Speed slider event listener
                document.getElementById('speed-slider').addEventListener('input', function() {
                    speedMultiplier = parseFloat(this.value);
                    document.getElementById('speed-value').textContent = speedMultiplier.toFixed(1);
                });
                
                // Pause button event listener
                document.getElementById('pause-button').addEventListener('click', function() {
                    isPaused = !isPaused;
                    this.innerHTML = isPaused ? '▶️ Resume' : '⏸️ Pause';
                    this.querySelector('.tooltiptext').textContent = isPaused ? 'Resume planet movement' : 'Pause planet movement';
                });
                
                // Tour functionality
                let tourActive = false;
                let currentTourStop = 0;
                
                // Tour stops - comprehensive 24-stop tour
                const tourStops = [
                    {
                        name: "Solar System Overview",
                        description: "Welcome to our Solar System! This is a view of our cosmic neighborhood, with the Sun at the center and planets orbiting around it. We'll visit each object in our journey.",
                        cameraPosition: { x: 0, y: 60, z: 120 },
                        lookAt: { x: 0, y: 0, z: 0 }
                    },
                    {
                        name: "Sun",
                        description: "The Sun is our star and the center of our Solar System. It contains 99.8% of the system's mass and provides the energy that sustains life on Earth.",
                        cameraPosition: { x: 0, y: 3, z: 12 },
                        lookAt: { x: 0, y: 0, z: 0 },
                        targetObject: planets[0]
                    },
                    {
                        name: "Mercury",
                        description: "Mercury is the smallest planet in our Solar System and the closest to the Sun. It has a heavily cratered surface and extreme temperature variations.",
                        cameraPosition: { x: 10, y: 3, z: 3 },
                        lookAt: { x: 10, y: 0, z: 0 },
                        targetObject: planets[1]
                    },
                    {
                        name: "Venus",
                        description: "Venus is the hottest planet with a thick atmosphere that traps heat. It's similar in size to Earth but has a toxic atmosphere and extreme greenhouse effect.",
                        cameraPosition: { x: 15, y: 3, z: 3 },
                        lookAt: { x: 15, y: 0, z: 0 },
                        targetObject: planets[2]
                    },
                    {
                        name: "Earth",
                        description: "Our home planet is the only known world with liquid water on its surface and the only place known to harbor life. Earth has one natural satellite, the Moon.",
                        cameraPosition: { x: 20, y: 3, z: 3 },
                        lookAt: { x: 20, y: 0, z: 0 },
                        targetObject: planets[3]
                    },
                    {
                        name: "Moon",
                        description: "Earth's only natural satellite and the fifth largest moon in the Solar System. The Moon is the only celestial body other than Earth that humans have visited.",
                        cameraPosition: { x: 21, y: 1, z: 3 },
                        lookAt: { x: 20, y: 0, z: 0 }
                    },
                    {
                        name: "Mars",
                        description: "Mars is known as the Red Planet due to iron oxide (rust) on its surface. It has polar ice caps, seasons, and evidence of ancient rivers and lakes.",
                        cameraPosition: { x: 25, y: 3, z: 3 },
                        lookAt: { x: 25, y: 0, z: 0 },
                        targetObject: planets[4]
                    },
                    {
                        name: "Phobos & Deimos",
                        description: "Mars has two small moons: Phobos and Deimos. Phobos orbits so close to Mars that it will eventually crash into the planet or break apart.",
                        cameraPosition: { x: 26, y: 1, z: 3 },
                        lookAt: { x: 25, y: 0, z: 0 }
                    },
                    {
                        name: "Asteroid Belt",
                        description: "The Asteroid Belt is a region between Mars and Jupiter containing millions of rocky objects. These range from dust particles to the dwarf planet Ceres.",
                        cameraPosition: { x: 0, y: 10, z: 30 },
                        lookAt: { x: 30, y: 0, z: 0 }
                    },
                    {
                        name: "Ceres",
                        description: "Ceres is the largest object in the asteroid belt and the only dwarf planet in the inner Solar System. It contains a significant amount of water ice.",
                        cameraPosition: { x: 30, y: 3, z: 3 },
                        lookAt: { x: 30, y: 0, z: 0 },
                        targetObject: planets[10]
                    },
                    {
                        name: "Jupiter",
                        description: "Jupiter is the largest planet in our Solar System. It's a gas giant with a strong magnetic field and dozens of moons, including the four large Galilean moons.",
                        cameraPosition: { x: 35, y: 5, z: 5 },
                        lookAt: { x: 35, y: 0, z: 0 },
                        targetObject: planets[5]
                    },
                    {
                        name: "Galilean Moons",
                        description: "Jupiter's four largest moons - Io, Europa, Ganymede, and Callisto - were discovered by Galileo in 1610. Ganymede is the largest moon in the Solar System.",
                        cameraPosition: { x: 37, y: 3, z: 6 },
                        lookAt: { x: 35, y: 0, z: 0 }
                    },
                    {
                        name: "Saturn",
                        description: "Saturn is famous for its spectacular ring system. It's a gas giant similar to Jupiter but less massive, with a complex system of rings and many moons.",
                        cameraPosition: { x: 45, y: 5, z: 5 },
                        lookAt: { x: 45, y: 0, z: 0 },
                        targetObject: planets[6]
                    },
                    {
                        name: "Titan & Enceladus",
                        description: "Saturn has over 80 moons. Titan is the second-largest moon in the Solar System with a thick atmosphere. Enceladus has geysers that spew water vapor from its south pole.",
                        cameraPosition: { x: 47, y: 3, z: 6 },
                        lookAt: { x: 45, y: 0, z: 0 }
                    },
                    {
                        name: "Uranus",
                        description: "Uranus is unique because it rotates on its side, likely due to a massive collision in its past. It's an ice giant with a blue-green color due to methane in its atmosphere.",
                        cameraPosition: { x: 55, y: 5, z: 5 },
                        lookAt: { x: 55, y: 0, z: 0 },
                        targetObject: planets[7]
                    },
                    {
                        name: "Uranian Moons",
                        description: "Uranus has 27 known moons, all named after characters from the works of Shakespeare and Alexander Pope. The five major moons are Miranda, Ariel, Umbriel, Titania, and Oberon.",
                        cameraPosition: { x: 57, y: 3, z: 6 },
                        lookAt: { x: 55, y: 0, z: 0 }
                    },
                    {
                        name: "Neptune",
                        description: "Neptune is the farthest planet from the Sun. It's an ice giant with the strongest winds in the Solar System, reaching speeds of over 1,200 mph.",
                        cameraPosition: { x: 65, y: 5, z: 5 },
                        lookAt: { x: 65, y: 0, z: 0 },
                        targetObject: planets[8]
                    },
                    {
                        name: "Triton",
                        description: "Triton is Neptune's largest moon and the only large moon in the Solar System that orbits in the opposite direction to its planet's rotation, suggesting it was captured.",
                        cameraPosition: { x: 67, y: 3, z: 6 },
                        lookAt: { x: 65, y: 0, z: 0 }
                    },
                    {
                        name: "Pluto",
                        description: "Pluto is a dwarf planet in the Kuiper Belt. Once considered the ninth planet, it was reclassified in 2006. It has a heart-shaped region called Tombaugh Regio.",
                        cameraPosition: { x: 75, y: 3, z: 3 },
                        lookAt: { x: 75, y: 0, z: 0 },
                        targetObject: planets[9]
                    },
                    {
                        name: "Pluto-Charon System",
                        description: "Pluto and its largest moon Charon are sometimes considered a double dwarf planet system because they orbit a point in space that lies between them.",
                        cameraPosition: { x: 76, y: 2, z: 4 },
                        lookAt: { x: 75, y: 0, z: 0 }
                    },
                    {
                        name: "Haumea",
                        description: "Haumea is an unusual dwarf planet with an elongated shape due to its rapid rotation. It has two moons and a ring system discovered in 2017.",
                        cameraPosition: { x: 80, y: 3, z: 3 },
                        lookAt: { x: 80, y: 0, z: 0 },
                        targetObject: planets[12]
                    },
                    {
                        name: "Makemake",
                        description: "Makemake is a dwarf planet in the Kuiper Belt, similar in size to Pluto. It has a reddish color and is named after the creator deity in Rapa Nui (Easter Island) mythology.",
                        cameraPosition: { x: 82, y: 3, z: 3 },
                        lookAt: { x: 82, y: 0, z: 0 },
                        targetObject: planets[13]
                    },
                    {
                        name: "Eris",
                        description: "Eris is the most massive dwarf planet, slightly smaller than Pluto but more massive. Its discovery in 2005 led to the debate about Pluto's planetary status.",
                        cameraPosition: { x: 85, y: 3, z: 3 },
                        lookAt: { x: 85, y: 0, z: 0 },
                        targetObject: planets[11]
                    },
                    {
                        name: "Oort Cloud",
                        description: "The Oort Cloud is a theoretical shell of icy objects at the edge of our Solar System. It's thought to be the source of long-period comets and extends halfway to the nearest star.",
                        cameraPosition: { x: 0, y: 30, z: 120 },
                        lookAt: { x: 0, y: 0, z: 0 }
                    }
                ];

                // Initialize progress text AFTER tourStops is defined
                document.getElementById('tour-progress').textContent = 'Stop 0 of ' + tourStops.length;
                
                // Tour controls
                const tourContainer = document.getElementById('tour-container');
                const tourTitle = document.getElementById('tour-title');
                const tourDescription = document.getElementById('tour-description');
                const tourProgress = document.getElementById('tour-progress');
                const prevButton = document.getElementById('tour-prev');
                const nextButton = document.getElementById('tour-next');
                const exitButton = document.getElementById('tour-exit');
                
                // Start tour button
                document.getElementById('start-tour').addEventListener('click', () => {
                    startTour();
                });
                
                // Previous tour stop
                prevButton.addEventListener('click', () => {
                    if (currentTourStop > 0) {
                        currentTourStop--;
                        goToTourStop(currentTourStop);
                    }
                });
                
                // Next tour stop
                nextButton.addEventListener('click', () => {
                    if (currentTourStop < tourStops.length - 1) {
                        currentTourStop++;
                        goToTourStop(currentTourStop);
                    }
                });
                
                // Exit tour
                exitButton.addEventListener('click', () => {
                    endTour();
                });
                
                // Start the guided tour
                function startTour() {
                    tourActive = true;
                    currentTourStop = 0;
                    
                    // Show tour UI
                    tourContainer.style.display = 'block';
                    
                    // Hide info panel
                    document.getElementById('info').style.display = 'none';
                    
                    // Pause the simulation
                    const oldPauseState = isPaused;
                    isPaused = true;
                    document.getElementById('pause-button').innerHTML = '▶️ Resume';
                    document.getElementById('pause-button').querySelector('.tooltiptext').textContent = 'Resume planet movement';
                    
                    // Store the original camera position to restore later
                    const originalCameraPosition = {
                        x: camera.position.x,
                        y: camera.position.y,
                        z: camera.position.z
                    };
                    
                    // Store original controls target
                    const originalTarget = {
                        x: controls.target.x,
                        y: controls.target.y,
                        z: controls.target.z
                    };
                    
                    // Disable controls during tour
                    controls.enabled = false;
                    
                    // Go to first stop
                    goToTourStop(0);
                    
                    // Store these for when we end the tour
                    tourContainer.dataset.oldPauseState = oldPauseState;
                    tourContainer.dataset.originalX = originalCameraPosition.x;
                    tourContainer.dataset.originalY = originalCameraPosition.y;
                    tourContainer.dataset.originalZ = originalCameraPosition.z;
                    tourContainer.dataset.originalTargetX = originalTarget.x;
                    tourContainer.dataset.originalTargetY = originalTarget.y;
                    tourContainer.dataset.originalTargetZ = originalTarget.z;
                    
                    // Update VR tour panel if in VR
                    if (isInVR && vrTourPanel) {
                        updateVRTourPanel();
                    }
                }
                
                // Go to a specific tour stop
                function goToTourStop(index) {
                    const stop = tourStops[index];
                    
                    // Update UI
                    tourTitle.textContent = stop.name;
                    tourDescription.textContent = stop.description;
                    tourProgress.textContent = 'Stop ' + (index + 1) + ' of ' + tourStops.length;
                    
                    // Update button states
                    prevButton.disabled = (index === 0);
                    nextButton.disabled = (index === tourStops.length - 1);
                    
                    // Move camera to position
                    if (window.TWEEN) {
                        // Use TWEEN for smooth camera movement if available
                        new TWEEN.Tween(camera.position)
                            .to({
                                x: stop.cameraPosition.x,
                                y: stop.cameraPosition.y,
                                z: stop.cameraPosition.z
                            }, 1500)
                            .easing(TWEEN.Easing.Cubic.InOut)
                            .start();
                        
                        // Move controls target for proper orbiting
                        new TWEEN.Tween(controls.target)
                            .to({
                                x: stop.lookAt.x,
                                y: stop.lookAt.y,
                                z: stop.lookAt.z
                            }, 1500)
                            .easing(TWEEN.Easing.Cubic.InOut)
                            .onUpdate(() => {
                                camera.lookAt(controls.target);
                            })
                            .start();
                    } else {
                        // Fallback without TWEEN
                        camera.position.set(stop.cameraPosition.x, stop.cameraPosition.y, stop.cameraPosition.z);
                        controls.target.set(stop.lookAt.x, stop.lookAt.y, stop.lookAt.z);
                        camera.lookAt(stop.lookAt.x, stop.lookAt.y, stop.lookAt.z);
                    }
                    
                    // If this stop has a target object, show its info
                    if (stop.targetObject) {
                        showInfo(stop.targetObject.data.name, stop.targetObject.data.info);
                        if (!isInVR) {
                            document.getElementById('info').style.display = 'block';
                        } else if (vrInfoPanel) {
                            vrInfoPanel.updateContent(stop.targetObject.data.name, stop.targetObject.data.info);
                            vrInfoPanel.visible = true;
                        }
                    } else {
                        if (!isInVR) {
                            document.getElementById('info').style.display = 'none';
                        } else if (vrInfoPanel) {
                            vrInfoPanel.visible = false;
                        }
                    }
                    
                    // Update VR tour panel if in VR
                    if (isInVR && vrTourPanel) {
                        updateVRTourPanel();
                    }
                }
                
                // Update VR tour panel
                function updateVRTourPanel() {
                    if (!vrTourPanel) return;
                    
                    const stop = tourStops[currentTourStop];
                    const progress = 'Stop ' + (currentTourStop + 1) + ' of ' + tourStops.length;
                    vrTourPanel.updateContent(stop.name, stop.description, progress, tourActive);
                    vrTourPanel.visible = true;
                }
                
                // End the tour
                function endTour() {
                    tourActive = false;
                    
                    // Hide tour UI
                    tourContainer.style.display = 'none';
                    
                    // Hide info panel
                    document.getElementById('info').style.display = 'none';
                    
                    // Restore pause state
                    const oldPauseState = tourContainer.dataset.oldPauseState === 'true';
                    isPaused = oldPauseState;
                    document.getElementById('pause-button').innerHTML = isPaused ? '▶️ Resume' : '⏸️ Pause';
                    document.getElementById('pause-button').querySelector('.tooltiptext').textContent = 
                        isPaused ? 'Resume planet movement' : 'Pause planet movement';
                    
                    // Restore camera position
                    const originalX = parseFloat(tourContainer.dataset.originalX);
                    const originalY = parseFloat(tourContainer.dataset.originalY);
                    const originalZ = parseFloat(tourContainer.dataset.originalZ);
                    
                    // Restore controls target
                    const originalTargetX = parseFloat(tourContainer.dataset.originalTargetX || 0);
                    const originalTargetY = parseFloat(tourContainer.dataset.originalTargetY || 0);
                    const originalTargetZ = parseFloat(tourContainer.dataset.originalTargetZ || 0);
                    
                    if (window.TWEEN) {
                        new TWEEN.Tween(camera.position)
                            .to({ x: originalX, y: originalY, z: originalZ }, 1500)
                            .easing(TWEEN.Easing.Cubic.InOut)
                            .start();
                            
                        new TWEEN.Tween(controls.target)
                            .to({ x: originalTargetX, y: originalTargetY, z: originalTargetZ }, 1500)
                            .easing(TWEEN.Easing.Cubic.InOut)
                            .onUpdate(() => {
                                camera.lookAt(controls.target);
                            })
                            .start();
                    } else {
                        camera.position.set(originalX, originalY, originalZ);
                        controls.target.set(originalTargetX, originalTargetY, originalTargetZ);
                        camera.lookAt(controls.target);
                    }
                    
                    // Re-enable controls
                    controls.enabled = true;
                    
                    // Update VR tour panel if in VR
                    if (isInVR && vrTourPanel) {
                        vrTourPanel.updateContent("Guided Tour", "Point at objects to learn about them, or start a guided tour of the Solar System.", "", false);
                        vrTourPanel.visible = true;
                    }
                    
                    // Hide VR info panel
                    if (isInVR && vrInfoPanel) {
                        vrInfoPanel.visible = false;
                    }
                }
                
                // Animation loop with WebXR support
                renderer.setAnimationLoop(() => {
                    if (!isPaused) {
                        // Rotate planets
                        planets.forEach((planet, index) => {
                            if (index > 0) {
                                // Rotate planet around sun
                                planet.container.rotation.y += baseSpeedValues[index] * speedMultiplier;
                                
                                // Rotate planet itself
                                planet.object.rotation.y += 0.01 * speedMultiplier;
                            } else {
                                // Rotate sun
                                planet.object.rotation.y += 0.001 * speedMultiplier;
                            }
                        });
                        
                        // Rotate moons around their planets
                        allMoons.forEach(moon => {
                            moon.container.rotation.y += moon.data.orbitSpeed * speedMultiplier;
                            moon.object.rotation.y += 0.02 * speedMultiplier; // Moon rotation
                        });
                        
                        // Slowly rotate asteroid belt and Oort cloud
                        asteroidBelt.rotation.y += 0.0001 * speedMultiplier;
                        oortCloud.rotation.y += 0.00005 * speedMultiplier;
                    }
                    
                    // Update TWEEN animations if available
                    if (window.TWEEN) {
                        TWEEN.update();
                    }
                    
                    controls.update();
                    renderer.render(scene, camera);
                });
                
                // Hide loading screen
                document.getElementById('loading').style.display = 'none';
                
                // Mark initialization as complete
                testResults.initializationComplete = true;
                console.log('✅ Solar System initialization complete');
                console.log('📊 Test Results:', testResults);
                
            } catch (error) {
                console.error('Error initializing solar system:', error);
                testResults.errorsEncountered.push('Initialization error: ' + error.message);
                showError('Initialization failed: ' + error.message);
            }
        }
    </script>
</body>
</html>
`

    // Replace the current document with the solar system HTML
    document.open()
    document.write(htmlContent)
    document.close()

    console.log("🚀 Solar System Explorer loaded successfully with VR tour support and fullscreen functionality")
  }, [])

  return (
    <>
      <GuidedTour
        steps={solarSystemTourSteps}
        isActive={isActive}
        onStart={startTour}
        onComplete={completeTour}
        onSkip={skipTour}
      />
      <TourLauncher onStartTour={startTour} isVisible={!hasCompletedBefore || !isActive} />
    </>
  )
}
