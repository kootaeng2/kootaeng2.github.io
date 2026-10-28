// 푸터 연도
document.getElementById("year").textContent = new Date().getFullYear();

// 테마 (저장된 값 > 시스템 설정)
const root = document.documentElement;
const saved = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
root.dataset.theme = saved || (prefersLight ? "light" : "dark");

document.getElementById("theme-toggle").addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch {}
});

// 스크롤 시 섹션 등장
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
