// // relaxation-tools.js
// document.addEventListener('DOMContentLoaded', function() {
//     const toolButtons = document.querySelectorAll('.tool-btn');
//     const modal = document.getElementById('toolModal');
//     const modalBody = document.getElementById('modalBody');
//     const closeBtn = document.querySelector('.close');
    
//     let breathingInterval;
//     let isBreathing = false;
    
//     // Open modal when a tool button is clicked
//     // In relaxation-tools.js - update the tool button event listener
// document.querySelectorAll('.tool-btn').forEach(button => {
//     button.addEventListener('click', function() {
//         const tool = this.getAttribute('data-tool');
        
//         if (tool === 'nature') {
//             // Redirect to VR levels page instead of opening modal
//             window.location.href = 'vr-levels.html';
//         } else {
//             // Handle other tools with modals as before
//             openToolModal(tool);
//         }
//     });
// });
//     // toolButtons.forEach(button => {
//     //     button.addEventListener('click', function() {
//     //         const tool = this.getAttribute('data-tool');
//     //         openToolModal(tool);
//     //     });
//     // });
    
//     // Close modal when X is clicked
//     closeBtn.addEventListener('click', function() {
//         modal.style.display = 'none';
//         stopBreathingExercise();
//     });
    
//     // Close modal when clicking outside
//     window.addEventListener('click', function(event) {
//         if (event.target === modal) {
//             modal.style.display = 'none';
//             stopBreathingExercise();
//         }
//     });
    
//     function openToolModal(tool) {
//         let content = '';
        
//         switch(tool) {
//             case 'meditation':
//                 content = `
//                     <h3>Guided Meditation</h3>
//                     <p>Find a comfortable position and prepare for a 5-minute meditation session.</p>
//                     <div class="meditation-player">
//                         <div style="text-align: center; margin: 20px 0;">
//                             <div style="font-size: 3rem;">🎵</div>
//                             <p>Meditation audio will play here</p>
//                         </div>
//                         <div class="audio-controls">
//                             <button class="audio-btn" id="playMeditation">Play</button>
//                             <button class="audio-btn" id="pauseMeditation">Pause</button>
//                             <button class="audio-btn" id="stopMeditation">Stop</button>
//                         </div>
//                     </div>
//                     <p style="margin-top: 20px; font-style: italic;">Focus on your breath and let go of tension with each exhale.</p>
//                 `;
//                 break;
                
//             // case 'breathing':
//             //     content = `
//             //         <h3>Breathing Exercise</h3>
//             //         <p>Follow the circle as it expands and contracts to guide your breathing.</p>
//             //         <div class="breathing-exercise">
//             //             <div class="breathing-circle" id="breathingCircle">
//             //                 <span id="breathText">Breathe In</span>
//             //             </div>
//             //             <p class="breathing-instruction" id="breathInstruction">Inhale slowly through your nose</p>
//             //             <button class="audio-btn" id="startBreathing">Start Exercise</button>
//             //             <button class="audio-btn" id="stopBreathing" style="display: none;">Stop Exercise</button>
//             //         </div>
//             //     `;
//             //     break;
//             case 'breathing':
//     content = `
//         <h3>🌊 Calm Breathing Exercise</h3>
//         <p>Follow the visual guide to practice 4-7-8 breathing technique</p>
//         <div class="breathing-exercise">
//             <div class="breathing-visual">
//                 <div class="breathing-circle" id="breathingCircle">
//                     <div class="circle-content">
//                         <span id="breathText">Ready</span>
//                         <div id="breathTimer">0s</div>
//                     </div>
//                 </div>
//                 <div class="breathing-dots">
//                     <div class="dot active" data-phase="0"></div>
//                     <div class="dot" data-phase="1"></div>
//                     <div class="dot" data-phase="2"></div>
//                     <div class="dot" data-phase="3"></div>
//                 </div>
//             </div>
//             <div class="breathing-controls">
//                 <div class="breathing-instruction" id="breathInstruction">Click Start to begin calming your mind</div>
//                 <div class="breathing-stats">
//                     <div class="stat">
//                         <span class="stat-value" id="cycleCount">0</span>
//                         <span class="stat-label">Cycles</span>
//                     </div>
//                     <div class="stat">
//                         <span class="stat-value" id="totalTime">0s</span>
//                         <span class="stat-label">Time</span>
//                     </div>
//                 </div>
//                 <button class="breathing-btn start" id="startBreathing">
//                     <span class="btn-icon">▶</span>
//                     Start Breathing
//                 </button>
//                 <button class="breathing-btn stop" id="stopBreathing" style="display: none;">
//                     <span class="btn-icon">⏸</span>
//                     Pause
//                 </button>
//             </div>
//         </div>
//         <div class="breathing-technique">
//             <h4>4-7-8 Technique</h4>
//             <div class="technique-steps">
//                 <div class="step">
//                     <span class="step-number">4</span>
//                     <span class="step-text">Inhale</span>
//                 </div>
//                 <div class="step">
//                     <span class="step-number">7</span>
//                     <span class="step-text">Hold</span>
//                 </div>
//                 <div class="step">
//                     <span class="step-number">8</span>
//                     <span class="step-text">Exhale</span>
//                 </div>
//             </div>
//         </div>
//     `;
//     break;
                
