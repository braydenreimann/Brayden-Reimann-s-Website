/* nav.js */

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("navbar-mobile-toggle");
    const mobileLinks = document.getElementById("navbar-mobile-links");
    const bodyContent = document.getElementById("body-content");

    if (!toggle || !mobileLinks || !bodyContent) {
        return;
    }

    const openClass = "is-open";

    const setOpen = (isOpen) => {
        mobileLinks.classList.toggle(openClass, isOpen);
        bodyContent.classList.toggle(openClass, isOpen);
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    };

    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "navbar-mobile-links");

    toggle.addEventListener("click", () => {
        setOpen(!mobileLinks.classList.contains(openClass));
    });

    mobileLinks.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            setOpen(false);
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            setOpen(false);
        }
    });
});
