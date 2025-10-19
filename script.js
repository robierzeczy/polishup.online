document.addEventListener("DOMContentLoaded", () => {
  // ==== OVERLAY SETUP ====
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  // ==== TYPEWRITER EFFECT FUNCTION ====
  function typeWriter(element, text, delay = 100) {
    if (!element) return;
    let i = 0;
    element.textContent = "";
    if (element._typewriterTimer) clearTimeout(element._typewriterTimer);
    function write() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        element._typewriterTimer = setTimeout(write, delay);
      }
    }
    write();
  }
function observeTypewriter(id, text, delay, once = true, startDelay = 2000) {
  const el = document.getElementById(id);
  if (!el) return;
  let hasStarted = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!hasStarted || !once) {
            hasStarted = true;
            if (once) observer.unobserve(el);
            setTimeout(() => {
              el.style.visibility = "visible";
              typeWriter(el, text, delay);
            }, once ? startDelay : 0);
          }
        }
      });
    },
    { threshold: 0.6 }
  );

  observer.observe(el);
}



observeTypewriter("type1", "PROGRESS-ORIENTED COURSES", 100, false, 0); // za każdym razem, bez opóźnienia, wolno
observeTypewriter("intensiveLink", "RAPID-FIRE", 100, true, 1000);    // raz, 2s opóźnienia, szybciej
observeTypewriter("basicLink", "STEADY-FLOW", 100, true, 1000);        // raz, 2s opóźnienia, szybciej


  // ==== NAV TYPEWRITER ====
  function typeWriterNav(text, elementId, speed) {
    let i = 0;
    const el = document.getElementById(elementId);
    if (!el) return;
    el.textContent = "";
    const words = text.split(" ");
    let wordIndex = 0;
    function write() {
      if (wordIndex < words.length) {
        let word = words[wordIndex];
        if (i < word.length) {
          el.textContent += word.charAt(i);
          i++;
          setTimeout(write, speed);
        } else {
          el.textContent += " ";
          wordIndex++;
          i = 0;
          setTimeout(write, speed);
        }
      }
    }
    write();
  }

const container = document.getElementById("maszyna3");
if (container) {
  const lines = ["free", "demo"]; // dwa wiersze
  const delay = 100;

  container.textContent = "";

  function typeLine(lineText, parent, callback) {
    const line = document.createElement("div");
    line.style.display = "inline-block";
    line.style.transform = "rotate(-15deg)";
    line.style.transformOrigin = "left bottom";
    line.style.marginBottom = "2px";
    parent.appendChild(line);

    let i = 0;
    function write() {
      if (i < lineText.length) {
        const span = document.createElement("span");
        span.textContent = lineText[i];
        line.appendChild(span);
        i++;
        setTimeout(write, delay);
      } else if (callback) {
        callback(); // po zakończeniu tej linii, zaczynamy kolejną
      }
    }
    write();
  }

  // rozpoczynamy od pierwszej linii
  typeLine(lines[0], container, () => {
    typeLine(lines[1], container); // po zakończeniu pierwszej, piszemy drugą
  });
}



  // ==== HEADER CLICK ALERTS ====
  const headers = document.querySelectorAll(".main .h2, .main .h2 a");
  headers.forEach((header) => {
    header.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "a") {
        alert(`You clicked on: ${e.target.textContent}`);
      } else {
        alert(`You clicked on: ${header.textContent}`);
      }
    });
  });

  // ==== MENU LINK TOGGLE (PRICING SECTIONS) ====

  const pricingLinks = document.querySelectorAll(".pricing-link");
  let notificationTimeout = null;

  pricingLinks.forEach((link) => {
    const item = link.closest(".pricing-item");
    const submenuContent = item.querySelector(".pricing-submenu-content");

    link.addEventListener("click", (event) => {
      event.preventDefault();
      showNotification(submenuContent);
    });

    link.addEventListener("mouseenter", () => {
      showNotification(submenuContent);
    });

    link.addEventListener("mouseleave", () => {
      hideNotification(submenuContent);
    });
  });

  function showNotification(contentEl) {
    document.querySelectorAll(".pricing-submenu-content").forEach((el) => {
      el.classList.remove("show");
    });
    contentEl.classList.add("show");
    overlay.classList.add("show");
    if (notificationTimeout) clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => {
      contentEl.classList.remove("show");
      overlay.classList.remove("show");
    }, 100000);
  }

  function hideNotification(contentEl) {
    contentEl.classList.remove("show");
    overlay.classList.remove("show");
  }

  // Close on overlay click
  overlay.addEventListener("click", () => {
    document.querySelectorAll(".pricing-submenu-content").forEach((el) => {
      el.classList.remove("show");
    });
    overlay.classList.remove("show");
  });

  // ==== FREE DEMO SLOT TOGGLE (NO SCROLL) ====
  const slotButtons = document.querySelectorAll(".slot");
  slotButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const checkbox = this.querySelector(".slot-checkbox");
      if (!checkbox) return;

      checkbox.checked = !checkbox.checked;
      this.classList.toggle("checked", checkbox.checked);
    });
  });

const dayObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".day").forEach((day) => {
  dayObserver.observe(day);
});

// === GUIDE OBSERVER ===
const guideElement = document.querySelector(".guide");
if (guideElement) {
  const guideObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    },
    { threshold: 0.5 }
  );
  guideObserver.observe(guideElement);
}
  // ==== PRICING SECTION ANIMATION ====
  const pricingSection = document.querySelector(".pricing-container");
  if (pricingSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            pricingSection.classList.add("in-view");
          } else {
            pricingSection.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(pricingSection);
  }

  // ==== DETAILS2 SECTION ANIMATION ====
  const details2Section = document.querySelector(".details2");
  if (details2Section) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            details2Section.classList.add("in-view");
          } else {
            details2Section.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(details2Section);
  }

  // ==== CENTER PULSE BUTTON ====
  const pulseButton = document.querySelector(".center-pulse");
  if (pulseButton) {
    pulseButton.addEventListener("click", function () {
      this.classList.add("pulsing");
      setTimeout(() => {
        this.classList.remove("pulsing");
      }, 2000);
    });
  }

  // ==== SALE TAG STAMP EFFECT ====
  const saleTags = document.querySelectorAll(".sale-tag");

  function triggerStampEffect(tagEl) {
    if (!tagEl) return;
    tagEl.classList.remove("stamp-effect");
    void tagEl.offsetWidth;
    tagEl.classList.add("stamp-effect");
  }

  const pricingLinksForStamp = document.querySelectorAll(".pricing-link");

  pricingLinksForStamp.forEach((link) => {
    const item = link.closest(".pricing-item");
    const submenuContent = item.querySelector(".pricing-submenu-content");
    const tag = submenuContent.querySelector(".sale-tag");
    link.addEventListener("click", () => triggerStampEffect(tag));
    link.addEventListener("mouseenter", () => triggerStampEffect(tag));
  });
});

// ==== FAQ "SHOW MORE" TOGGLE ====
const triggers = document.querySelectorAll("[id^='showMoreTrigger']");
const paragraphs = document.querySelectorAll("[id^='hiddenParagraph']");

triggers.forEach((trigger, index) => {
  trigger.addEventListener("click", () => {
    paragraphs.forEach((para, paraIndex) => {
      if (index === paraIndex) {
        para.classList.toggle("hidden"); // tylko kliknięty
      } else {
        para.classList.add("hidden"); // reszta chowamy
      }
    });
  });
});


//===free==//
document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show"); // Remove class when out of view
        }
      });
    },
    { threshold: 0.1 }
  );

  const choice = document.querySelector(".choice");
  observer.observe(choice);
});
const form = document.querySelector('form[action="https://formspree.io/f/mblkgvag"]');
const button = document.getElementById("free2");
let hasSubmitted = false;

