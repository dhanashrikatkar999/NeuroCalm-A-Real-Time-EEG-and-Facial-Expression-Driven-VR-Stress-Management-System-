// live-detection.js - Multi-step version
const API_BASE_URL = 'http://localhost:8000';

document.addEventListener('DOMContentLoaded', function() {
    // Step navigation elements
    const steps = document.querySelectorAll('.step');
    const stepContents = document.querySelectorAll('.step-content');
    let currentStep = 1;

    // Step 1 elements
    const startCameraBtn = document.getElementById('startCamera');
    const captureBtn = document.getElementById('captureBtn');
    const retakeBtn = document.getElementById('retakeBtn');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');
    const videoElement = document.getElementById('videoElement');
    const canvasElement = document.getElementById('canvasElement');
    const cameraPlaceholder = document.getElementById('cameraPlaceholder');
    const nextToStep2Btn = document.getElementById('nextToStep2');

    // Step 2 elements
    const backToStep1Btn = document.getElementById('backToStep1');
    const predictStressBtn = document.getElementById('predictStressBtn');
    const eegInputs = document.querySelectorAll('.eeg-param input');
    const valueDisplays = document.querySelectorAll('.value-display');
    const waves = document.querySelectorAll('.wave');

    // Step 3 elements
    const levelIcon = document.getElementById('levelIcon');
    const stressLevelText = document.getElementById('stressLevelText');
    const confidenceValue = document.getElementById('confidenceValue');
    const facialResult = document.getElementById('facialResult');
    const eegResult = document.getElementById('eegResult');
    const stressProgress = document.getElementById('stressProgress');
    const stressValue = document.getElementById('stressValue');
    const recommendationText = document.getElementById('recommendationText');
    const newAnalysisBtn = document.getElementById('newAnalysisBtn');
    const viewRelaxationBtn = document.getElementById('viewRelaxationBtn');

    let stream = null;
    let capturedImage = null;
    let capturedImageBlob = null;

    // Step Navigation Functions
    function showStep(stepNumber) {
        // Hide all steps
        stepContents.forEach(content => content.classList.remove('active'));
        steps.forEach(step => step.classList.remove('active'));
        
        // Show target step
        document.getElementById(`step${stepNumber}`).classList.add('active');
        document.querySelector(`.step[data-step="${stepNumber}"]`).classList.add('active');
        
        currentStep = stepNumber;
    }

    // Step 1: Camera Functions
    startCameraBtn.addEventListener('click', async function() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.srcObject = stream;
            videoElement.style.display = 'block';
            cameraPlaceholder.style.display = 'none';
            startCameraBtn.disabled = true;
            captureBtn.disabled = false;
        } catch (err) {
            alert('Error accessing camera: ' + err.message);
        }
    });

    captureBtn.addEventListener('click', function() {
        const context = canvasElement.getContext('2d');
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        context.drawImage(videoElement, 0, 0);
        
        capturedImage = canvasElement.toDataURL('image/png');
        
        // Convert to blob for file upload
        canvasElement.toBlob(function(blob) {
            capturedImageBlob = blob;
        }, 'image/png');
        
        videoElement.style.display = 'none';
        cameraPlaceholder.innerHTML = '<p>Image captured successfully!</p><img src="' + capturedImage + '" style="max-width: 100%; max-height: 300px; border-radius: 10px;">';
        cameraPlaceholder.style.display = 'flex';
        captureBtn.disabled = true;
        retakeBtn.disabled = false;
        nextToStep2Btn.disabled = false;
        
        // Stop camera stream
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    });

    retakeBtn.addEventListener('click', function() {
        cameraPlaceholder.innerHTML = `
            <div class="placeholder-icon">📷</div>
            <p>No image or camera preview</p>
            <p>Click "Start Camera" to begin</p>
        `;
        cameraPlaceholder.style.display = 'flex';
        videoElement.style.display = 'none';
        startCameraBtn.disabled = false;
        captureBtn.disabled = true;
        retakeBtn.disabled = true;
        nextToStep2Btn.disabled = true;
        capturedImage = null;
        capturedImageBlob = null;
        
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }
    });

    uploadBtn.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function(event) {
                capturedImage = event.target.result;
                capturedImageBlob = file;
                
                cameraPlaceholder.innerHTML = '<p>Image uploaded successfully!</p><img src="' + capturedImage + '" style="max-width: 100%; max-height: 300px; border-radius: 10px;">';
                cameraPlaceholder.style.display = 'flex';
                videoElement.style.display = 'none';
                captureBtn.disabled = true;
                retakeBtn.disabled = false;
                nextToStep2Btn.disabled = false;
                
                // Stop camera stream if active
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                    startCameraBtn.disabled = false;
                }
            };
            
            reader.readAsDataURL(file);
        }
    });

    // Step Navigation
    nextToStep2Btn.addEventListener('click', function() {
        showStep(2);
    });

    backToStep1Btn.addEventListener('click', function() {
        showStep(1);
    });

    // Step 2: EEG Input Handling
    eegInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            // Update value display
            valueDisplays[index].textContent = this.value;
            
            // Highlight corresponding wave
            const waveType = this.id;
            const waveElement = document.querySelector(`.wave[data-wave="${waveType}"]`);
            
            if (this.value > 0) {
                waveElement.classList.add('active');
            } else {
                waveElement.classList.remove('active');
            }
            
            // Update wave animation intensity based on value
            const intensity = Math.min(this.value / 100, 1);
            waveElement.style.opacity = 0.3 + (intensity * 0.7);
        });
        
        input.addEventListener('focus', function() {
            const waveType = this.id;
            waves.forEach(w => w.classList.remove('focused'));
            document.querySelector(`.wave[data-wave="${waveType}"]`).classList.add('focused');
        });
    });

    // Step 2: Prediction
    predictStressBtn.addEventListener('click', async function() {
        // Validate EEG inputs
        const alpha = parseFloat(document.getElementById('alpha').value) || 0;
        const beta = parseFloat(document.getElementById('beta').value) || 0;
        const gamma = parseFloat(document.getElementById('gamma').value) || 0;
        const theta = parseFloat(document.getElementById('theta').value) || 0;
        const delta = parseFloat(document.getElementById('delta').value) || 0;
        
        if (alpha + beta + gamma + theta + delta === 0) {
            alert('Please enter at least one EEG parameter value');
            return;
        }
        
        // Show loading state
        predictStressBtn.disabled = true;
        predictStressBtn.innerHTML = 'Analyzing... <span class="btn-icon">⏳</span>';
        
        try {
            // Create FormData for FastAPI
            const formData = new FormData();
            formData.append('file', capturedImageBlob, 'image.png');
            formData.append('alpha', alpha.toString());
            formData.append('beta', beta.toString());
            formData.append('gamma', gamma.toString());
            formData.append('theta', theta.toString());
            formData.append('delta', delta.toString());
            
            // Send request to FastAPI backend
            const response = await fetch(`${API_BASE_URL}/predict/final`, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            // Display results in step 3
            displayResults(result);
            showStep(3);
            
        } catch (error) {
            console.error('Prediction error:', error);
            alert('Error predicting stress level: ' + error.message);
            
            // Fallback to demo results
            displayDemoResults();
            showStep(3);
        } finally {
            // Reset button state
            predictStressBtn.disabled = false;
            predictStressBtn.innerHTML = 'Analyze Stress Level <span class="btn-icon">🧠</span>';
        }
    });

    // Step 3: Results Display
    // Step 3: Results Display - Simplified (only emoji and stress level)
function displayResults(result) {
    const stressLevel = result.final_stress_level;
    
    // Update main result only - emoji and text
    levelIcon.textContent = getStressIcon(stressLevel);
    stressLevelText.textContent = stressLevel;
    stressLevelText.className = `stress-level-${stressLevel.toLowerCase().replace(' ', '-')}`;
}

function displayDemoResults() {
    // Demo fallback results - simplified
    levelIcon.textContent = '😊';
    stressLevelText.textContent = 'Not Stressed';
    stressLevelText.className = 'stress-level-not-stressed';
}

function getStressIcon(level) {
    const icons = {
        'Not Stressed': '😊',
        'Acute': '😐',
        'Episodic': '😟',
        'Chronic': '😥'
    };
    return icons[level] || '😊';
}
    // Step 3: Action Buttons
    newAnalysisBtn.addEventListener('click', function() {
        // Reset everything and go back to step 1
        capturedImage = null;
        capturedImageBlob = null;
        eegInputs.forEach(input => {
            input.value = '0';
        });
        valueDisplays.forEach(display => {
            display.textContent = '0';
        });
        waves.forEach(wave => {
            wave.classList.remove('active', 'focused');
        });
        
        showStep(1);
        retakeBtn.click(); // Reset camera state
    });

    viewRelaxationBtn.addEventListener('click', function() {
        window.location.href = 'relaxation-tools.html';
    });

    // Initialize
    showStep(1);
});