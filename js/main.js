document.addEventListener("DOMContentLoaded", () => {
const revealElements = document.querySelectorAll(".reveal");

revealElements.forEach((el, index) => {
  el.style.transitionDelay = `${index * 0.8}s`;
});
  const navLinks = document.querySelectorAll(".nav__link");

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  const sections = [
    { id: "advantages", link: document.querySelector('.nav__link[href="#advantages"]') },
    { id: "pricing", link: document.querySelector('.nav__link[href="#pricing"]') },
    { id: "location", link: document.querySelector('.nav__link[href="#location"]') }
  ];
  

  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove("nav__link--active"));

          const current = sections.find(section => section.id === entry.target.id);
          if (current && current.link) {
            current.link.classList.add("nav__link--active");
          }
        }
      });
    },
    {
      threshold: 0.35,
      rootMargin: "-20% 0px -45% 0px"
    }
  );

  sections.forEach(section => {
    const el = document.getElementById(section.id);
    if (el) sectionObserver.observe(el);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, {
    threshold: 0.2
  });

  elements.forEach(el => observer.observe(el));

  const statNumbers = document.querySelectorAll(".stat-number");

  const animateValue = (element, target) => {
    let current = 0;
    const increment = Math.ceil(target / 40);

    const update = () => {
      current += increment;

      if (current >= target) {
        element.textContent = target;
        return;
      }

      element.textContent = current;
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
  }, {
    threshold: 0.4
  });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }
});

const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

const header = document.querySelector(".siteHeader");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("header-scrolled");
  } else {
    header.classList.remove("header-scrolled");
  }
});

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

const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {
  btn.addEventListener("click", function (e) {
    const circle = document.createElement("span");

    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - btn.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - btn.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = btn.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    btn.appendChild(circle);
  });
});