//             case 'nature':
//                 content = `
//                     <h3>Nature VR Experience</h3>
//                     <p>Immerse yourself in a peaceful forest environment. Put on your VR headset for the full experience.</p>
//                     <div style="text-align: center; margin: 20px 0;">
//                         <div style="font-size: 4rem;">🌲</div>
//                         <p>VR environment would load here</p>
//                     </div>
//                     <div class="audio-controls">
//                         <button class="audio-btn">Start VR Session</button>
//                     </div>
//                     <p style="margin-top: 20px; font-style: italic;">Take your time to explore and relax in this virtual natural setting.</p>
//                 `;
//                 break;
                
//             case 'audio':
//                 content = `
//                     <h3>Binaural Beats</h3>
//                     <p>Listen to these specially designed frequencies to promote relaxation and mental clarity.</p>
//                     <div style="text-align: center; margin: 20px 0;">
//                         <div style="font-size: 3rem;">🎵</div>
//                         <p>Binaural audio would play here</p>
//                     </div>
//                     <div class="audio-controls">
//                         <button class="audio-btn">Play Alpha Waves</button>
//                         <button class="audio-btn">Play Theta Waves</button>
//                         <button class="audio-btn">Play Delta Waves</button>
//                     </div>
//                     <p style="margin-top: 20px; font-style: italic;">Use headphones for the best experience with binaural beats.</p>
//                 `;
//                 break;
                
//             case 'progress':
//                 content = `
//                     <h3>Your Progress</h3>
//                     <p>Track your stress levels and improvement over time.</p>
//                     <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
//                         <p>Average Stress Level This Week: <strong>42%</strong></p>
//                         <p>Improvement From Last Week: <strong style="color: #4CAF50">-8%</strong></p>
//                         <p>Meditation Sessions Completed: <strong>5</strong></p>
//                     </div>
//                     <div class="audio-controls">
//                         <button class="audio-btn">View Detailed Report</button>
//                     </div>
//                 `;
//                 break;
                
//             case 'support':
//                 content = `
//                     <h3>Professional Support</h3>
//                     <p>Connect with licensed mental health professionals for personalized guidance.</p>
//                     <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
//                         <p><strong>Available Therapists:</strong></p>
//                         <ul style="list-style: none; margin-top: 10px;">
//                             <li>• Dr. Sarah Johnson - Cognitive Behavioral Therapy</li>
//                             <li>• Dr. Michael Chen - Mindfulness & Meditation</li>
//                             <li>• Dr. Emily Rodriguez - Stress Management</li>
//                         </ul>
//                     </div>
//                     <div class="audio-controls">
//                         <button class="audio-btn">Schedule Consultation</button>
//                     </div>
//                 `;
//                 break;
//         }
        
//         modalBody.innerHTML = content;
//         modal.style.display = 'block';
        
//         // Add event listeners for dynamic content
//         if (tool === 'breathing') {
//             setupBreathingExercise();
//         }
//     }
    
//     function setupBreathingExercise() {
//     const startBtn = document.getElementById('startBreathing');
//     const stopBtn = document.getElementById('stopBreathing');
//     const circle = document.getElementById('breathingCircle');
//     const breathText = document.getElementById('breathText');
//     const breathTimer = document.getElementById('breathTimer');
//     const instruction = document.getElementById('breathInstruction');
//     const cycleCount = document.getElementById('cycleCount');
//     const totalTime = document.getElementById('totalTime');
//     const dots = document.querySelectorAll('.dot');
    
//     let isBreathing = false;
//     let currentPhase = 0;
//     let timeLeft = 0;
//     let cycles = 0;
//     let totalSeconds = 0;
//     let timerInterval;
    
