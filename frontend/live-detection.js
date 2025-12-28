// // live-detection.js - Multi-step version
// const API_BASE_URL = 'http://localhost:8000';

// document.addEventListener('DOMContentLoaded', function() {
//     // Step navigation elements
//     const steps = document.querySelectorAll('.step');
//     const stepContents = document.querySelectorAll('.step-content');
//     let currentStep = 1;

//     // Step 1 elements
//     const startCameraBtn = document.getElementById('startCamera');
//     const captureBtn = document.getElementById('captureBtn');
//     const retakeBtn = document.getElementById('retakeBtn');
//     const uploadBtn = document.getElementById('uploadBtn');
//     const fileInput = document.getElementById('fileInput');
//     const videoElement = document.getElementById('videoElement');
//     const canvasElement = document.getElementById('canvasElement');
//     const cameraPlaceholder = document.getElementById('cameraPlaceholder');
//     const nextToStep2Btn = document.getElementById('nextToStep2');

//     // Step 2 elements
//     const backToStep1Btn = document.getElementById('backToStep1');
//     const predictStressBtn = document.getElementById('predictStressBtn');
//     const eegInputs = document.querySelectorAll('.eeg-param input');
//     const valueDisplays = document.querySelectorAll('.value-display');
//     const waves = document.querySelectorAll('.wave');

//     // Step 3 elements
//     const levelIcon = document.getElementById('levelIcon');
//     const stressLevelText = document.getElementById('stressLevelText');
//     const confidenceValue = document.getElementById('confidenceValue');
//     const facialResult = document.getElementById('facialResult');
//     const eegResult = document.getElementById('eegResult');
//     const stressProgress = document.getElementById('stressProgress');
//     const stressValue = document.getElementById('stressValue');
//     const recommendationText = document.getElementById('recommendationText');
//     const newAnalysisBtn = document.getElementById('newAnalysisBtn');
//     const viewRelaxationBtn = document.getElementById('viewRelaxationBtn');

//     let stream = null;
//     let capturedImage = null;
//     let capturedImageBlob = null;

//     // Step Navigation Functions
//     function showStep(stepNumber) {
//         // Hide all steps
//         stepContents.forEach(content => content.classList.remove('active'));
//         steps.forEach(step => step.classList.remove('active'));
        
//         // Show target step
//         document.getElementById(`step${stepNumber}`).classList.add('active');
//         document.querySelector(`.step[data-step="${stepNumber}"]`).classList.add('active');
        
//         currentStep = stepNumber;
//     }

//     // Step 1: Camera Functions
//     startCameraBtn.addEventListener('click', async function() {
//         try {
//             stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             videoElement.srcObject = stream;
//             videoElement.style.display = 'block';
//             cameraPlaceholder.style.display = 'none';
//             startCameraBtn.disabled = true;
//             captureBtn.disabled = false;
//         } catch (err) {
//             alert('Error accessing camera: ' + err.message);
//         }
//     });

//     captureBtn.addEventListener('click', function() {
//         const context = canvasElement.getContext('2d');
//         canvasElement.width = videoElement.videoWidth;
//         canvasElement.height = videoElement.videoHeight;
//         context.drawImage(videoElement, 0, 0);
        
//         capturedImage = canvasElement.toDataURL('image/png');
        
//         // Convert to blob for file upload
//         canvasElement.toBlob(function(blob) {
//             capturedImageBlob = blob;
//         }, 'image/png');
        
//         videoElement.style.display = 'none';
//         cameraPlaceholder.innerHTML = '<p>Image captured successfully!</p><img src="' + capturedImage + '" style="max-width: 100%; max-height: 300px; border-radius: 10px;">';
//         cameraPlaceholder.style.display = 'flex';
//         captureBtn.disabled = true;
//         retakeBtn.disabled = false;
//         nextToStep2Btn.disabled = false;
        
//         // Stop camera stream
//         if (stream) {
//             stream.getTracks().forEach(track => track.stop());
//         }
//     });

//     retakeBtn.addEventListener('click', function() {
//         cameraPlaceholder.innerHTML = `
//             <div class="placeholder-icon">📷</div>
//             <p>No image or camera preview</p>
//             <p>Click "Start Camera" to begin</p>
//         `;
//         cameraPlaceholder.style.display = 'flex';
//         videoElement.style.display = 'none';
//         startCameraBtn.disabled = false;
//         captureBtn.disabled = true;
//         retakeBtn.disabled = true;
//         nextToStep2Btn.disabled = true;
//         capturedImage = null;
//         capturedImageBlob = null;
        
