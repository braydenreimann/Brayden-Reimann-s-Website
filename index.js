const spanishTranslations = {
    introduction: "Me llamo",
    title: "CS @ Purdue, aspirante a desarollador de software",
    button: "English"
}

document.addEventListener("DOMContentLoaded", () => {
    // Set the initial language to English
    localStorage.setItem("lang", "en");

    // Set the language in localStorage when the language button is toggled
    document.getElementById("lang-toggle").addEventListener("click", () => {
        let lang = localStorage.getItem("lang");
        if (lang === "en") {
            localStorage.setItem("lang", "es");
            lang = "es";
        } else if (lang === "es") {
            localStorage.setItem("lang", "en");
            lang = "en";
        }
        switchLang(lang);
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

// Function for switching languages
function switchLang(lang) {
    if (lang === "en") {
        location.reload();
    } else if (lang === "es") {
        document.getElementById("intro").innerText = spanishTranslations.introduction;
        document.getElementById("title").innerText = spanishTranslations.title;
        document.getElementById("lang-toggle").innerText = spanishTranslations.button;
    }
}