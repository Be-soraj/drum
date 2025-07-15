// Improved Drum Kit with double-click and additional features
document.addEventListener('DOMContentLoaded', function() {
    // Audio context for better sound control
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    
    // Play sound function with audio context
    function playSound(keyCode) {
        const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
        const key = document.querySelector(`div[data-key="${keyCode}"]`);
        
        if (!audio) return;
        
        // For better audio handling
        const source = audioContext.createMediaElementSource(audio);
        source.connect(audioContext.destination);
        
        key.classList.add('playing');
        audio.currentTime = 0;
        audio.play().catch(e => console.log("Audio play failed:", e));
    }
    
    // Remove transition class
    function removeTransition(e) {
        if (e.propertyName !== 'transform') return;
        this.classList.remove('playing');
    }
    
    // Handle keyboard events
    function handleKeydown(e) {
        playSound(e.keyCode);
    }
    
    // Handle click events (single click)
    function handleClick() {
        const keyCode = this.getAttribute('data-key');
        playSound(keyCode);
    }
    
    // Handle double click events
    function handleDoubleClick() {
        const keyCode = this.getAttribute('data-key');
        const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
        
        if (!audio) return;
        
        // For double click, we'll make the sound play twice quickly
        playSound(keyCode);
        setTimeout(() => playSound(keyCode), 100); // Play again after 100ms
    }
    
    // Set up event listeners
    const keys = Array.from(document.querySelectorAll('.key'));
    
    keys.forEach(key => {
        // Keyboard interaction
        key.addEventListener('transitionend', removeTransition);
        
        // Mouse/touch interactions
        key.addEventListener('click', handleClick);
        key.addEventListener('dblclick', handleDoubleClick);
        
        // Touch support for mobile devices
        key.addEventListener('touchstart', function(e) {
            e.preventDefault();
            handleClick.call(this);
        });
    });
    
    window.addEventListener('keydown', handleKeydown);
    
    // Additional features could include:
    // - Record/playback functionality
    // - Volume control
    // - Tempo control
    // - Pattern sequencing
    // - Sound customization
    
    // Example: Add a record button
    const recordButton = document.createElement('button');
    recordButton.textContent = 'Record';
    recordButton.style.position = 'fixed';
    recordButton.style.bottom = '20px';
    recordButton.style.left = '20px';
    document.body.appendChild(recordButton);
    
    let isRecording = false;
    let recordedSequence = [];
    let startTime;
    
    recordButton.addEventListener('click', function() {
        isRecording = !isRecording;
        this.textContent = isRecording ? 'Stop Recording' : 'Record';
        
        if (isRecording) {
            startTime = Date.now();
            recordedSequence = [];
            console.log('Recording started...');
        } else {
            console.log('Recording stopped. Sequence:', recordedSequence);
            // Could add playback functionality here
        }
    });
    
    // Modify playSound to record when recording is active
    const originalPlaySound = playSound;
    playSound = function(keyCode) {
        originalPlaySound(keyCode);
        
        if (isRecording) {
            const time = Date.now() - startTime;
            recordedSequence.push({ keyCode, time });
        }
    };
});