//         if (stream) {
//             stream.getTracks().forEach(track => track.stop());
//             stream = null;
//         }
//     });

//     uploadBtn.addEventListener('click', function() {
//         fileInput.click();
//     });

//     fileInput.addEventListener('change', function(e) {
//         if (e.target.files && e.target.files[0]) {
//             const file = e.target.files[0];
//             const reader = new FileReader();
            
//             reader.onload = function(event) {
//                 capturedImage = event.target.result;
//                 capturedImageBlob = file;
                
//                 cameraPlaceholder.innerHTML = '<p>Image uploaded successfully!</p><img src="' + capturedImage + '" style="max-width: 100%; max-height: 300px; border-radius: 10px;">';
//                 cameraPlaceholder.style.display = 'flex';
//                 videoElement.style.display = 'none';
//                 captureBtn.disabled = true;
//                 retakeBtn.disabled = false;
//                 nextToStep2Btn.disabled = false;
                
//                 // Stop camera stream if active
//                 if (stream) {
//                     stream.getTracks().forEach(track => track.stop());
//                     startCameraBtn.disabled = false;
//                 }
//             };
            
//             reader.readAsDataURL(file);
//         }
//     });

//     // Step Navigation
//     nextToStep2Btn.addEventListener('click', function() {
//         showStep(2);
//     });

//     backToStep1Btn.addEventListener('click', function() {
//         showStep(1);
//     });

//     // Step 2: EEG Input Handling
//     eegInputs.forEach((input, index) => {
//         input.addEventListener('input', function() {
//             // Update value display
//             valueDisplays[index].textContent = this.value;
            
//             // Highlight corresponding wave
//             const waveType = this.id;
//             const waveElement = document.querySelector(`.wave[data-wave="${waveType}"]`);
            
//             if (this.value > 0) {
//                 waveElement.classList.add('active');
//             } else {
//                 waveElement.classList.remove('active');
//             }
            
//             // Update wave animation intensity based on value
//             const intensity = Math.min(this.value / 100, 1);
//             waveElement.style.opacity = 0.3 + (intensity * 0.7);
//         });
        
//         input.addEventListener('focus', function() {
//             const waveType = this.id;
//             waves.forEach(w => w.classList.remove('focused'));
//             document.querySelector(`.wave[data-wave="${waveType}"]`).classList.add('focused');
//         });
//     });


    

//     // Step 2: Prediction
//     predictStressBtn.addEventListener('click', async function() {
//         // Validate EEG inputs
//         const alpha = parseFloat(document.getElementById('alpha').value) || 0;
//         const beta = parseFloat(document.getElementById('beta').value) || 0;
//         const gamma = parseFloat(document.getElementById('gamma').value) || 0;
//         const theta = parseFloat(document.getElementById('theta').value) || 0;
//         const delta = parseFloat(document.getElementById('delta').value) || 0;
        
//         if (alpha + beta + gamma + theta + delta === 0) {
//             alert('Please enter at least one EEG parameter value');
//             return;
//         }
        
//         // Show loading state
//         predictStressBtn.disabled = true;
//         predictStressBtn.innerHTML = 'Analyzing... <span class="btn-icon">⏳</span>';
        
//         try {
//             // Create FormData for FastAPI
//             const formData = new FormData();
//             formData.append('file', capturedImageBlob, 'image.png');
//             formData.append('alpha', alpha.toString());
//             formData.append('beta', beta.toString());
//             formData.append('gamma', gamma.toString());
//             formData.append('theta', theta.toString());
//             formData.append('delta', delta.toString());
            
//             // Send request to FastAPI backend
//             const response = await fetch(`${API_BASE_URL}/predict/final`, {
//                 method: 'POST',
//                 body: formData
//             });
            
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
//             }
            
//             const result = await response.json();
            
//             // Display results in step 3
//             displayResults(result);
//             showStep(3);
            
//         } catch (error) {
//             console.error('Prediction error:', error);
//             alert('Error predicting stress level: ' + error.message);
            
//             // Fallback to demo results
//             displayDemoResults();
//             showStep(3);
//         } finally {
//             // Reset button state
//             predictStressBtn.disabled = false;
//             predictStressBtn.innerHTML = 'Analyze Stress Level <span class="btn-icon">🧠</span>';
//         }
//     });

