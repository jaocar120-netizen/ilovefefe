const loader = document.getElementById("loader");
window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hide"), 850);
});

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const cursor = document.getElementById("cursor");
if (window.matchMedia("(pointer:fine)").matches) {
  document.addEventListener("mousemove", e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
  document.querySelectorAll("a,button,.gallery-card").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });
}

const timelineNote = document.getElementById("timelineNote");
document.querySelectorAll(".timeline-item").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".timeline-item").forEach(i => i.classList.remove("active"));
    item.classList.add("active");
    timelineNote.animate([{opacity:0, transform:"translateY(6px)"},{opacity:1, transform:"none"}], {duration:280,easing:"ease"});
    timelineNote.textContent = item.dataset.note;
  });
});

const symbols = [
  {
    index:"01",
    title:"A mão — a busca",
    text:"A mão elevada sugere movimento, desejo e procura. Nesta releitura, o gesto não aponta necessariamente para outra pessoa, mas para algo ainda sem forma: liberdade, identidade ou conhecimento de si."
  },
  {
    index:"02",
    title:"O olhar — além",
    text:"Psique direciona o rosto para cima. A postura sugere esperança e transformação. Ela não observa apenas aquilo que perdeu, mas aquilo que ainda pode encontrar."
  },
  {
    index:"03",
    title:"A coluna — o ideal",
    text:"A coluna grega remete à tradição clássica e aos ideais de equilíbrio, beleza e perfeição. A obra coloca Psique sobre esse símbolo para criar tensão entre padrões herdados e a possibilidade de questioná-los."
  },
  {
    index:"04",
    title:"A ausência — o espaço de Eros",
    text:"O elemento mais decisivo da obra talvez seja justamente o que não aparece. O espaço deixado por Eros transforma-se em símbolo e permite que Psique deixe de ser apenas parte de um casal para ocupar o centro da própria história."
  }
];
const panel = document.getElementById("symbolPanel");
document.querySelectorAll(".hotspot").forEach(button => {
  const activate = () => {
    document.querySelectorAll(".hotspot").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const s = symbols[Number(button.dataset.symbol)];
    panel.innerHTML = `<span class="symbol-index">${s.index}</span><h3>${s.title}</h3><p>${s.text}</p>`;
    panel.animate([{opacity:.25, transform:"translateY(8px)"},{opacity:1, transform:"none"}], {duration:320,easing:"ease-out"});
  };
  button.addEventListener("click", activate);
  button.addEventListener("mouseenter", activate);
});

const reflection = document.getElementById("reflection");
document.querySelectorAll("#wordField button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#wordField button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    reflection.textContent = btn.dataset.reflection;
    reflection.animate([{opacity:0, transform:"translateY(8px)"},{opacity:1, transform:"none"}], {duration:300,easing:"ease"});
  });
});

let ticking = false;
function updateParallax(){
  const y = window.scrollY;
  document.querySelectorAll("[data-parallax]").forEach(el => {
    const speed = Number(el.dataset.parallax || 0);
    const rect = el.getBoundingClientRect();
    const center = rect.top + rect.height/2 - window.innerHeight/2;
    el.style.transform = `translateY(${center * -speed}px)`;
  });
  ticking = false;
}
window.addEventListener("scroll", () => {
  if (!ticking && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}, {passive:true});
updateParallax();

document.querySelectorAll(".magnetic").forEach(el => {
  if (!window.matchMedia("(pointer:fine)").matches) return;
  el.addEventListener("mousemove", e => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width/2);
    const y = e.clientY - (r.top + r.height/2);
    el.style.transform = `translate(${x*.08}px,${y*.08}px)`;
  });
  el.addEventListener("mouseleave", () => el.style.transform = "");
});
