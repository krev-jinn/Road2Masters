/* ════════════════════════════════════════
   script.js — Road2Masters (Firebase integrated)
════════════════════════════════════════ */

// ── FIREBASE SETUP ────────────────────
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey:            "AIzaSyBC5ncjRygA9jyJnda2uA6EiWpz8Sp4a4c",
  authDomain:        "road2masters.firebaseapp.com",
  projectId:         "road2masters",
  storageBucket:     "road2masters.firebasestorage.app",
  messagingSenderId: "777337191866",
  appId:             "1:777337191866:web:160411a6dd720d9dbe3183",
  measurementId:     "G-BH7RVSDZSQ"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// ── THEME TOGGLE ──────────────────────
function toggleTheme() {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("road2masters_theme", html.dataset.theme);
}
window.toggleTheme = toggleTheme;

(function () {
  const saved = localStorage.getItem("road2masters_theme");
  if (saved) document.documentElement.dataset.theme = saved;
})();

// ── FORM VALIDATION + FIREBASE SAVE ──
async function validateForm() {
  const name  = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const error = document.getElementById("error");
  const emailPat = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/i;

  if (name.length < 3)         return (error.textContent = "Name must be at least 3 characters.");
  if (!emailPat.test(email))   return (error.textContent = "Please enter a valid email address.");
  if (!/^\d{10}$/.test(phone)) return (error.textContent = "Phone must be exactly 10 digits.");
  error.textContent = "";

 
  try {
    await addDoc(collection(db, "users"), {
      name, email, phone,
      joinedAt: serverTimestamp()
    });
    console.log(" User saved to Firebase");
  } catch (e) {
    console.error("Firebase save error:", e);
  }

  const fp = document.getElementById("formPage");
  fp.style.transition = "opacity .4s";
  fp.style.opacity = "0";
  setTimeout(() => {
    fp.style.display = "none";
    const mp = document.getElementById("mainPage");
    mp.style.display = "block";
    mp.style.opacity = "0";
    mp.style.transition = "opacity .4s";
    setTimeout(() => (mp.style.opacity = "1"), 10);
  }, 380);

  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  document.getElementById("userAvatar").textContent = initials;
  document.getElementById("welcomeMsg").textContent = "Hello, " + name.split(" ")[0];
  sessionStorage.setItem("r2m_name", name);
}
window.validateForm = validateForm;

// ── LOCAL IMAGE PATHS ─────────────────
const domainIcons = {
  web:    "https://img.icons8.com/ios/52/3b6fd4/internet.png",
  ai:     "https://img.icons8.com/ios/52/3b6fd4/artificial-intelligence.png",
  cyber:  "https://img.icons8.com/ios/52/3b6fd4/lock-2.png",
  data:   "https://img.icons8.com/ios/52/3b6fd4/bar-chart.png",
  mobile: "https://img.icons8.com/ios/52/3b6fd4/smartphone-tablet.png"
};


const domainImages = {
  web:    "web.png",
  ai:     "ai.png",
  cyber:  "cyber.png",
  data:   "data.png",
  mobile: "mobile.png"
};

