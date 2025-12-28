// home.js
document.addEventListener('DOMContentLoaded', function() {
    const startDetectionBtn = document.getElementById('startDetection');
    const learnMoreBtn = document.getElementById('learnMore');
    
    startDetectionBtn.addEventListener('click', function() {
        window.location.href = 'live-detection.html';
    });
    
    learnMoreBtn.addEventListener('click', function() {
        window.location.href = 'about.html';
    });
});