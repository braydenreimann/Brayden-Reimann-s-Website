
const spanishTranslations = {
    introduction: "Me llamo",
    title: "CS @ Purdue, aspirante a desarollador de software"
}

document.addEventListener("DOMContentLoaded", () => {
    // Set the language in localStorage when the language button is toggled
    document.getElementById("lang-toggle").addEventListener("click", () => {
        localStorage.setItem("lang", "es");
        console.log("this happened");
        switchLang();
    });
})

// Retrieve the language to load from localStorage
window.onload = (event) => {
    const lang = localStorage.getItem("lang");
    if (lang === "es") {
        switchLang()
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const langButton = document.getElementById("lang-toggle");

    if (langButton) {
        langButton.addEventListener("click", () => {
            console.log("Switching to Spanish.");
        })
    }
})

function switchLang() {
    document.getElementById("intro").innerText = spanishTranslations.introduction;
    document.getElementById("title").innerText = spanishTranslations.title;
}