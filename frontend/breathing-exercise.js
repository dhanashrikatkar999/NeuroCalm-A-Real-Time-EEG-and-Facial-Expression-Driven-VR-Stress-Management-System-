document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const startBtn = document.getElementById('startBreathing');
    const stopBtn = document.getElementById('stopBreathing');
    const resetBtn = document.getElementById('resetBreathing');
    const circle = document.getElementById('breathingCircle');
    const breathText = document.getElementById('breathText');
    const breathTimer = document.getElementById('breathTimer');
    const instruction = document.getElementById('breathInstruction');
    const cycleCount = document.getElementById('cycleCount');
    const totalTime = document.getElementById('totalTime');
    const calmScore = document.getElementById('calmScore');
    const sessionsToday = document.getElementById('sessionsToday');
    const totalCycles = document.getElementById('totalCycles');
    const longestSession = document.getElementById('longestSession');
    const dots = document.querySelectorAll('.dot');
    const phaseProgress = document.getElementById('phaseProgress');

    // Breathing Exercise State
    let isBreathingActive = false;
    let currentPhase = 0;
    let timeLeft = 0;
    let cycles = 0;
    let totalSeconds = 0;
    let timerInterval;
    let totalTimerInterval;
    let sessions = 0;
    let allTimeCycles = 0;
    let maxSessionTime = 0;

    // Breathing Phases - 4-7-8 Technique
    const phases = [
        { 
            name: "Breathe In", 
            duration: 4, 
            instruction: "Inhale slowly through your nose...", 
            color: "#4CAF50",
            scale: 1.8,
            emoji: "🌬️"
        },
        { 
            name: "Hold", 
            duration: 7, 
            instruction: "Hold your breath...", 
            color: "#FF9800",
            scale: 1.8,
            emoji: "⏱️"
        },
        { 
            name: "Breathe Out", 
            duration: 8, 
            instruction: "Exhale slowly through your mouth...", 
            color: "#2196F3",
            scale: 1.0,
            emoji: "💨"
        },
        { 
            name: "Rest", 
            duration: 1, 
            instruction: "Pause before next cycle...", 
            color: "#9C27B0",
            scale: 1.0,
            emoji: "✨"
        }
    ];

    // Initialize from localStorage
    loadProgress();

    // Event Listeners
    startBtn.addEventListener('click', startBreathing);
    stopBtn.addEventListener('click', stopBreathing);
    resetBtn.addEventListener('click', resetBreathing);

    function startBreathing() {
        if (!isBreathingActive) {
            isBreathingActive = true;
            startBtn.style.display = 'none';
            stopBtn.style.display = 'inline-block';
            
            // Start first session
            if (totalSeconds === 0) {
                sessions++;
                sessionsToday.textContent = sessions;
                saveProgress();
            }

            if (currentPhase === 0 && timeLeft === 0) {
                startPhase(0);
            } else {
                runTimer();
            }

            // Total time counter
            totalTimerInterval = setInterval(() => {
                if (isBreathingActive) {
                    totalSeconds++;
                    totalTime.textContent = `${totalSeconds}s`;
                    updateCalmScore();
                    
                    // Update longest session
                    if (totalSeconds > maxSessionTime) {
                        maxSessionTime = totalSeconds;
                        longestSession.textContent = `${maxSessionTime}s`;
                        saveProgress();
                    }
                }
            }, 1000);
        }
    }

    function startPhase(phaseIndex) {
        currentPhase = phaseIndex;
        const phase = phases[phaseIndex];
        timeLeft = phase.duration;

        // Update visual elements
        breathText.textContent = `${phase.emoji} ${phase.name}`;
        breathTimer.textContent = `${timeLeft}s`;
        instruction.textContent = phase.instruction;
        phaseProgress.textContent = `Phase ${phaseIndex + 1}/4`;

        // Update circle appearance
        circle.style.background = `linear-gradient(135deg, ${phase.color}, ${darkenColor(phase.color, 30)})`;
        circle.style.transform = `scale(${phase.scale})`;
        circle.style.transition = `all ${phase.duration}s ease-in-out`;

        // Update progress dots
        updatePhaseDots(phaseIndex);

        // Start phase timer
        runTimer();
    }

    function runTimer() {
        clearInterval(timerInterval);

        timerInterval = setInterval(() => {
            if (!isBreathingActive) return;

            timeLeft--;
            breathTimer.textContent = `${timeLeft}s`;

            // Add subtle pulsing animation
            const phase = phases[currentPhase];
            const progress = (phase.duration - timeLeft) / phase.duration;
            const pulseScale = phase.scale + Math.sin(progress * Math.PI) * 0.15;
            circle.style.transform = `scale(${pulseScale})`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                
                // Check if cycle completed
                if (currentPhase === phases.length - 1) {
                    completeCycle();
                } else {
                    // Move to next phase
                    startPhase(currentPhase + 1);
                }
            }
        }, 1000);
    }

    function completeCycle() {
        cycles++;
        allTimeCycles++;
        cycleCount.textContent = cycles;
        totalCycles.textContent = allTimeCycles;

        // Celebration effect
        circle.style.background = `linear-gradient(135deg, #fdbb2d, #ffcc44)`;
        breathText.textContent = "🎉 Cycle Complete!";
        instruction.textContent = "Great job! Ready for the next cycle?";
        
        // Save progress
        saveProgress();

        // Continue to next cycle after a brief pause
        setTimeout(() => {
            if (isBreathingActive) {
                startPhase(0);
            }
        }, 2000);
    }

    function stopBreathing() {
        isBreathingActive = false;
        clearInterval(timerInterval);
        clearInterval(totalTimerInterval);
        
        startBtn.style.display = 'inline-block';
        stopBtn.style.display = 'none';
        
        breathText.textContent = "⏸️ Paused";
        instruction.textContent = "Session paused. Click Start to continue.";
    }

    function resetBreathing() {
        stopBreathing();
        
        // Reset session state
        currentPhase = 0;
        timeLeft = 0;
        cycles = 0;
        totalSeconds = 0;
        
        // Reset displays
        breathText.textContent = "Ready to Breathe";
        breathTimer.textContent = "0s";
        instruction.textContent = "Click Start to begin your breathing exercise";
        cycleCount.textContent = "0";
        totalTime.textContent = "0s";
        calmScore.textContent = "0%";
        phaseProgress.textContent = "";
        
        // Reset circle
        circle.style.background = `linear-gradient(135deg, #667eea, #764ba2)`;
        circle.style.transform = "scale(1)";
        circle.style.transition = "all 0.5s ease";
        
        // Reset dots
        updatePhaseDots(-1);
    }

    function updatePhaseDots(activeIndex) {
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function updateCalmScore() {
        // Calculate calm score based on session duration and cycles
        const score = Math.min(100, Math.floor((cycles * 25) + (totalSeconds / 60) * 10));
        calmScore.textContent = `${score}%`;
    }

    function darkenColor(color, percent) {
        // Simple color darkening for gradient effect
        const colorMap = {
            "#4CAF50": "#388E3C",
            "#FF9800": "#F57C00", 
            "#2196F3": "#1976D2",
            "#9C27B0": "#7B1FA2"
        };
        return colorMap[color] || color;
    }

    // Progress Tracking
    function saveProgress() {
        const progress = {
            sessions: sessions,
            totalCycles: allTimeCycles,
            maxSessionTime: maxSessionTime,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('breathingProgress', JSON.stringify(progress));
    }

    function loadProgress() {
        const saved = localStorage.getItem('breathingProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            sessions = progress.sessions || 0;
            allTimeCycles = progress.totalCycles || 0;
            maxSessionTime = progress.maxSessionTime || 0;
            
            sessionsToday.textContent = sessions;
            totalCycles.textContent = allTimeCycles;
            longestSession.textContent = `${maxSessionTime}s`;
        }
    }

    // Auto-save progress every 30 seconds during active session
    setInterval(() => {
        if (isBreathingActive) {
            saveProgress();
        }
    }, 30000);
});