//     // Step 3: Results Display
//     // Step 3: Results Display - Simplified (only emoji and stress level)
// function displayResults(result) {
//     const stressLevel = result.final_stress_level;
    
//     // Update main result only - emoji and text
//     levelIcon.textContent = getStressIcon(stressLevel);
//     stressLevelText.textContent = stressLevel;
//     stressLevelText.className = `stress-level-${stressLevel.toLowerCase().replace(' ', '-')}`;
// }

// function displayDemoResults() {
//     // Demo fallback results - simplified
//     levelIcon.textContent = '😊';
//     stressLevelText.textContent = 'Not Stressed';
//     stressLevelText.className = 'stress-level-not-stressed';
// }

// function getStressIcon(level) {
//     const icons = {
//         'Not Stressed': '😊',
//         'Acute': '😐',
//         'Episodic': '😟',
//         'Chronic': '😥'
//     };
//     return icons[level] || '😊';
// }
//     // Step 3: Action Buttons
//     newAnalysisBtn.addEventListener('click', function() {
//         // Reset everything and go back to step 1
//         capturedImage = null;
//         capturedImageBlob = null;
//         eegInputs.forEach(input => {
//             input.value = '0';
//         });
//         valueDisplays.forEach(display => {
//             display.textContent = '0';
//         });
//         waves.forEach(wave => {
//             wave.classList.remove('active', 'focused');
//         });
        
//         showStep(1);
//         retakeBtn.click(); // Reset camera state
//     });

//     viewRelaxationBtn.addEventListener('click', function() {
//         window.location.href = 'relaxation-tools.html';
//     });

//     // Initialize
//     showStep(1);
// });

// live-detection.js - Multi-step version
const API_BASE_URL = 'http://127.0.0.1:8000';
const EEG_API_BASE = 'http://localhost:5001'; 

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

    // === ADD AUTOFILL ELEMENTS HERE ===
    const autofillBtn = document.getElementById('autofillBtn');
    const autofillStatus = document.getElementById('autofillStatus');
    
    // EEG input fields mapping
    const eegChannelMap = {
        'TP9': document.getElementById('alpha'),
        'AF7': document.getElementById('beta'),
        'AF8': document.getElementById('gamma'),
        'TP10': document.getElementById('theta'),
        'RightAUX': document.getElementById('delta')
    };
    // === END AUTOFILL ELEMENTS ===

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
    let autoRefreshInterval = null; // === ADD THIS LINE ===

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
        startAutoRefresh(); // === ADD THIS LINE ===
    });

    backToStep1Btn.addEventListener('click', function() {
        showStep(1);
        stopAutoRefresh(); // === ADD THIS LINE ===
    });

    // Step 2: EEG Input Handling
    // Step 2: EEG Input Handling - SIMPLIFIED
eegInputs.forEach((input) => {
    input.addEventListener('input', function() {
        // Simply update the input value, no wave visualization
        console.log(`EEG input ${this.id} updated to: ${this.value}`);
    });
    
    input.addEventListener('focus', function() {
        // Optional: Add focus styling if needed
        this.style.borderColor = '#fdbb2d';
        this.style.boxShadow = '0 0 0 2px rgba(253, 187, 45, 0.3)';
    });
    
    input.addEventListener('blur', function() {
        // Remove focus styling
        this.style.borderColor = '';
        this.style.boxShadow = '';
    });
});

    // === ADD AUTOFILL FUNCTIONALITY HERE ===
    autofillBtn.addEventListener('click', autofillFromCSV);

    // === UPDATED AUTOFILL FUNCTION ===
    // === UPDATED AUTOFILL FUNCTION ===
// async function autofillFromCSV() {
//     try {
//         autofillBtn.disabled = true;
//         autofillStatus.textContent = 'Reading EEG data from backend...';
//         autofillStatus.className = 'autofill-status loading';

//         console.log('Attempting to fetch EEG data from backend API...');
        
//         // Fetch from FastAPI backend endpoint instead of frontend folder
//         const response = await fetch(`${API_BASE_URL}/eeg_data`);
        
//         if (!response.ok) {
//             throw new Error('EEG data not available from backend. Using demo data instead.');
//         }

//         const csvText = await response.text();
        
//         if (!csvText || csvText.trim().length === 0) {
//             throw new Error('EEG data file is empty. Using demo data instead.');
//         }

