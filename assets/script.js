document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     MOBILE NAVIGATION
  ========================================= */

  const menuButton = document.querySelector(".menu");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "✕" : "☰";
    });

    // Close mobile menu after clicking a link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
      });
    });
  }


  /* =========================================
     DYNAMIC COPYRIGHT YEAR
  ========================================= */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* =========================================
     SCROLL REVEAL ANIMATION
  ========================================= */

  const revealElements = document.querySelectorAll(
    "section, .card, .fact, .grid > *, .section-head"
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }


  /* =========================================
     ACTIVE NAVIGATION
  ========================================= */

  const currentPath = window.location.pathname
    .replace(/\/+$/, "") || "/";

  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");

    if (!href || href.startsWith("#") || href.startsWith("mailto:")) {
      return;
    }

    const linkPath = new URL(href, window.location.origin).pathname
      .replace(/\/+$/, "") || "/";

    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });


  /* =========================================
     SMOOTH ANCHOR SCROLL
  ========================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  /* =========================================
     NAVBAR SCROLL EFFECT
  ========================================= */

  const navbar = document.querySelector("nav");

  if (navbar) {
    const updateNavbar = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 20);
    };

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, {
      passive: true
    });
  }


  /* =========================================
     SUBTLE CARD POINTER EFFECT
  ========================================= */

  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      if (window.innerWidth < 768) {
        return;
      }

      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -2;
      const rotateY = ((x / rect.width) - 0.5) * 2;

      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });


  /* =========================================
     REDUCED MOTION ACCESSIBILITY
  ========================================= */

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (reducedMotion.matches) {
    document.documentElement.style.scrollBehavior = "auto";

    document.querySelectorAll(".reveal").forEach((element) => {
      element.classList.add("visible");
    });
  }
});
