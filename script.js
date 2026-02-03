let progress = 0;
const maxProgress = 5000;

// --- PROJECT DATA (Easy to change) ---
const projectData = {
    'zone-gossip': 'Gossip',
    'zone-aspoc': 'Aspoc Space',
    'zone-tales': 'Design Tales',
    'zone-ux': 'UX Research',
    'zone-pokemon': 'Pokemon Klockis',
    'zone-six': 'Anastasia'
};

const landingUI = document.getElementById('landing-page-ui');
const heroImage = document.getElementById('hero-image');
const helloEl = document.getElementById('hello-text');
const tooltip = document.getElementById('project-tooltip');
const scrollArrows = document.getElementById('scroll-arrows');

// 1. Language Swapper
const languages = ["Hello", "Hola", "Bonjour", "Ciao", "Olá", "你好", "Привет", "안녕하세요"];
let langIdx = 0;
function updateHelloText() {
    helloEl.style.opacity = 0;
    setTimeout(() => {
        langIdx = (langIdx + 1) % languages.length;
        helloEl.textContent = languages[langIdx];
        let fontSize = 248;
        helloEl.style.fontSize = fontSize + "px";
        const maxWidth = document.getElementById('left-container').offsetWidth - 160; 
        while (helloEl.offsetWidth > maxWidth && fontSize > 40) {
            fontSize -= 5;
            helloEl.style.fontSize = fontSize + "px";
        }
        helloEl.style.opacity = 1;
    }, 400);
}
setInterval(updateHelloText, 3000);

// 2. Mouse/Hover Logic
window.addEventListener('mousemove', (e) => {
    tooltip.style.left = e.clientX + 'px';
    tooltip.style.top = e.clientY + 'px';
});

document.querySelectorAll('.project-zone').forEach(zone => {
    zone.addEventListener('mouseenter', () => {
        tooltip.textContent = projectData[zone.id];
        tooltip.style.display = 'block';
    });
    zone.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
});

// 3. Wheel Engine
// 3. Wheel Engine
window.addEventListener('wheel', (e) => {
    // --- THE FIX: STOP IF MODAL IS OPEN ---
    if (document.getElementById('modal-overlay').classList.contains('visible')) return;
    // --------------------------------------

    if (window.innerWidth < 1100 || window.innerHeight > window.innerWidth) return;
    progress += e.deltaY * 0.5;
    progress = Math.max(0, Math.min(progress, maxProgress));
    animate(progress);
});
function animate(val) {
    const phrases = document.querySelectorAll('.phrase');
    const dock = document.getElementById('dock');

    // 2D Phase
    phrases.forEach((p, i) => {
        const start = i * 400; 
        let pProg = val > start ? Math.min(1, Math.max(0, (val - start) / 300)) : 0;
        p.style.opacity = pProg;
        p.style.transform = `translateY(${(1 - pProg) * 50}px)`;
    });

    // Hide arrows when scrolling starts
    scrollArrows.style.opacity = val > 100 ? 0 : 1;

    // Zoom-Out Phase
    const zoomStart = 2000;
    const startBgScale = 7; 

    if (val > zoomStart) {
        if (dock) dock.classList.add('visible');
        let zoomProg = Math.min(1, Math.max(0, (val - zoomStart) / (maxProgress - zoomStart)));

        heroImage.style.transform = `scale(${startBgScale - (zoomProg * (startBgScale - 1))})`;
        
        const uiScaleX = 1 - (zoomProg * (1 - 0.111));
        const uiScaleY = 1 - (zoomProg * (1 - 0.135));
        landingUI.style.transform = `scale(${uiScaleX}, ${uiScaleY})`;
        
        if(zoomProg > 0.9) {
            landingUI.style.borderRadius = "3px";
            landingUI.style.boxShadow = "0 10px 40px rgba(0,0,0,0.5)";
            document.querySelectorAll('.project-zone').forEach(z => z.style.display = 'block');
        } else {
            landingUI.style.borderRadius = "0px";
            document.querySelectorAll('.project-zone').forEach(z => z.style.display = 'none');
        }
    } else {
        if (dock) dock.classList.remove('visible');
        landingUI.style.transform = `scale(1, 1)`;
        heroImage.style.transform = `scale(${startBgScale})`;
        landingUI.style.borderRadius = "0px";
    }
}
// ... previous code (animations, etc.) ...

