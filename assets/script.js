document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     MOBILE NAVIGATION
  ========================================= */

  const menuButton = document.querySelector(".menu");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("active");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuButton.textContent = isOpen ? "✕" : "☰";

    });


    // Close menu after navigation click
    navLinks.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton.textContent = "☰";

      });

    });


    // Close menu when clicking outside
    document.addEventListener("click", (event) => {

      if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {

        navLinks.classList.remove("active");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton.textContent = "☰";

      }

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
     SCROLL REVEAL
  ========================================= */

  const revealElements = document.querySelectorAll(
    "section, .card, .fact, .grid > *, .section-head, .hero-content, .hero-photo, .hero-stats, .hero-quote, .info-strip, .skill-card, .about-photo"
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
        rootMargin: "0px 0px -50px 0px"
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

  const currentPath =
    window.location.pathname.replace(/\/+$/, "") || "/";


  document.querySelectorAll(".nav-links a").forEach((link) => {

    const href = link.getAttribute("href");

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("javascript:")
    ) {
      return;
    }


    const linkPath =
      new URL(href, window.location.origin)
        .pathname
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

      const targetId =
        link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }


      const target =
        document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        const navbar =
          document.querySelector("nav");

        const navbarHeight =
          navbar ? navbar.offsetHeight : 0;

        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          navbarHeight -
          15;


        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
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

      navbar.classList.toggle(
        "scrolled",
        window.scrollY > 25
      );

    };


    updateNavbar();


    window.addEventListener(
      "scroll",
      updateNavbar,
      { passive: true }
    );

  }


  /* =========================================
     HERO PHOTO PARALLAX
     Very subtle — premium feel
  ========================================= */

  const heroPhoto =
    document.querySelector(".hero-photo");


  if (heroPhoto && window.matchMedia("(pointer:fine)").matches) {

    window.addEventListener(
      "mousemove",
      (event) => {

        if (window.innerWidth < 900) {
          return;
        }


        const x =
          (event.clientX / window.innerWidth - 0.5);

        const y =
          (event.clientY / window.innerHeight - 0.5);


        heroPhoto.style.transform =
          `translate3d(${x * 6}px, ${y * 4}px, 0)`;

      },
      { passive: true }
    );

  }


  /* =========================================
     HERO STATS COUNTER
  ========================================= */

  const statNumbers =
    document.querySelectorAll("[data-count]");


  if (
    statNumbers.length &&
    "IntersectionObserver" in window
  ) {

    const counterObserver =
      new IntersectionObserver(
        (entries, observerInstance) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }


            const element =
              entry.target;

            const target =
              parseInt(
                element.dataset.count,
                10
              );


            if (Number.isNaN(target)) {
              return;
            }


            const suffix =
              element.dataset.suffix || "";


            let current = 0;

            const duration = 900;

            const start =
              performance.now();


            const animate = (time) => {

              const progress =
                Math.min(
                  (time - start) / duration,
                  1
                );


              const eased =
                1 - Math.pow(1 - progress, 3);


              current =
                Math.floor(target * eased);


              element.textContent =
                `${current}+`;


              if (progress < 1) {

                requestAnimationFrame(animate);

              } else {

                element.textContent =
                  `${target}${suffix}`;

              }

            };


            requestAnimationFrame(animate);

            observerInstance.unobserve(element);

          });

        },
        {
          threshold: 0.5
        }
      );


    statNumbers.forEach((element) => {
      counterObserver.observe(element);
    });

  }


  /* =========================================
     SKILL BAR ANIMATION
  ========================================= */

  const skillBars =
    document.querySelectorAll(
      ".skill-progress, .progress-bar span"
    );


  if (
    skillBars.length &&
    "IntersectionObserver" in window
  ) {

    const skillObserver =
      new IntersectionObserver(
        (entries, observerInstance) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }


            const bar =
              entry.target;

            const width =
              bar.dataset.width ||
              bar.getAttribute("data-progress");


            if (width) {

              bar.style.width =
                `${parseFloat(width)}%`;

            }


            observerInstance.unobserve(bar);

          });

        },
        {
          threshold: 0.35
        }
      );


    skillBars.forEach((bar) => {

      bar.style.width = "0%";

      skillObserver.observe(bar);

    });

  }


  /* =========================================
     CARD HOVER EFFECT
     No 3D rotation.
     Keeps the fixed premium design clean.
  ========================================= */

  document.querySelectorAll(".card").forEach((card) => {

    card.addEventListener(
      "pointerenter",
      () => {

        if (window.innerWidth >= 768) {
          card.classList.add("card-hover");
        }

      }
    );


    card.addEventListener(
      "pointerleave",
      () => {

        card.classList.remove("card-hover");

      }
    );

  });


  /* =========================================
     REDUCED MOTION ACCESSIBILITY
  ========================================= */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );


  const disableMotion = () => {

    if (reducedMotion.matches) {

      document.documentElement.style.scrollBehavior =
        "auto";


      document.querySelectorAll(".reveal").forEach(
        (element) => {
          element.classList.add("visible");
        }
      );


      if (heroPhoto) {
        heroPhoto.style.transform = "none";
      }

    }

  };


  disableMotion();


  if (reducedMotion.addEventListener) {

    reducedMotion.addEventListener(
      "change",
      disableMotion
    );

  }


  /* =========================================
     PAGE LOAD
     Prevent visible animation jump
  ========================================= */

  document.body.classList.add("page-ready");

});
