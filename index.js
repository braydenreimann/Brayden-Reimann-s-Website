// Create a new HTMLAudioElement to manage and play audio
const audioElement = new Audio("Media/Audio/menu-select.wav");

document.addEventListener("DOMContentLoaded", () => {
    console.log("Hey, JavaScript has been properly configured.")
    const crystalButtons = document.querySelectorAll(".crystal-button");

    if (crystalButtons) {
        console.log("Found the buttons.")
    }

    crystalButtons.forEach((crystalButton) => {
        crystalButton.addEventListener("mouseenter", () => {
            crystalButton.style.backgroundColor = "LightGreen";
            audioElement.play().then(r => null);
        })

        crystalButton.addEventListener("mouseleave", () => {
            crystalButton.style.backgroundColor = "";
        })
    })
})