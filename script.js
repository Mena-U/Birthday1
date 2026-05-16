// Confetti Animation
function createConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ['#ff6b9d', '#667eea', '#764ba2', '#ffd93d', '#6bcf7f', '#ff6b6b', '#4ecdc4'];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 8 + 3;
            this.speedX = (Math.random() - 0.5) * 8;
            this.speedY = Math.random() * 5 + 5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 10;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
            this.speedY += 0.2; // gravity
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            
            if (particles[i].y > canvas.height) {
                particles.splice(i, 1);
            }
        }
        
        if (particles.length > 0) {
            requestAnimationFrame(animate);
        }
    }
    
    // Create confetti particles
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
    
    animate();
}

// Trigger initial confetti when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        createConfetti();
    }, 500);
});

// Play Happy Birthday Song
function playBirthday() {
    // Using Web Audio API to generate the melody
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    const notes = [
        { freq: 262, duration: 0.5 },  // C
        { freq: 262, duration: 0.5 },  // C
        { freq: 294, duration: 1 },    // D
        { freq: 262, duration: 1 },    // C
        { freq: 349, duration: 1 },    // F
        { freq: 330, duration: 2 },    // E
        { freq: 0, duration: 0.5 },     // Rest
        { freq: 262, duration: 0.5 },  // C
        { freq: 262, duration: 0.5 },  // C
        { freq: 294, duration: 1 },    // D
        { freq: 262, duration: 1 },    // C
        { freq: 392, duration: 1 },    // G
        { freq: 349, duration: 2 },    // F
        { freq: 0, duration: 0.5 },     // Rest
        { freq: 262, duration: 0.5 },  // C
        { freq: 262, duration: 0.5 },  // C
        { freq: 523, duration: 1 },    // C (octave)
        { freq: 440, duration: 1 },    // A
        { freq: 349, duration: 1 },    // F
        { freq: 330, duration: 1 },    // E
        { freq: 294, duration: 2 },     // D
        { freq: 0, duration: 0.5 },     // Rest
        {  freq: 466, duration: 0.5 },  // A# (or Bb)
        { freq: 466, duration: 0.5 },  // A# (or Bb)
        { freq: 440, duration: 1 },    // A
        { freq: 349, duration: 1 },    // F
        { freq: 392, duration: 1 },    // G
        { freq: 349, duration: 1 },    // F
    ];
    
    let time = audioContext.currentTime;
    
    notes.forEach(note => {
        const oscillator = audioContext.createOscillator();
        const envelope = audioContext.createGain();
        
        oscillator.frequency.value = note.freq;
        oscillator.type = 'sine';
        
        envelope.gain.setValueAtTime(0.3, time);
        envelope.gain.exponentialRampToValueAtTime(0.01, time + note.duration);
        
        oscillator.connect(envelope);
        envelope.connect(audioContext.destination);
        
        oscillator.start(time);
        oscillator.stop(time + note.duration);
        
        time += note.duration;
    });
    
    // Play confetti along with music
    createConfetti();
}

// Handle window resize for canvas
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});