// ── ROADMAP DATA ──────────────────────
const roadmaps = {
  web: {
    icon: domainIcons.web, title: "Web Development",
    desc: "Build modern, scalable web applications — from static pages to full-stack systems.",
    phases: [
      { phase: "Phase 1 — Foundations", badge: "beginner", items: [
        { topic: "HTML5 & Semantic Markup", desc: "Document structure, semantic elements, forms, accessibility standards, and SEO-friendly markup.", resource: "MDN Web Docs / Jon Duckett",
          videos: [{ title: "HTML Full Course — freeCodeCamp", channel: "freeCodeCamp.org", url: "https://www.youtube.com/watch?v=kUMe1FH4CHE" }, { title: "HTML5 Semantic Elements", channel: "Traversy Media", url: "https://www.youtube.com/watch?v=kX3TfdUqpuU" }] },
        { topic: "CSS3 & Responsive Design", desc: "Flexbox, CSS Grid, animations, media queries, and CSS variables for device-adaptive interfaces.", resource: "CSS Tricks / Kevin Powell",
          videos: [{ title: "CSS Full Course", channel: "freeCodeCamp.org", url: "https://www.youtube.com/watch?v=1Rs2ND1ryYc" }, { title: "CSS Grid & Flexbox", channel: "Kevin Powell", url: "https://www.youtube.com/c/KevinPowell" }] }
      ]},
      { phase: "Phase 2 — Core Programming", badge: "intermediate", items: [
        { topic: "JavaScript (ES6+)", desc: "Closures, promises, async/await, DOM manipulation, event handling, and modern JS patterns.", resource: "Eloquent JavaScript / javascript.info",
          videos: [{ title: "JavaScript Full Course", channel: "Akshay Saini", url: "https://www.youtube.com/c/akshaymarch7" }, { title: "JS Complete Guide", channel: "Maximilian Schwarzmüller", url: "https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/" }] },
        { topic: "Version Control with Git & GitHub", desc: "Branch management, pull requests, conflict resolution, and collaborative development workflows.", resource: "Pro Git / GitHub Docs",
          videos: [{ title: "Git & GitHub Crash Course", channel: "Traversy Media", url: "https://www.youtube.com/watch?v=SWYqp7iY_Tc" }, { title: "Git for Professionals", channel: "freeCodeCamp.org", url: "https://www.youtube.com/watch?v=Uszj_k0DGsg" }] }
      ]},
      { phase: "Phase 3 — Advanced Frameworks", badge: "advanced", items: [
        { topic: "React.js & State Management", desc: "Component architecture, hooks, context API, Redux Toolkit, and production-scale SPAs.", resource: "Official React Docs / Kent C. Dodds",
          videos: [{ title: "React Full Course 2024", channel: "Dave Gray", url: "https://www.youtube.com/watch?v=RVFAyFWO4go" }, { title: "React JS Crash Course", channel: "Traversy Media", url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8" }] },
        { topic: "Node.js & REST APIs", desc: "Server-side development, Express.js, REST API design, middleware, authentication, and MongoDB integration.", resource: "Node.js Docs / The Odin Project",
          videos: [{ title: "Node.js & Express Full Course", channel: "freeCodeCamp.org", url: "https://www.youtube.com/watch?v=Oe421EPjeBE" }, { title: "MERN Stack Full Course", channel: "Dave Gray", url: "https://www.youtube.com/watch?v=CvCiNeLnZ00" }] }
      ]},
      { phase: "Phase 4 — Capstone & Research", badge: "research", items: [
        { topic: "Capstone Project & Deployment", desc: "Full-stack project using CI/CD pipelines, Docker, cloud hosting (Vercel/AWS), and domain management.", resource: "AWS Docs / Vercel / Docker Hub",
          videos: [{ title: "Full Stack Deployment", channel: "Traversy Media", url: "https://www.youtube.com/results?search_query=full+stack+deployment" }, { title: "Docker for Beginners", channel: "TechWorld with Nana", url: "https://www.youtube.com/watch?v=3c-iBn73dDE" }] }
      ]}
    ]
  },
  ai: {
    icon: domainIcons.ai, title: "Artificial Intelligence",
    desc: "Master the mathematics, algorithms, and modern frameworks powering AI and machine learning.",
    phases: [
      { phase: "Phase 1 — Mathematical Foundations", badge: "beginner", items: [
        { topic: "Linear Algebra & Probability", desc: "Vectors, matrices, eigenvalues, probability distributions, and Bayes theorem — the backbone of every ML algorithm.", resource: "Gilbert Strang / 3Blue1Brown",
          videos: [{ title: "Essence of Linear Algebra", channel: "3Blue1Brown", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" }, { title: "Statistics & Probability", channel: "StatQuest", url: "https://www.youtube.com/c/joshstarmer" }] }
      ]},
      { phase: "Phase 2 — Programming for AI", badge: "intermediate", items: [
        { topic: "Python for Data Science", desc: "NumPy, Pandas, Matplotlib, Seaborn — building data pipelines and exploratory analysis skills.", resource: "Python Crash Course / Kaggle Learn",
          videos: [{ title: "Python for Data Science", channel: "freeCodeCamp.org", url: "https://www.youtube.com/watch?v=LHBE6Q9XlzI" }, { title: "NumPy & Pandas Tutorial", channel: "Keith Galli", url: "https://www.youtube.com/c/KGMIT" }] },
        { topic: "Classical Machine Learning", desc: "Supervised & unsupervised learning, SVM, decision trees, ensemble methods, and model evaluation.", resource: "Hands-On ML (Aurélien Géron)",
          videos: [{ title: "ML Course by Andrew Ng", channel: "DeepLearning.AI", url: "https://www.coursera.org/learn/machine-learning" }, { title: "Scikit-Learn Tutorial", channel: "Sentdex", url: "https://www.youtube.com/c/sentdex" }] }
      ]},
      { phase: "Phase 3 — Deep Learning", badge: "advanced", items: [
        { topic: "Neural Networks & Deep Learning", desc: "CNNs, RNNs, LSTMs, Transformers. TensorFlow and PyTorch. Training strategies and optimisation.", resource: "Deep Learning (Goodfellow) / fast.ai",
          videos: [{ title: "Neural Networks: Zero to Hero", channel: "Andrej Karpathy", url: "https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ" }, { title: "PyTorch Full Course", channel: "freeCodeCamp.org", url: "https://www.youtube.com/watch?v=c36lUUr864M" }] }
      ]},
      { phase: "Phase 4 — Research & Specialisation", badge: "research", items: [
        { topic: "Research Paper & Thesis", desc: "Survey state-of-the-art AI, replicate experiments, and contribute original findings for your Master's thesis.", resource: "arXiv.org / Google Scholar / Papers With Code",
          videos: [{ title: "How to Read Research Papers", channel: "Andrew Ng", url: "https://www.youtube.com/watch?v=733m6qBH-jI" }, { title: "ML Research Explained", channel: "Yannic Kilcher", url: "https://www.youtube.com/c/YannicKilcher" }] }
      ]}
    ]
  },
  cyber: {
    icon: domainIcons.cyber, title: "Cybersecurity",
    desc: "Protect systems, networks, and data through ethical hacking, defence strategies, and security architecture.",
    phases: [
      { phase: "Phase 1 — Networking Fundamentals", badge: "beginner", items: [
        { topic: "Computer Networks & Protocols", desc: "OSI model, TCP/IP, DNS, HTTP/HTTPS, firewalls, VPNs — how data flows across modern networks.", resource: "Computer Networking (Kurose & Ross)",
          videos: [{ title: "Computer Networking Full Course", channel: "freeCodeCamp.org", url: "https://www.youtube.com/watch?v=qiQR5rTSshw" }, { title: "Networking Fundamentals", channel: "Professor Messer", url: "https://www.professormesser.com/" }] }
      ]},
      { phase: "Phase 2 — Security Principles", badge: "intermediate", items: [
        { topic: "Cryptography & PKI", desc: "Symmetric/asymmetric encryption, hashing, digital certificates, TLS/SSL, and public key infrastructure.", resource: "Cryptography & Network Security (Stallings)",
          videos: [{ title: "Cryptography Full Course", channel: "freeCodeCamp.org", url: "https://www.youtube.com/watch?v=AQDCe585Lnc" }, { title: "Public Key Cryptography", channel: "Computerphile", url: "https://www.youtube.com/c/computerphile" }] },
        { topic: "Security Architecture & Compliance", desc: "Zero-trust model, SIEM, IAM, GDPR, ISO 27001, and NIST frameworks.", resource: "CISSP All-in-One / NIST CSF",
          videos: [{ title: "CompTIA Security+ Full Course", channel: "Professor Messer", url: "https://www.youtube.com/c/professormesser" }, { title: "Zero Trust Architecture", channel: "IBM Technology", url: "https://www.youtube.com/c/IBMTechnology" }] }
      ]},
      { phase: "Phase 3 — Ethical Hacking", badge: "advanced", items: [
        { topic: "Penetration Testing & CTF", desc: "Reconnaissance, exploitation, post-exploitation, and reporting using Kali Linux, Metasploit, Burp Suite, and Nmap.", resource: "CEH / OSCP / Hack The Box",
          videos: [{ title: "Ethical Hacking Full Course", channel: "freeCodeCamp.org", url: "https://www.youtube.com/watch?v=3Kq1MIfTWCE" }, { title: "Penetration Testing Bootcamp", channel: "TCM Security", url: "https://www.youtube.com/c/TheCyberMentor" }] }
      ]},
      { phase: "Phase 4 — Research", badge: "research", items: [
        { topic: "Vulnerability Research & Thesis", desc: "Original security research, CVE analysis, malware reverse engineering, and responsible disclosure.", resource: "IEEE S&P / USENIX Security / CWE Database",
          videos: [{ title: "Security Research for Beginners", channel: "LiveOverflow", url: "https://www.youtube.com/c/LiveOverflow" }, { title: "Reverse Engineering Malware", channel: "MalwareAnalysisForHedgehogs", url: "https://www.youtube.com/c/MalwareAnalysisForHedgehogs" }] }
      ]}
    ]
  },
  data: {
    icon: domainIcons.data, title: "Data Science",
    desc: "Extract insight from data using statistical modelling, visualisation, and predictive analytics.",
    phases: [
      { phase: "Phase 1 — Statistical Foundations", badge: "beginner", items: [
        { topic: "Statistics & Probability Theory", desc: "Descriptive statistics, hypothesis testing, p-values, confidence intervals, distributions, and Bayesian reasoning.", resource: "OpenIntro Statistics / StatQuest",
          videos: [{ title: "Statistics Fundamentals", channel: "StatQuest (Josh Starmer)", url: "https://www.youtube.com/c/joshstarmer" }, { title: "Probability & Statistics", channel: "Khan Academy", url: "https://www.khanacademy.org/math/statistics-probability" }] }
      ]},
      { phase: "Phase 2 — Data Engineering", badge: "intermediate", items: [
        { topic: "Data Wrangling & EDA", desc: "Cleaning, transforming, and exploring data with Pandas, NumPy, and SQL.", resource: "Python for Data Analysis (Wes McKinney)",
          videos: [{ title: "Pandas Full Course", channel: "Keith Galli", url: "https://www.youtube.com/watch?v=vmEHCJofslg" }, { title: "Data Analysis with Python", channel: "freeCodeCamp.org", url: "https://www.youtube.com/watch?v=r-uOLxNrNk8" }] },
        { topic: "Data Visualisation", desc: "Dashboards with Matplotlib, Seaborn, Plotly, and Tableau for stakeholder communication.", resource: "Storytelling with Data (Cole Nussbaumer)",
          videos: [{ title: "Matplotlib & Seaborn Tutorial", channel: "Corey Schafer", url: "https://www.youtube.com/c/Coreyms" }, { title: "Tableau for Beginners", channel: "Simplilearn", url: "https://www.youtube.com/watch?v=aHaOIvR00So" }] }
      ]},
      { phase: "Phase 3 — Advanced Analytics", badge: "advanced", items: [
        { topic: "Predictive Modelling & ML Pipelines", desc: "Feature selection, cross-validation, hyperparameter tuning, MLflow, and model deployment.", resource: "Scikit-Learn Docs / MLflow / Kaggle",
          videos: [{ title: "Complete ML Pipeline", channel: "Krish Naik", url: "https://www.youtube.com/c/KrishNaik" }, { title: "Kaggle Competition Walk-through", channel: "Rob Mulla", url: "https://www.youtube.com/c/RobMulla" }] }
      ]},
      { phase: "Phase 4 — Research & Publication", badge: "research", items: [
        { topic: "Research Thesis & Data Ethics", desc: "Rigorous data studies, peer review, reproducibility, ethical data usage, and academic publishing.", resource: "ACM SIGKDD / IEEE Data Eng. / Springer",
          videos: [{ title: "Data Science Research Methods", channel: "Data School", url: "https://www.youtube.com/c/dataschool" }, { title: "Ethics in AI & Data Science", channel: "MIT OpenCourseWare", url: "https://www.youtube.com/c/mitocw" }] }
      ]}
    ]
  },
  mobile: {
    icon: domainIcons.mobile, title: "Mobile App Development",
    desc: "Design and ship cross-platform mobile applications using modern frameworks and professional deployment pipelines.",
    phases: [
      { phase: "Phase 1 — UI & UX Fundamentals", badge: "beginner", items: [
        { topic: "Mobile UI Design Principles", desc: "Human Interface Guidelines (iOS), Material Design (Android), Figma prototyping, and accessibility.", resource: "Google Material Design / Apple HIG",
          videos: [{ title: "UI/UX Design Full Course", channel: "DesignCourse", url: "https://www.youtube.com/c/DesignCourse" }, { title: "Figma Tutorial for Beginners", channel: "freeCodeCamp.org", url: "https://www.youtube.com/watch?v=FTFaQWZBqQ8" }] }
      ]},
      { phase: "Phase 2 — Core Development", badge: "intermediate", items: [
        { topic: "React Native / Flutter", desc: "Component-based mobile UI, navigation, state management, platform APIs, and performance for iOS & Android.", resource: "React Native Docs / Flutter.dev",
          videos: [{ title: "React Native Full Course", channel: "Maximilian Schwarzmüller", url: "https://www.youtube.com/watch?v=0-S5a0eXPoc" }, { title: "Flutter & Dart Full Course", channel: "freeCodeCamp.org", url: "https://www.youtube.com/watch?v=VPvVD8t02U8" }] },
        { topic: "REST APIs & Firebase Integration", desc: "REST APIs, real-time databases, push notifications, authentication, and cloud data sync.", resource: "Firebase Docs / REST API Design (O'Reilly)",
          videos: [{ title: "Firebase for Mobile Apps", channel: "Fireship", url: "https://www.youtube.com/c/Fireship" }, { title: "Axios & REST APIs", channel: "Academind", url: "https://www.youtube.com/c/Academind" }] }
      ]},
      { phase: "Phase 3 — Advanced & Native", badge: "advanced", items: [
        { topic: "Native Modules & Performance", desc: "Bridging native code, sensors, animations, memory profiling, lazy loading, and app optimisation.", resource: "Android NDK Docs / Swift.org",
          videos: [{ title: "React Native Performance", channel: "William Candillon", url: "https://www.youtube.com/c/wcandillon" }, { title: "Flutter Advanced Animations", channel: "Robert Brunhage", url: "https://www.youtube.com/c/RobertBrunhage" }] }
      ]},
      { phase: "Phase 4 — Deployment & Research", badge: "research", items: [
        { topic: "App Store Deployment & Thesis", desc: "Publishing to Google Play & Apple App Store, beta testing, analytics, monetisation, and original research.", resource: "Google Play Console / App Store Connect",
          videos: [{ title: "Publish App to Play Store", channel: "Reso Coder", url: "https://www.youtube.com/c/ResoCoder" }, { title: "Mobile Research Topics 2024", channel: "Academind", url: "https://www.youtube.com/c/Academind" }] }
      ]}
    ]
  }
};

// ── NOTES (localStorage) ──────────────
let currentNoteKey = "";
let currentStickyColor = "#fff9c4";

function openNotesModal(key, title) {
  currentNoteKey = key;
  document.getElementById("notesModalTitle").textContent = "Notes — " + title;
  const saved      = localStorage.getItem("note::" + key) || "";
  const savedColor = localStorage.getItem("notecolor::" + key) || "#fff9c4";
  document.getElementById("notesArea").value = saved;
  setStickyColor(savedColor, null, false);
  document.getElementById("noteSavedMsg").style.display = "none";
  document.getElementById("notesModal").classList.add("open");
}
window.openNotesModal = openNotesModal;

function setStickyColor(color, btn, save = true) {
  currentStickyColor = color;
  document.getElementById("notesArea").style.background = color;
  document.querySelectorAll(".swatch").forEach(s => s.classList.toggle("active", s.dataset.color === color));
  if (save) localStorage.setItem("notecolor::" + currentNoteKey, color);
}
window.setStickyColor = setStickyColor;

function saveNote() {
  const text = document.getElementById("notesArea").value;
  localStorage.setItem("note::" + currentNoteKey, text);
  localStorage.setItem("notecolor::" + currentNoteKey, currentStickyColor);
  const btnId = "notebtn_" + currentNoteKey.replace(/[^a-z0-9]/gi, "_");
  const btn = document.getElementById(btnId);
  if (btn) {
    const has = !!(text && text.trim());
    btn.classList.toggle("has-note", has);
    btn.textContent = has ? "Notes *" : "Notes";
  }
  const msg = document.getElementById("noteSavedMsg");
  msg.style.display = "inline";
  setTimeout(() => (msg.style.display = "none"), 1800);
}
window.saveNote = saveNote;

function closeNotesModal() { document.getElementById("notesModal").classList.remove("open"); }
window.closeNotesModal = closeNotesModal;

// ── VIDEO MODAL ───────────────────────
function openVideoModal(title, videosEncoded) {
  document.getElementById("videoModalTitle").textContent = "Videos — " + title;
  const list = document.getElementById("videoList");
  list.innerHTML = "";
  let vids = [];
  try { vids = JSON.parse(decodeURIComponent(videosEncoded)); } catch (e) {}
  vids.forEach(v => {
    const a = document.createElement("a");
    a.className = "video-item"; a.href = v.url; a.target = "_blank"; a.rel = "noopener noreferrer";
    a.innerHTML = `
      <div class="video-thumb"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
      <div class="video-info">
        <strong>${v.title}</strong>
        <span>${v.channel}</span>
        <span class="video-link-btn">Open resource &rarr;</span>
      </div>`;
    list.appendChild(a);
  });
  document.getElementById("videoModal").classList.add("open");
}
window.openVideoModal = openVideoModal;

function closeVideoModal() { document.getElementById("videoModal").classList.remove("open"); }
window.closeVideoModal = closeVideoModal;


let currentDoubtTopic = "";

function openQueryModal(topic) {
  currentDoubtTopic = topic;
  document.getElementById("queryModalTitle").textContent = "Ask a Doubt — " + topic;
  document.getElementById("queryMsg").style.display = "none";
  document.getElementById("queryText").value = "";
  const savedName = sessionStorage.getItem("r2m_name") || "";
  document.getElementById("queryName").value = savedName;
  document.getElementById("queryModal").classList.add("open");
}
window.openQueryModal = openQueryModal;

function closeQueryModal() { document.getElementById("queryModal").classList.remove("open"); }
window.closeQueryModal = closeQueryModal;

async function submitQuery() {
  const text = document.getElementById("queryText").value.trim();
  if (!text) return;
  const name = document.getElementById("queryName").value.trim() || "Anonymous";

  try {
    await addDoc(collection(db, "doubts"), {
      name, topic: currentDoubtTopic, question: text,
      submittedAt: serverTimestamp(), answered: false
    });
    console.log("Doubt saved to Firebase");
  } catch (e) {
    console.error("Firebase doubt error:", e);
    const all = JSON.parse(localStorage.getItem("queries") || "[]");
    all.push({ name, text, time: new Date().toISOString() });
    localStorage.setItem("queries", JSON.stringify(all));
  }

  document.getElementById("queryText").value = "";
  document.getElementById("queryName").value = "";
  const msg = document.getElementById("queryMsg");
  msg.style.display = "inline";
  setTimeout(() => (msg.style.display = "none"), 3000);
}
window.submitQuery = submitQuery;

// ── LOAD DOMAIN ───────────────────────
function loadDomain(domain) {
  const data = roadmaps[domain];
  if (!data) return;

  document.querySelectorAll(".domain-item").forEach(el => el.classList.remove("active"));
  document.querySelector(`[data-domain="${domain}"]`).classList.add("active");

  document.getElementById("domainCardImg").src           = domainImages[domain];
  document.getElementById("domainCardTag").textContent   = "Master's Track";
  document.getElementById("domainCardTitle").textContent = data.title;
  document.getElementById("domainCardDesc").textContent  = data.desc;

  const content  = document.getElementById("roadmapContent");
  const todoList = document.getElementById("todoList");
  content.innerHTML  = "";
  todoList.innerHTML = "";

  const hdr = document.createElement("div");
  hdr.className = "domain-header";
  hdr.innerHTML = `
    <div class="domain-header-top">
      <img src="${data.icon}" class="dh-icon" alt="">
      <h2>${data.title} — Learning Roadmap</h2>
    </div>
    <p>${data.desc}</p>`;
  content.appendChild(hdr);

  data.phases.forEach(phase => {
    const pl = document.createElement("div");
    pl.className = "phase-label";
    pl.textContent = phase.phase;
    content.appendChild(pl);

    phase.items.forEach(item => {
      const noteKey   = domain + "::" + item.topic;
      const hasNote   = !!(localStorage.getItem("note::" + noteKey) || "").trim();
      const btnId     = "notebtn_" + noteKey.replace(/[^a-z0-9]/gi, "_");
      const safeTitle = item.topic.replace(/'/g, "&#39;");
      const videosEnc = encodeURIComponent(JSON.stringify(item.videos));

      const card = document.createElement("div");
      card.className = "milestone-card";
      card.innerHTML = `
        <div class="mc-top">
          <div class="mc-title-wrap">
            <span class="mc-phase-badge badge-${phase.badge}">${phase.badge.charAt(0).toUpperCase() + phase.badge.slice(1)}</span>
            <div class="mc-topic">${item.topic}</div>
            <div class="mc-desc">${item.desc}</div>
            <div class="mc-resource">Ref: ${item.resource}</div>
          </div>
          <div class="mc-actions">
            <button class="mc-btn notes-btn${hasNote ? " has-note" : ""}" id="${btnId}"
              onclick="openNotesModal('${noteKey.replace(/'/g,"&#39;")}','${safeTitle}')">
              ${hasNote ? "Notes *" : "Notes"}
            </button>
            <button class="mc-btn" onclick="openVideoModal('${safeTitle}','${videosEnc}')">Videos</button>
            <button class="mc-btn query-btn" onclick="openQueryModal('${safeTitle}')">Ask Doubt</button>
          </div>
        </div>`;
      content.appendChild(card);

      const todo = document.createElement("div");
      todo.className = "todo-item";
      todo.onclick = function () { toggleTodo(this); };
      todo.innerHTML = `<div class="todo-check">&#10003;</div><span class="todo-text">${item.topic}</span>`;
      todoList.appendChild(todo);
    });
  });

  updateProgress();
}
window.loadDomain = loadDomain;

// ── PROGRESS ──────────────────────────
function updateProgress() {
  const items   = document.querySelectorAll(".todo-item");
  const checked = document.querySelectorAll(".todo-item.checked");
  if (!items.length) return;
  const pct = Math.round((checked.length / items.length) * 100);
  const circumference = 213.6;
  document.getElementById("circleFill").style.strokeDashoffset = circumference - (pct / 100) * circumference;
  document.getElementById("circlePercent").textContent = pct + "%";
}

function toggleTodo(el)  { el.classList.toggle("checked"); updateProgress(); }
function resetProgress() { document.querySelectorAll(".todo-item").forEach(el => el.classList.remove("checked")); updateProgress(); }
window.toggleTodo    = toggleTodo;
window.resetProgress = resetProgress;

// ── CLOSE MODAL ───────────────────────
function closeModal(e) {
  if (e.target.classList.contains("modal-overlay")) {
    closeNotesModal(); closeVideoModal(); closeQueryModal();
  }
}
window.closeModal = closeModal;

document.addEventListener("keydown", e => {
  if (e.key === "Escape") { closeNotesModal(); closeVideoModal(); closeQueryModal(); }
});