if (form && button) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (hasSubmitted) return;
    hasSubmitted = true;
    button.disabled = true;
    button.style.color = "#1C3A41";

    let count = 3;
    button.textContent = `${count}...`;

    const interval = setInterval(() => {
      count--;

      if (count > 0) {
        button.textContent = `${count}...`;
      } else if (count === 0) {
        button.textContent = "1...";
      } else {
        clearInterval(interval);
        button.textContent = "sent!";
        button.style.backgroundColor = "#41B3AC";
        button.style.color = "#1C3A41";

        form.submit();

        setTimeout(() => {
          form.reset();
          button.disabled = false;
          button.textContent = "3-2-1... send!";
          button.style.backgroundColor = "";
          button.style.color = "";
          hasSubmitted = false;
        }, 3000);
      }
    }, 800);
  });
} else {
  console.warn("FORM albo BUTTON nie znaleziono");
}


document.querySelectorAll(".time-slots button").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
  });
});

// A jeśli chcesz zebrać aktywne:
function getSelectedSlots() {
  return Array.from(document.querySelectorAll(".time-slots button.active")).map(
    (button) => ({
      day: button.dataset.day,
      time: button.dataset.time,
    })
  );
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

function handleScroll() {
  const experiences = document.querySelectorAll(".experience");
  experiences.forEach(function (exp) {
    if (isInViewport(exp)) {
      exp.classList.add("show");
    } else {
      exp.classList.remove("show");
    }
  });
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);

document.addEventListener("DOMContentLoaded", () => {
  const h2 = document.querySelector(".outline h2");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          h2.classList.add("animate");
        } else {
          h2.classList.remove("animate");
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(h2);
});

const header = document.querySelector(".ppolish_basic");
const section = document.querySelector(".details");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        header.classList.add("visible");
      } else {
        header.classList.remove("visible");
      }
    });
  },
  { threshold: 0.1 }
);

observer.observe(section);

const intensiveHeader = document.querySelector(".ppolish_intensive");
const intensiveSection = document.querySelector(".intensive");

const intensiveObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        intensiveHeader.classList.add("visible");
      } else {
        intensiveHeader.classList.remove("visible");
      }
    });
  },
  { threshold: 0.1 }
);

intensiveObserver.observe(intensiveSection);

document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("card3d");
  const wrapper = document.getElementById("cardWrapper");
  const link = document.querySelector('a[href="#cardWrapper"]');
  const backButton = document.querySelector(".back-button");

  if (!card || !wrapper) return;

  // Obsługa kliknięcia na FRONT karty — obrót na tył
  wrapper.addEventListener("click", (e) => {
    if (e.target.closest(".card-front")) {
      console.log("Kliknięto front karty – obracamy");
      card.classList.add("flipped");
      wrapper.classList.add("expanded");
    }
  });

  // Obsługa kliknięcia w link do karty (np. z menu)
  if (link) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      wrapper.scrollIntoView({ behavior: "smooth" });
      card.classList.add("flipped");
      wrapper.classList.add("expanded");
    });
  }

  // Obsługa obecności #cardWrapper w URL (np. bezpośredni link)
  if (window.location.hash === "#cardWrapper") {
    card.classList.add("flipped");
    wrapper.classList.add("expanded");
    wrapper.scrollIntoView({ behavior: "smooth" });
  }

  // Obsługa przycisku "← BACK" (opcjonalny przycisk na tyle karty)
  if (backButton) {
    backButton.addEventListener("click", (e) => {
      e.stopPropagation(); // zapobiega kliknięciu na wrapperze
      card.classList.remove("flipped");
      wrapper.classList.remove("expanded");
    });
  }
});




document.addEventListener("DOMContentLoaded", () => {
  const pulse = document.querySelector(".center-pulse");
  const text = document.querySelector(".center-text");

  if (!pulse || !text) return;

  pulse.addEventListener("click", () => text.classList.toggle("show"));
});

document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth <= 768) { // tylko na mobile
    const mobileLinks = document.querySelectorAll(".pricing-link-mobile");

    mobileLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault(); // niech link nie odświeża strony
        const item = link.closest(".pricing-item-mobile");
        const submenu = item.querySelector(".pricing-submenu-mobile");

        // schowaj wszystkie inne submeny
        document.querySelectorAll(".pricing-submenu-mobile").forEach(sm => {
          if (sm !== submenu) sm.classList.remove("show");
        });

        // pokaż/ukryj kliknięte submenu
        submenu.classList.toggle("show");
      });
    });
  }

  
});

