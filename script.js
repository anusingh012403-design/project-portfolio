document.addEventListener("DOMContentLoaded", () => {
  // Chart
  const ctx = document.getElementById("gaitChart");

  if (ctx && typeof Chart !== "undefined") {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Trial 1", "Trial 2", "Trial 3", "Trial 4", "Trial 5"],
        datasets: [
          {
            label: "Forward Walking",
            data: [1.26, 1.30, 1.28, 1.31, 1.29],
            borderWidth: 3,
            tension: 0.4
          },
          {
            label: "Reverse Walking",
            data: [0.82, 0.85, 0.84, 0.86, 0.83],
            borderWidth: 3,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "white"
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: "white"
            }
          },
          y: {
            ticks: {
              color: "white"
            }
          }
        }
      }
    });
  }

  // CSV fetch
  fetch("data.csv")
    .then((res) => res.text())
    .then((data) => {
      console.log("CSV Loaded");
    })
    .catch((error) => {
      console.log("CSV not found or failed to load", error);
    });

  // Text animation
  const TEXT = document.querySelector(".text");
  const BTN = document.getElementById("replay");

  function split(el) {
    const raw = el.textContent;
    el.textContent = "";

    return raw.split("").map((ch) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = ch;
      el.appendChild(span);
      return span;
    });
  }

  function keyframes(name, css) {
    if (document.getElementById("kf-" + name)) return;

    const style = document.createElement("style");
    style.id = "kf-" + name;
    style.textContent = `@keyframes ${name} { ${css} }`;
    document.head.appendChild(style);
  }

  function run(fn) {
    fn();
    if (BTN) {
      BTN.onclick = fn;
    }
  }

  function neon_pulse() {
    if (!TEXT) return;

    keyframes(
      "neon-in",
      `
      0%   { opacity: 0; text-shadow: none; }
      30%  { opacity: 1; text-shadow: 0 0 8px #7C5CFF, 0 0 20px #7C5CFF, 0 0 40px #7C5CFF; color: #fff; }
      60%  { text-shadow: 0 0 4px #2EE6A6, 0 0 12px #2EE6A6; color: #fff; }
      100% { opacity: 1; text-shadow: none; color: #E8EAF0; }
      `
    );

    const chars = split(TEXT);

    chars.forEach((ch, i) => {
      ch.style.opacity = "0";
      setTimeout(() => {
        ch.style.animation = "neon-in 0.7s ease forwards";
      }, i * 55);
    });
  }

  if (TEXT) {
    run(neon_pulse);
  }
});

// Loader hide after full page load
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (loader) {
    setTimeout(() => {
      loader.classList.add("hide");
    }, 2200);
  }
});