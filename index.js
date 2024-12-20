const spanishTranslations = {
    introduction: "Me llamo",
    title: "CS @ Purdue, aspirante a desarollador de software",
    button: "English",
    aboutMe : "Acerca de mí",
    aboutMep1: "Soy de Huntingburg, Indiana, y esudio la informática en la universidad de Purdue." +
        "Despues de graduarme, mi plan es para trabajar como desarollador de software.",
    aboutMep2: "Aunque soy programadora y entusiasta de la technología, también soy un estudiante" +
        "de los humanidades.",
    aboutMep4: "",
    aboutMep3: "",
    aboutMep5: "",
    aboutMep6: "",
    aboutMep7: "",
    aboutMep8: "",
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
        document.getElementById("about-me").innerText = spanishTranslations.aboutMe;
        document.getElementById("about-me-p1").innerText = spanishTranslations.aboutMep1;
        document.getElementById("about-me-p2").innerText = spanishTranslations.aboutMep2;
        document.getElementById("about-me-p3").innerText = spanishTranslations.aboutMep3;
        document.getElementById("about-me-p4").innerText = spanishTranslations.aboutMep4;
        document.getElementById("about-me-p5").innerText = spanishTranslations.aboutMep5;
        document.getElementById("about-me-p6").innerText = spanishTranslations.aboutMep6;
        document.getElementById("about-me-p7").innerText = spanishTranslations.aboutMep7;
        document.getElementById("about-me-p8").innerText = spanishTranslations.aboutMep8;
    }
}

/*
document.getElementById("contact-form").addEventListener("submit", () => {
    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
}*/