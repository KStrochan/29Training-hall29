document.addEventListener("DOMContentLoaded", () => {

  /* ================= REVEAL ================= */
  const revealElements = document.querySelectorAll(".reveal");

  revealElements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.2 });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ================= ACTIVE NAV ================= */
  const navLinks = document.querySelectorAll(".nav__link");

  const sections = [
    { id: "advantages", link: document.querySelector('[href="#advantages"]') },
    { id: "pricing", link: document.querySelector('[href="#pricing"]') },
    { id: "location", link: document.querySelector('[href="#location"]') }
  ];

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("nav__link--active"));

        const current = sections.find(s => s.id === entry.target.id);
        if (current?.link) {
          current.link.classList.add("nav__link--active");
        }
      }
    });
  }, {
    threshold: 0.35,
    rootMargin: "-20% 0px -45% 0px"
  });

  sections.forEach(section => {
    const el = document.getElementById(section.id);
    if (el) sectionObserver.observe(el);
  });


  /* ================= COUNTERS ================= */
  const statNumbers = document.querySelectorAll(".stat-number");

  const animateValue = (el, target) => {
    let current = 0;
    const increment = Math.ceil(target / 40);

    const update = () => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        return;
      }
      el.textContent = current;
      requestAnimationFrame(update);
    };

    update();
  };

  const statsSection = document.querySelector(".stats");

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(num => {
          if (!num.dataset.animated) {
            animateValue(num, Number(num.dataset.target));
            num.dataset.animated = "true";
          }
        });
      }
    });
  }, { threshold: 0.4 });

  if (statsSection) statsObserver.observe(statsSection);


  /* ================= SMOOTH SCROLL ================= */
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      target?.scrollIntoView({ behavior: "smooth" });
    });
  });


  /* ================= FORM → TELEGRAM ================= */
  const form = document.getElementById("booking-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = new FormData(form);

      const payload = {
        name: data.get("name"),
        phone: data.get("phone"),
        message: data.get("message")
      };

      status.textContent = "Надсилаємо...";

      try {
        const res = await fetch("/send-telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const result = await res.json();

        if (!res.ok) throw new Error();

        status.textContent = "Заявку відправлено";
        form.reset();
      } catch {
        status.textContent = "Помилка. Спробуйте ще раз";
      }
    });
  }

});


/* ================= LOADER ================= */
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  if (loader) {
    setTimeout(() => loader.classList.add("hide"), 500);
  }
});


/* ================= HEADER SCROLL ================= */
const header = document.querySelector(".siteHeader");

window.addEventListener("scroll", () => {
  header?.classList.toggle("header-scrolled", window.scrollY > 50);
});


/* ================= TILT EFFECT ================= */
const cards = document.querySelectorAll(".adv-card, .priceCard, .reviewCard");

cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * 10;
    const rotateY = (x / rect.width - 0.5) * -10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `rotateX(0) rotateY(0)`;
  });
});


/* ================= RIPPLE ================= */
const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {
  btn.addEventListener("click", function (e) {
    const circle = document.createElement("span");

    const d = Math.max(btn.clientWidth, btn.clientHeight);
    const r = d / 2;

    circle.style.width = circle.style.height = `${d}px`;
    circle.style.left = `${e.clientX - btn.offsetLeft - r}px`;
    circle.style.top = `${e.clientY - btn.offsetTop - r}px`;
    circle.classList.add("ripple");

    const ripple = btn.querySelector(".ripple");
    if (ripple) ripple.remove();

    btn.appendChild(circle);
  });
});

// ============VIDEO==========
const heroVideo = document.querySelector(".hero-bg-video");

window.addEventListener("scroll", () => {
  if (!heroVideo) return;

  const offset = window.scrollY * 0.25;
  heroVideo.style.transform = `scale(1.08) translateY(${offset}px)`;
});