const sparkleColors = [
    "var(--color-primary)",
    "var(--color-accent)",
    "var(--color-yellow)",
    "var(--color-light)",
    "var(--color-title)"
];

document.addEventListener("mousemove", (e)=>{
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";

    const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
    sparkle.style.background = color;
    sparkle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;

    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    sparkle.style.left = `${e.clientX + offsetX}px`;
    sparkle.style.top = `${e.clientY + offsetY}px`;

    const scale = 0.8 + Math.random() * 1.2;
    sparkle.style.transform = `scale(${scale} rotate(${Math.random()*360}deg))`

    document.body.appendChild(sparkle);
    setTimeout(()=> sparkle.remove(), 1500)
});