// --- 1. FULL PROJECT DATA ---
const projectDetails = {
    // STANDARD IMAGES
    'zone-gossip': { type: 'image', src: 'gossip-full-details.png' },
    'zone-tales': { type: 'image', src: 'tales-full-details.png' },
    'zone-ux': { type: 'image', src: 'ux-full-details.png' },
    'zone-pokemon': { type: 'image', src: 'pokemon-full-details.png' },

    // ANASTASIA (Video Floating on top of Image)
    'zone-six': { 
        type: 'custom',
        html: `
            <div class="project-content-wrapper">
                <div class="anastasia-wrapper">
                    <img src="anastasia-intro.png" class="anastasia-base-img" alt="Anastasia Background">
                    <video id="anastasia-vid" class="anastasia-video-overlay" loop muted playsinline>
                        <source src="anastasia-demo.mp4" type="video/mp4">
                    </video>
                </div>
            </div>
        `,
        onOpen: () => {
            const v = document.getElementById('anastasia-vid');
            if(v) v.play().catch(e => console.log("Autoplay blocked", e));
        },
        onClose: () => {
            const v = document.getElementById('anastasia-vid');
            if(v) { v.pause(); v.currentTime = 0; }
        }
    },

    // ASPOC SPACE (New Text Content)
    'zone-aspoc': { 
        type: 'custom',
        html: `
            <div class="aspoc-layout">
                <div class="aspoc-header">
                    <h1 class="aspoc-title">VR ASPOC Center</h1>
                    <p class="aspoc-subtitle" style="line-height:1.6; margin-top:10px;">
                        <strong>Context</strong><br>
                        VR / AR Studio — Group project<br>
                        With Natalia Debska, Tommaso Laurenza, Klaudia Zielinska
                    </p>
                </div>

                <div class="aspoc-section">
                    <h3>The Challenge</h3>
                    <p>To recreate the ASPOC center in VR and design activities that support neurodivergent users in a safe, comfortable environment.</p>
                </div>

                <div class="aspoc-section">
                    <h3>The Approach</h3>
                    <p>We started by meeting ASPOC students and analyzing their needs through user journeys, storyboards, and observation. Based on this research, we designed slow-paced, non-overstimulating interactions in Unity.</p>
                    <p>I mainly focused on building interactive activities such as chess, music, dancing, and ambient rooms with adjustable lighting and environments.</p>
                
                    <div class="aspoc-video-grid">
                        
                        <div class="video-card">
                            <p>Music & Dancing (Audio On)</p>
                            <video class="rounded-video hover-play" loop playsinline>
                                <source src="aspoc-music.mp4" type="video/mp4">
                            </video>
                        </div>

                        <div class="video-card">
                            <p>Chess Activity</p>
                            <video class="rounded-video hover-play" loop muted playsinline>
                                <source src="aspoc-chess.mp4" type="video/mp4">
                            </video>
                        </div>

                        <div class="video-card">
                            <p>Light Control</p>
                            <video class="rounded-video hover-play" loop muted playsinline>
                                <source src="aspoc-light.mp4" type="video/mp4">
                            </video>
                        </div>

                        <div class="video-card">
                            <p>Ambient Room</p>
                            <video class="rounded-video hover-play" loop muted playsinline>
                                <source src="aspoc-ambient.mp4" type="video/mp4">
                            </video>
                        </div>
                    </div>
                </div>

                <div class="aspoc-section">
                    <h3>The Outcome</h3>
                    <p>A VR experience designed to reduce stress, promote engagement, and adapt to individual comfort levels.</p>
                </div>

                <div class="aspoc-section">
                    <h3>What I Learned</h3>
                    <p>This project reinforced the importance of pacing, empathy, and intentional slowness in interaction design.</p>
                </div>
            </div>
        `,
        onOpen: () => {
            document.querySelectorAll('.hover-play').forEach(vid => {
                vid.addEventListener('mouseenter', () => vid.play());
                vid.addEventListener('mouseleave', () => vid.pause());
            });
        },
        onClose: () => {
            document.querySelectorAll('video').forEach(vid => vid.pause());
        }
    }
};
// --- 2. CLICK HANDLERS & SCROLL FIX ---
const modal = document.getElementById('modal-overlay');
const scrollArea = document.getElementById('modal-scroll-area');
const docHtml = document.documentElement; // Selects <html>
const docBody = document.body;            // Selects <body>
let currentProjectKey = null;