//         const lines = csvText.trim().split('\n');
//         console.log(`Found ${lines.length} lines in CSV (including header)`);
        
//         if (lines.length <= 1) {
//             throw new Error('No EEG data records found. Using demo data instead.');
//         }

//         // Parse CSV and get averages from ALL records
//         const averagedData = parseLatestEEGData(lines);
        
//         if (Object.keys(averagedData).length === 0) {
//             throw new Error('No valid EEG data format. Using demo data instead.');
//         }

//         // Fill the input fields with averaged data
//         fillEEGInputs(averagedData);
        
//         // Show success message
//         autofillStatus.textContent = `✓ Loaded averages from ${lines.length - 1} EEG records!`;
//         autofillStatus.className = 'autofill-status success';
        
//     } catch (error) {
//         console.log('Autofill note:', error.message);
//         // Use demo data instead
//         useDemoEEGData();
//         autofillStatus.textContent = '⚠ Using demo EEG data (EEG recording not started)';
//         autofillStatus.className = 'autofill-status loading';
//     } finally {
//         autofillBtn.disabled = false;
//     }
// }
// === ENHANCED AUTOFILL FUNCTION WITH BETTER LOGGING ===
async function autofillFromCSV() {

    console.log('📍 Current file path:', window.location.href);
console.log('📁 Looking for CSV at relative path: eeg_live_data.csv');

fetch('eeg_live_data.csv')
    .then(response => {
        console.log('✅ CSV file accessible, status:', response.status);
        console.log('📁 File URL:', response.url);
    })
    .catch(error => {
        console.error('❌ CSV file not accessible:', error);
    });
    try {
        autofillBtn.disabled = true;
        autofillStatus.textContent = '📡 Reading live EEG data...';
        autofillStatus.className = 'autofill-status loading';

        console.log('🔄 Attempting to fetch latest EEG data...');
        
        const response = await fetch('eeg_live_data.csv');
        
        if (!response.ok) {
            throw new Error('❌ EEG data file not accessible');
        }

        const csvText = await response.text();
        
        if (!csvText || csvText.trim().length === 0) {
            throw new Error('📭 EEG data file is empty');
        }

        const lines = csvText.trim().split('\n');
        console.log(`📊 Found ${lines.length} lines in CSV (${lines.length - 1} data records)`);
        
        if (lines.length <= 1) {
            throw new Error('📭 No EEG data records found');
        }

        // Parse CSV and get averages
        const result = parseLatestEEGData(lines);
        
        if (result.isUsingMockData) {
            console.warn('⚠️ Using MOCK data due to data quality issues');
            autofillStatus.textContent = '⚠️ Using demo data (check EEG device)';
            autofillStatus.className = 'autofill-status warning';
        } else {
            console.log('✅ Using REAL EEG data - normalization successful!');
            autofillStatus.textContent = `✅ Live EEG data loaded (${lines.length - 1} records)`;
            autofillStatus.className = 'autofill-status success';
        }

        // Fill the input fields
        fillEEGInputs(result.data);
        
    } catch (error) {
        console.error('🚨 Autofill error:', error.message);
        console.log('🔄 Falling back to demo EEG data');
        
        // Use demo data instead
        useDemoEEGData();
        autofillStatus.textContent = '⚠️ Using demo EEG data';
        autofillStatus.className = 'autofill-status warning';
    } finally {
        autofillBtn.disabled = false;
    }
}
// Add demo data function
function useDemoEEGData() {
    console.log('🔄 FALLBACK: Using demo EEG data');
    const demoData = {
        'TP9': 29.79,
        'AF7': 31.83,
        'AF8': 36.37,
        'TP10': 57.17,
        'RightAUX': 80.28
    };
    
    console.log('🎯 DEMO DATA VALUES:');
    Object.keys(demoData).forEach(channel => {
        console.log(`   ${channel.padEnd(8)}: ${demoData[channel]}`);
    });
    
    fillEEGInputs(demoData);
}

// Remove the checkEEGConnection function entirely

// Add this helper function to check EEG connection
async function checkEEGConnection() {
    try {
        // Try to connect to the WebSocket to see if EEG service is running
        const response = await fetch('http://localhost:6868', { 
            method: 'HEAD',
            mode: 'no-cors'
        });
        return true;
    } catch (err) {
        console.log('EEG WebSocket not accessible:', err.message);
        return false;
    }
}

