const introText = "Hello, Sureen. Hello, Diva. You’ve spent your lives solving puzzles, but today, the puzzle is solving you. You are trapped within the adjacency logic of the Coloring Fraud. You have five lifelines. If you fail to understand the rules, the balloons pop. Every wrong move has a price. Live or fail to lose your grades, the choice is yours.";

// 8-Second Glitch Timer for Start Button
setInterval(() => {
    const btn = document.getElementById('start-btn');
    if (btn) {
        btn.classList.add('glitch-active');
        setTimeout(() => btn.classList.remove('glitch-active'), 400);
    }
}, 8000);

function startIntro() {
    // Hide start screen and show the new DOS box scene
    document.getElementById('start-screen').style.display = 'none';
    const introScene = document.getElementById('intro-scene');
    introScene.style.display = 'flex';

    const audio = new Audio('./voice/menacingintro.mp3');
    audio.play();

    const container = document.getElementById('typewriter-container');
    // Sync speed: ~26 seconds for the full text
    const speed = 26000 / introText.length; 
    let i = 0;

    function type() {
        if (i < introText.length) {
            container.innerHTML += introText.charAt(i);
            i++;
            // Keeps the newest text visible at the bottom of the box
            container.scrollTop = container.scrollHeight; 
            setTimeout(type, speed);
        }
    }
    type();

    audio.onended = () => {
        window.location.href = "./src/index.html"; 
    };
}