document.querySelectorAll('.project-zone').forEach(zone => {
    zone.addEventListener('click', () => {
        const key = zone.id;
        const data = projectDetails[key];
        if (!data) return;

        currentProjectKey = key;
        scrollArea.innerHTML = ''; 

        if (data.type === 'image') {
            const img = document.createElement('img');
            img.src = data.src;
            img.id = 'modal-img';
            scrollArea.appendChild(img);
        } else if (data.type === 'custom') {
            scrollArea.innerHTML = data.html;
        }

        // STRICT SCROLL LOCK
        docHtml.classList.add('modal-open');
        docBody.classList.add('modal-open');

        modal.classList.add('visible');
        scrollArea.scrollTop = 0;

        if (data.onOpen) data.onOpen();
    });
});

function closeModal() {
    modal.classList.remove('visible');
    
    // UNLOCK SCROLL
    docHtml.classList.remove('modal-open');
    docBody.classList.remove('modal-open');

    if (currentProjectKey && projectDetails[currentProjectKey].onClose) {
        projectDetails[currentProjectKey].onClose();
    }
    currentProjectKey = null;
}

document.getElementById('modal-close').onclick = closeModal;
window.onclick = (event) => { if (event.target == modal) closeModal(); }
// --- BACKGROUND MUSIC ENGINE ---
const audio = document.getElementById('bg-music');
const volSlider = document.getElementById('volume-slider');
const volIcon = document.getElementById('audio-icon');

// 1. Initialize
audio.volume = 0.1; // Start low
let isMuted = false;
let previousVolume = 0.1;

// 2. Function to Update Icon Look
function updateIconState() {
    if (audio.volume === 0 || audio.muted) {
        volIcon.classList.add('muted'); // Shows X, Hides Waves
    } else {
        volIcon.classList.remove('muted'); // Shows Waves, Hides X
    }
}

// 3. Attempt Autoplay Immediately
const playPromise = audio.play();
if (playPromise !== undefined) {
    playPromise.catch(error => {
        console.log("Browser blocked autoplay. Waiting for interaction.");
        // If blocked, wait for ANY click to start
        window.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                updateIconState();
            }
        }, { once: true });
    });
}

// 4. Slider Logic
volSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    audio.volume = val;
    audio.muted = (val === 0); // If dragged to 0, treat as muted
    updateIconState();
});

// 5. Click Icon to Toggle Mute
volIcon.addEventListener('click', () => {
    if (audio.volume > 0 && !audio.muted) {
        // MUTE
        previousVolume = audio.volume;
        audio.volume = 0;
        audio.muted = true;
        volSlider.value = 0;
    } else {
        // UNMUTE
        audio.muted = false;
        audio.volume = previousVolume > 0 ? previousVolume : 0.1;
        volSlider.value = audio.volume;
        // Ensure it plays if it was paused
        if (audio.paused) audio.play(); 
    }
    updateIconState();
});