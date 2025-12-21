(function () {
    function initCarousel(carouselEl) {
        const track = carouselEl.querySelector(".carousel-track");
        const slides = Array.from(carouselEl.querySelectorAll(".carousel-slide"));
        const prevBtn = carouselEl.querySelector("[data-carousel-prev]");
        const nextBtn = carouselEl.querySelector("[data-carousel-next]");
        const dotsWrap = carouselEl.querySelector(".carousel-dots");

        if (!track || slides.length === 0 || !prevBtn || !nextBtn || !dotsWrap) return;

        let index = 0;

        // Build dots
        const dots = slides.map((_, i) => {
            const b = document.createElement("button");
            b.type = "button";
            b.className = "carousel-dot";
            b.setAttribute("aria-label", `Go to image ${i + 1}`);
            b.addEventListener("click", () => goTo(i));
            dotsWrap.appendChild(b);
            return b;
        });

        function render() {
            track.style.transform = `translateX(${-index * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
            prevBtn.disabled = slides.length <= 1;
            nextBtn.disabled = slides.length <= 1;
        }

        function goTo(i) {
            index = (i + slides.length) % slides.length;
            render();
        }

        prevBtn.addEventListener("click", () => goTo(index - 1));
        nextBtn.addEventListener("click", () => goTo(index + 1));

        // Keyboard support (when focused)
        const viewport = carouselEl.querySelector(".carousel-viewport");
        viewport?.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") goTo(index - 1);
            if (e.key === "ArrowRight") goTo(index + 1);
        });

        render();
    }

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".carousel").forEach(initCarousel);
    });
})();