// Also update the auto-refresh to handle errors gracefully
function startAutoRefresh() {
    stopAutoRefresh();
    autoRefreshInterval = setInterval(async () => {
        if (document.getElementById('step2').classList.contains('active')) {
            try {
                await autofillFromCSV();
            } catch (error) {
                console.log('Auto-refresh failed, will retry...');
            }
        }
    }, 5000);
}

    function parseLatestEEGData(lines) {
    const headers = lines[0].split(',').map(h => h.trim());
    const data = {};
    let isUsingMockData = false;
    
    console.log('📋 CSV Headers:', headers);
    console.log('🔢 Total data records:', lines.length - 1);
    
    // Initialize channel data
    const channels = ['TP9', 'AF7', 'AF8', 'TP10', 'RightAUX'];
    channels.forEach(channel => {
        data[channel] = [];
    });

    // NEW: Use only the most recent 20% of data (last 200 records)
    const totalRecords = lines.length - 1;
    const recentRecords = Math.max(50, Math.floor(totalRecords * 0.2)); // Use at least 50 records
    const startIndex = Math.max(1, lines.length - recentRecords); // Start from recent records
    
    console.log(`🕒 Using most recent ${recentRecords} records out of ${totalRecords} total`);

    // Process only RECENT records
    let validRecords = 0;
    for (let i = startIndex; i < lines.length; i++) {
        const row = lines[i].split(',').map(cell => cell.trim());
        
        if (row.length === headers.length) {
            const timestamp = row[0];
            const channel = row[2];
            const value = parseFloat(row[4]);
            
            if (channels.includes(channel) && !isNaN(value)) {
                data[channel].push(value);
                validRecords++;
            }
        }
    }

    console.log(`✅ Processed ${validRecords} recent EEG records`);
    
    // Calculate averages from RECENT data only
    const averagedData = {};
    channels.forEach(channel => {
        if (data[channel].length > 0) {
            const sum = data[channel].reduce((a, b) => a + b, 0);
            averagedData[channel] = sum / data[channel].length;
            console.log(`📈 ${channel}: ${data[channel].length} recent readings, Avg: ${averagedData[channel].toFixed(2)}`);
        } else {
            console.warn(`❌ No recent data for ${channel}, using all data`);
            // Fallback to using all data if no recent data
            const allData = [];
            for (let i = 1; i < lines.length; i++) {
                const row = lines[i].split(',').map(cell => cell.trim());
                if (row.length === headers.length && row[2] === channel) {
                    const value = parseFloat(row[4]);
                    if (!isNaN(value)) allData.push(value);
                }
            }
            if (allData.length > 0) {
                averagedData[channel] = allData.reduce((a, b) => a + b, 0) / allData.length;
                console.log(`📊 ${channel}: ${allData.length} total readings, Avg: ${averagedData[channel].toFixed(2)}`);
            } else {
                console.warn(`❌ No data for ${channel}, using mock data`);
                isUsingMockData = true;
                averagedData[channel] = getMockValue(channel);
            }
        }
    });

    // Normalize data
    const normalizedResult = normalizeEEGData(averagedData);
    
    console.log('🎯 --- FINAL NORMALIZED VALUES (RECENT DATA) ---');
    Object.keys(normalizedResult.data).forEach(channel => {
        const status = normalizedResult.isUsingMockData ? 'MOCK' : 'REAL';
        console.log(`   ${channel.padEnd(8)}: ${normalizedResult.data[channel].toFixed(2)} (${status})`);
    });
    
    return normalizedResult;
}

// ADD THIS NEW FUNCTION TO NORMALIZE EEG DATA
function normalizeEEGData(rawData) {
    const normalized = {};
    let isUsingMockData = false;
    
    console.log('🔄 Normalizing EEG data...');
    
    Object.keys(rawData).forEach(channel => {
        const value = rawData[channel];
        let finalValue = value;
        let reason = 'original';
        
        // Check if value needs scaling
        if (value > 1000) {
            finalValue = value / 40;
            reason = 'scaled from >1000';
            console.log(`   ${channel}: ${value.toFixed(2)} → ${finalValue.toFixed(2)} (${reason})`);
        } 
        else if (value > 100) {
            finalValue = value / 3;
            reason = 'scaled from >100';
            console.log(`   ${channel}: ${value.toFixed(2)} → ${finalValue.toFixed(2)} (${reason})`);
        }
        else if (value >= 0 && value <= 100) {
            finalValue = value;
            reason = 'within range';
            console.log(`   ${channel}: ${value.toFixed(2)} (${reason})`);
        }
        else {
            console.warn(`   ${channel}: Invalid value ${value}, using mock data`);
            finalValue = getMockValue(channel);
            reason = 'invalid value';
            isUsingMockData = true;
        }
        
        // Ensure final value is within 0-100 range
        normalized[channel] = Math.max(0, Math.min(100, finalValue));
        
        // If any value is exactly mock data, flag it
        const mockValue = getMockValue(channel);
        if (Math.abs(normalized[channel] - mockValue) < 0.1) {
            console.warn(`   ${channel}: Value matches mock data exactly, possible fallback`);
        }
    });
    
    return {
        data: normalized,
        isUsingMockData: isUsingMockData
    };
}