//     const phases = [
//         { name: "Breathe In", duration: 4, instruction: "Inhale slowly through your nose", color: "#4CAF50" },
//         { name: "Hold", duration: 7, instruction: "Hold your breath", color: "#FF9800" },
//         { name: "Breathe Out", duration: 8, instruction: "Exhale slowly through your mouth", color: "#2196F3" },
//         { name: "Hold", duration: 1, instruction: "Pause before next cycle", color: "#9C27B0" }
//     ];
    
//     startBtn.addEventListener('click', startBreathing);
//     stopBtn.addEventListener('click', stopBreathing);
    
//     function startBreathing() {
//         isBreathing = true;
//         startBtn.style.display = 'none';
//         stopBtn.style.display = 'inline-block';
        
//         if (currentPhase === 0 && timeLeft === 0) {
//             // Starting fresh
//             startPhase(0);
//         } else {
//             // Resuming
//             runTimer();
//         }
        
//         // Start total time counter
//         const totalTimer = setInterval(() => {
//             if (isBreathing) {
//                 totalSeconds++;
//                 totalTime.textContent = `${totalSeconds}s`;
//             } else {
//                 clearInterval(totalTimer);
//             }
//         }, 1000);
//     }
    
//     function startPhase(phaseIndex) {
//         currentPhase = phaseIndex;
//         const phase = phases[phaseIndex];
//         timeLeft = phase.duration;
        
//         // Update visuals
//         breathText.textContent = phase.name;
//         breathTimer.textContent = `${timeLeft}s`;
//         instruction.textContent = phase.instruction;
//         circle.style.background = `linear-gradient(135deg, ${phase.color}, ${darkenColor(phase.color, 20)})`;
//         circle.style.transform = phaseIndex === 0 ? 'scale(1.5)' : 'scale(1)';
        
//         // Update dots
//         dots.forEach((dot, index) => {
//             dot.classList.toggle('active', index === phaseIndex);
//         });
        
//         runTimer();
//     }
    
//     function runTimer() {
//         clearInterval(timerInterval);
        
//         timerInterval = setInterval(() => {
//             if (!isBreathing) return;
            
//             timeLeft--;
//             breathTimer.textContent = `${timeLeft}s`;
            
//             // Add pulsing animation
//             circle.style.transform = `scale(${1.2 + (phases[currentPhase].duration - timeLeft) * 0.1})`;
            
//             if (timeLeft <= 0) {
//                 clearInterval(timerInterval);
                
//                 if (currentPhase === phases.length - 1) {
//                     // Cycle completed
//                     cycles++;
//                     cycleCount.textContent = cycles;
//                 }
                
//                 // Move to next phase
//                 const nextPhase = (currentPhase + 1) % phases.length;
//                 startPhase(nextPhase);
//             }
//         }, 1000);
//     }
    
//     function stopBreathing() {
//         isBreathing = false;
//         clearInterval(timerInterval);
//         startBtn.style.display = 'inline-block';
//         stopBtn.style.display = 'none';
        
//         // Reset to initial state but keep stats
//         breathText.textContent = 'Ready';
//         breathTimer.textContent = '0s';
//         instruction.textContent = 'Click Start to continue your practice';
//         circle.style.transform = 'scale(1)';
//     }
    
//     function darkenColor(color, percent) {
//         // Simple color darkening for gradient
//         return color; // You can implement proper color manipulation here
//     }
// }
//     // function stopBreathingExercise() {
//     //     if (isBreathing) {
//     //         const stopBtn = document.getElementById('stopBreathing');
//     //         if (stopBtn) stopBtn.click();
//     //     }
//     // }
// });

// relaxation-tools.js - Updated for Separate Breathing Exercise Page
document.addEventListener('DOMContentLoaded', function() {
    const toolButtons = document.querySelectorAll('.tool-btn');
    const modal = document.getElementById('toolModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.close');
    
    // Open modal when a tool button is clicked
    toolButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const tool = this.getAttribute('data-tool');
            const href = this.getAttribute('href');
            
            if (tool === 'nature') {
                // Redirect to VR levels page
                window.location.href = 'vr-levels.html';
            } else if (tool === 'breathing') {
                // Redirect to separate breathing exercise page
                window.location.href = 'breathing-exercise.html';
            } else if (href) {
                // Handle links with href attributes
                window.location.href = href;
            } else {
                // Handle other tools with modals
                openToolModal(tool);
            }
        });
    });
    
    // Close modal when X is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    function openToolModal(tool) {
        let content = '';
        
        switch(tool) {
            case 'meditation':
                content = `
                    <h3>Guided Meditation</h3>
                    <p>Find a comfortable position and prepare for a 5-minute meditation session.</p>
                    <div class="meditation-player">
                        <div style="text-align: center; margin: 20px 0;">
                            <div style="font-size: 3rem;">🎵</div>
                            <p>Meditation audio will play here</p>
                        </div>
                        <div class="audio-controls">
                            <button class="audio-btn" id="playMeditation">Play</button>
                            <button class="audio-btn" id="pauseMeditation">Pause</button>
                            <button class="audio-btn" id="stopMeditation">Stop</button>
                        </div>
                    </div>
                    <p style="margin-top: 20px; font-style: italic;">Focus on your breath and let go of tension with each exhale.</p>
                `;
                break;
                
            case 'nature':
                content = `
                    <h3>Nature VR Experience</h3>
                    <p>Immerse yourself in a peaceful forest environment. Put on your VR headset for the full experience.</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <div style="font-size: 4rem;">🌲</div>
                        <p>VR environment would load here</p>
                    </div>
                    <div class="audio-controls">
                        <button class="audio-btn">Start VR Session</button>
                    </div>
                    <p style="margin-top: 20px; font-style: italic;">Take your time to explore and relax in this virtual natural setting.</p>
                `;
                break;
                
            case 'audio':
                content = `
                    <h3>Binaural Beats</h3>
                    <p>Listen to these specially designed frequencies to promote relaxation and mental clarity.</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <div style="font-size: 3rem;">🎵</div>
                        <p>Binaural audio would play here</p>
                    </div>
                    <div class="audio-controls">
                        <button class="audio-btn">Play Alpha Waves</button>
                        <button class="audio-btn">Play Theta Waves</button>
                        <button class="audio-btn">Play Delta Waves</button>
                    </div>
                    <p style="margin-top: 20px; font-style: italic;">Use headphones for the best experience with binaural beats.</p>
                `;
                break;
                
            case 'progress':
                content = `
                    <h3>Your Progress</h3>
                    <p>Track your stress levels and improvement over time.</p>
                    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <p>Average Stress Level This Week: <strong>42%</strong></p>
                        <p>Improvement From Last Week: <strong style="color: #4CAF50">-8%</strong></p>
                        <p>Meditation Sessions Completed: <strong>5</strong></p>
                    </div>
                    <div class="audio-controls">
                        <button class="audio-btn">View Detailed Report</button>
                    </div>
                `;
                break;
                
            case 'support':
                content = `
                    <h3>Professional Support</h3>
                    <p>Connect with licensed mental health professionals for personalized guidance.</p>
                    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <p><strong>Available Therapists:</strong></p>
                        <ul style="list-style: none; margin-top: 10px;">
                            <li>• Dr. Sarah Johnson - Cognitive Behavioral Therapy</li>
                            <li>• Dr. Michael Chen - Mindfulness & Meditation</li>
                            <li>• Dr. Emily Rodriguez - Stress Management</li>
                        </ul>
                    </div>
                    <div class="audio-controls">
                        <button class="audio-btn">Schedule Consultation</button>
                    </div>
                `;
                break;
        }
        
        modalBody.innerHTML = content;
        modal.style.display = 'block';
        
        // Add event listeners for dynamic content if needed
        setupModalContent(tool);
    }
    
    function setupModalContent(tool) {
        // Add any modal-specific functionality here
        // For example, if you have audio controls in meditation modal
        if (tool === 'meditation') {
            setupMeditationControls();
        }
    }
    
    function setupMeditationControls() {
        // Add functionality for meditation audio controls if needed
        const playBtn = document.getElementById('playMeditation');
        const pauseBtn = document.getElementById('pauseMeditation');
        const stopBtn = document.getElementById('stopMeditation');
        
        if (playBtn) {
            playBtn.addEventListener('click', function() {
                // Add meditation audio play functionality
                console.log('Meditation audio would play here');
            });
        }
        
        if (pauseBtn) {
            pauseBtn.addEventListener('click', function() {
                // Add meditation audio pause functionality
                console.log('Meditation audio would pause here');
            });
        }
        
        if (stopBtn) {
            stopBtn.addEventListener('click', function() {
                // Add meditation audio stop functionality
                console.log('Meditation audio would stop here');
            });
        }
    }
});