// ADD THIS HELPER FUNCTION FOR MOCK DATA
function getMockValue(channel) {
    const mockData = {
        'TP9': 29.79,
        'AF7': 31.83,
        'AF8': 36.37,
        'TP10': 57.17,
        'RightAUX': 80.28
    };
    return mockData[channel] || 50; // Default to 50 if channel not found
}

    function fillEEGInputs(latestData) {
        // Map channels to input fields and fill with data
        Object.keys(eegChannelMap).forEach(channel => {
            const input = eegChannelMap[channel];
            if (input && latestData[channel] !== undefined) {
                // Format to 2 decimal places
                input.value = latestData[channel].toFixed(2);
                
                // Trigger input event to update visualizations
                input.dispatchEvent(new Event('input'));
                
                // Add visual feedback
                input.style.backgroundColor = 'rgba(40, 167, 69, 0.2)';
                input.style.borderColor = '#28a745';
                
                // Remove highlight after 2 seconds
                setTimeout(() => {
                    input.style.backgroundColor = '';
                    input.style.borderColor = '';
                }, 2000);
            }
        });
    }

    // Auto-refresh functionality
    function startAutoRefresh() {
        stopAutoRefresh(); // Clear any existing interval
        autoRefreshInterval = setInterval(() => {
            if (document.getElementById('step2').classList.contains('active')) {
                autofillFromCSV();
            }
        }, 5000); // Refresh every 5 seconds
    }
    
    function stopAutoRefresh() {
        if (autoRefreshInterval) {
            clearInterval(autoRefreshInterval);
            autoRefreshInterval = null;
        }
    }
    // === END AUTOFILL FUNCTIONALITY ===

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
// Step 3: Enhanced Results Display with Descriptions
function displayResults(result) {
    const stressLevel = result.final_stress_level;
    
    // Update main result - emoji and text
    levelIcon.textContent = getStressIcon(stressLevel);
    stressLevelText.textContent = stressLevel;
    stressLevelText.className = `stress-level-${stressLevel.toLowerCase().replace(' ', '-')}`;
    
    // Add description based on stress level
    const description = getStressDescription(stressLevel);
    document.getElementById('stressDescription').textContent = description;
}

function getStressDescription(level) {
    const descriptions = {
        'Not Stressed': 'You feel calm and balanced. Daily tasks do not bother you much. Your mind and body feel good.',
        'Acute': 'This is short-term stress from recent pressures. It usually goes away quickly. You feel temporary tension but it does not last long.',
        'Episodic': 'You get stressed often in patterns. It happens again and again in your daily life. You feel overwhelmed regularly.',
        'Chronic': 'This is long-term stress that stays for weeks or months. It can affect your health over time. You need to manage it carefully.'
    };
    return descriptions[level] || 'Take time to assess your stress levels and practice self-care.';
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

    function displayDemoResults() {
        // Demo fallback results - simplified
        levelIcon.textContent = '😊';
        stressLevelText.textContent = 'Not Stressed';
        stressLevelText.className = 'stress-level-not-stressed';
    }

    // function getStressIcon(level) {
    //     const icons = {
    //         'Not Stressed': '😊',
    //         'Acute': '😐',
    //         'Episodic': '😟',
    //         'Chronic': '😥'
    //     };
    //     return icons[level] || '😊';
    // }

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
        stopAutoRefresh(); // === ADD THIS LINE ===
        retakeBtn.click(); // Reset camera state
    });

    viewRelaxationBtn.addEventListener('click', function() {
        window.location.href = 'relaxation-tools.html';
    });

    // Initialize
    showStep(1);
});