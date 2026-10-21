// aws-bridge.js — Comprehensive Multilingual Translation, Audio Accessibility & AWS Integration
import { isAwsEnabled, api } from "./aws.js";

// ── COMPREHENSIVE MULTILINGUAL DICTIONARY ─────────────────────────────
const DICT = {
  // Brand & Nav
  "Plan Your": { hi: "अपनी योजना बनाएं", ta: "திட்டமிடுங்கள்" },
  "Learning Roadmap": { hi: "सीखने की रूपरेखा", ta: "கற்றல் பாதை" },
  "Dashboard": { hi: "डैशबोर्ड", ta: "டாஷ்போர்டு" },
  "Resources": { hi: "संसाधन", ta: "வளங்கள்" },
  "Community": { hi: "समुदाय", ta: "சமூகம்" },
  "About": { hi: "परिचय", ta: "பற்றி" },
  "Learning Roadmap Portal": { hi: "लर्निंग रोडमैप पोर्टल", ta: "கற்றல் பாதை தளம்" },

  // Login form & Stats
  "Create Your Profile": { hi: "अपना प्रोफ़ाइल बनाएं", ta: "உங்கள் சுயவிவரத்தை உருவாக்கவும்" },
  "Your personalized dashboard awaits..!": { hi: "आपका व्यक्तिगत डैशबोर्ड प्रतीक्षा कर रहा है..!", ta: "உங்கள் தனிப்பயனாக்கப்பட்ட டாஷ்போர்டு தயார்..!" },
  "Full Name": { hi: "पूरा नाम", ta: "முழு பெயர்" },
  "Email Address": { hi: "ईमेल पता", ta: "மின்னஞ்சल முகவரி" },
  "Phone Number": { hi: "फ़ोन नंबर", ta: "தொலைபேசி எண்" },
  "Access Dashboard": { hi: "डैशबोर्ड खोलें", ta: "டாஷ்போர்டை அணுகவும்" },
  "Domains": { hi: "डोमेन", ta: "துறைகள்" },
  "Tracks": { hi: "ट्रैक", ta: "வழிகள்" },
  "Free": { hi: "मुफ़्त", ta: "இலவசம்" },
  "Access": { hi: "पहुंच", ta: "அணுகல்" },
  "We save your name, email and phone to run this portal.": {
    hi: "हम इस पोर्टल को चलाने के लिए आपका नाम, ईमेल और फोन सहेजते हैं।",
    ta: "இந்த தளத்தை இயக்க உங்கள் பெயர், மின்னஞ்சல் மற்றும் தொலைபேசி எண்ணை சேமிக்கிறோம்."
  },

  // Domains & Track Headers
  "Web Development": { hi: "वेब विकास (Web Dev)", ta: "வலை மேம்பாடு (Web Dev)" },
  "Artificial Intelligence": { hi: "कृत्रिम बुद्धिमत्ता (AI)", ta: "செயற்கை நுண்ணறிவு (AI)" },
  "Cybersecurity": { hi: "साइबर सुरक्षा (Cyber)", ta: "சைபர் பாதுகாப்பு (Cyber)" },
  "Data Science": { hi: "डेटा विज्ञान (Data Science)", ta: "தரவு அறிவியல்" },
  "Mobile App Development": { hi: "मोबाइल ऐप विकास", ta: "மொபைல் ஆப் வளர்ச்சி" },
  "Master's Track": { hi: "मास्टर्स ट्रैक", ta: "மாஸ்டர்ஸ் படிப்பு" },
  "Roadmap Progress": { hi: "प्रगति", ta: "முன்னேற்றம்" },
  "Reset": { hi: "रीसेट", ta: "மீட்டமை" },
  "Reset Progress": { hi: "प्रगति रीसेट करें", ta: "மீட்டமைக்கவும்" },

  // Action Buttons & Modals
  "Notes": { hi: "नोट्स", ta: "குறிப்புகள்" },
  "Notes *": { hi: "नोट्स *", ta: "குறிப்புகள் *" },
  "Videos": { hi: "वीडियो", ta: "வீடியோக்கள்" },
  "Ask Doubt": { hi: "संदेह पूछें", ta: "சந்தேகம் கேளுங்கள்" },
  "Ask a Doubt": { hi: "संदेह पूछें", ta: "சந்தேகம் கேளுங்கள்" },
  "Submit Doubt": { hi: "संदेह भेजें", ta: "சந்தேகம் சமர்ப்பிக்கவும்" },
  "Your Name": { hi: "आपका नाम", ta: "உங்கள் பெயர்" },
  "Your Question": { hi: "आपका प्रश्न", ta: "உங்கள் கேள்வி" },
  "Describe your doubt clearly...": { hi: "अपने संदेह का स्पष्ट वर्णन करें...", ta: "உங்கள் சந்தேகத்தை தெளிவாக விவரிக்கவும்..." },
  "Your doubt will be reviewed by a mentor and answered as soon as possible.": {
    hi: "आपके संदेह की एक संरक्षक द्वारा समीक्षा की जाएगी और जल्द से जल्द उत्तर दिया जाएगा।",
    ta: "உங்கள் சந்தேகம் ஒரு வழிகாட்டியால் மதிப்பாய்வு செய்யப்பட்டு விரைவில் பதிலளிக்கப்படும்."
  },
  "Pick a note colour": { hi: "नोट का रंग चुनें", ta: "குறிப்பு நிறத்தை தேர்வு செய்யவும்" },
  "Save Note": { hi: "नोट सहेजें", ta: "குறிப்பை சேமிக்கவும்" },
  "Video Resources": { hi: "वीडियो संसाधन", ta: "வீடியோ வளங்கள்" },

  // Phase badges
  "Beginner": { hi: "शुरुआती", ta: "தொடக்க நிலை" },
  "Intermediate": { hi: "मध्यम", ta: "இடைநிலை" },
  "Advanced": { hi: "उन्नत", ta: "மேம்பட்ட நிலை" },
  "Research": { hi: "अनुसंधान", ta: "ஆராய்ச்சி" },

  // Phase titles
  "Phase 1 — Foundations": { hi: "चरण 1 — मूल बातें", ta: "பகுதி 1 — அடிப்படைகள்" },
  "Phase 2 — Core Programming": { hi: "चरण 2 — मुख्य प्रोग्रामिंग", ta: "பகுதி 2 — முக்கிய நிரலாக்கம்" },
  "Phase 3 — Advanced Frameworks": { hi: "चरण 3 — उन्नत फ्रेमवर्क", ta: "பகுதி 3 — மேம்பட்ட கட்டமைப்புகள்" },
  "Phase 4 — Capstone & Research": { hi: "चरण 4 — कैपस्टोन और शोध", ta: "பகுதி 4 — இறுதி திட்டம் & ஆராய்ச்சி" },
  "Phase 1 — Mathematical Foundations": { hi: "चरण 1 — गणितीय नींव", ta: "பகுதி 1 — கணித அடிப்படைகள்" },
  "Phase 2 — Machine Learning Core": { hi: "चरण 2 — मशीन लर्निंग कोर", ta: "பகுதி 2 — இயந்திர கற்றல் மையம்" },
  "Phase 3 — Deep Learning & Neural Networks": { hi: "चरण 3 — डीप लर्निंग और न्यूरल नेटवर्क", ta: "பகுதி 3 — ஆழ்ந்த கற்றல்" },
  "Phase 4 — LLMs & Advanced AI Research": { hi: "चरण 4 — एलएलएम और उन्नत एआई अनुसंधान", ta: "பகுதி 4 — நவீன AI ஆராய்ச்சி" },
  "Phase 1 — Networking & Linux Foundations": { hi: "चरण 1 — नेटवर्किंग और लिनक्स मूल बातें", ta: "பகுதி 1 — நெட்வொர்க்கிங் & லினக்ஸ்" },
  "Phase 2 — Security Fundamentals & Cryptography": { hi: "चरण 2 — सुरक्षा बुनियादी बातें और क्रिप्टोग्राफी", ta: "பகுதி 2 — பாதுகாப்பு அடிப்படைகள்" },
  "Phase 3 — Penetration Testing & Ethical Hacking": { hi: "चरण 3 — पेनेट्रेशन टेस्टिंग और एथिकल हैकिंग", ta: "பகுதி 3 — எத்திகல் ஹேக்கிங்" },
  "Phase 4 — Advanced Defense & Threat Intelligence": { hi: "चरण 4 — उन्नत रक्षा और खतरे की खुफिया जानकारी", ta: "பகுதி 4 — நவீன இணைய பாதுகாப்பு" },
  "Phase 1 — Python & Data Analysis Foundations": { hi: "चरण 1 — पायथन और डेटा विश्लेषण", ta: "பகுதி 1 — பைதான் & தரவு பகுப்பாய்வு" },
  "Phase 2 — Statistical Modeling & Machine Learning": { hi: "चरण 2 — सांख्यिकीय मॉडलिंग और मशीन लर्निंग", ta: "பகுதி 2 — புள்ளியியல் மாதிரி" },
  "Phase 3 — Big Data & Data Engineering": { hi: "चरण 3 — बिग डेटा और डेटा इंजीनियरिंग", ta: "பகுதி 3 — பிக் டேட்டா" },
  "Phase 4 — Advanced ML & Research": { hi: "चरण 4 — उन्नत एमएल और अनुसंधान", ta: "பகுதி 4 — மேம்பட்ட ML ஆராய்ச்சி" },
  "Phase 1 — Mobile Fundamentals": { hi: "चरण 1 — मोबाइल मूल बातें", ta: "பகுதி 1 — மொபைல் அடிப்படைகள்" },
  "Phase 2 — Cross-Platform Frameworks": { hi: "चरण 2 — क्रॉस-प्लेटफ़ॉर्म फ्रेमवर्क", ta: "பகுதி 2 — கிராஸ்-பிளாட்பார்ம் கட்டமைப்புகள்" },
  "Phase 3 — Native Architecture & State": { hi: "चरण 3 — नेटिव आर्किटेक्चर और स्टेट", ta: "பகுதி 3 — நேட்டிவ் கட்டமைப்பு" },
  "Phase 4 — Deployment & App Store Optimization": { hi: "चरण 4 — डिप्लॉयमेंट और ऐप स्टोर ऑप्टिमाइज़ेशन", ta: "பகுதி 4 — ஆப் ஸ்டோர் வெளியீடு" }
};

let currentLang = localStorage.getItem("r2m_language") || "en";
let isSpeaking = false;

// ── AUDIO ACCESSIBILITY ENGINE (AMAZON POLLY STYLE) ──────────────────
function speakText(text, lang) {
  if (!('speechSynthesis' in window)) return;

  if (isSpeaking) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    updateAudioBtnState(false);
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  if (lang === "hi") {
    utterance.lang = "hi-IN";
  } else if (lang === "ta") {
    utterance.lang = "ta-IN";
  } else {
    utterance.lang = "en-IN";
  }

  utterance.onstart = () => {
    isSpeaking = true;
    updateAudioBtnState(true);
  };
  utterance.onend = () => {
    isSpeaking = false;
    updateAudioBtnState(false);
  };
  utterance.onerror = () => {
    isSpeaking = false;
    updateAudioBtnState(false);
  };

  window.speechSynthesis.speak(utterance);
}

function updateAudioBtnState(playing) {
  const btn = document.getElementById("r2mAudioBtn");
  if (!btn) return;
  if (playing) {
    btn.innerHTML = `⏹️ Stop`;
    btn.style.background = "#e53e3e";
  } else {
    const label = currentLang === "hi" ? "🔊 ऑडियो सुनें" : (currentLang === "ta" ? "🔊 கேளுங்கள்" : "🔊 Listen to Overview");
    btn.innerHTML = label;
    btn.style.background = "#3b6fd4";
  }
}

function injectAudioButton() {
  const headerTop = document.querySelector(".domain-header-top");
  if (headerTop && !document.getElementById("r2mAudioBtn")) {
    const btn = document.createElement("button");
    btn.id = "r2mAudioBtn";
    btn.style.cssText = `
      background: #3b6fd4;
      color: #ffffff;
      border: none;
      border-radius: 20px;
      padding: 6px 14px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      margin-left: 14px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      box-shadow: 0 2px 6px rgba(59, 111, 212, 0.4);
    `;
    const label = currentLang === "hi" ? "🔊 ऑडियो सुनें" : (currentLang === "ta" ? "🔊 கேளுங்கள்" : "🔊 Listen to Overview");
    btn.innerHTML = label;

    btn.onclick = () => {
      const title = document.querySelector(".domain-header h2")?.textContent || "";
      const desc = document.querySelector(".domain-header p")?.textContent || "";
      const fullText = `${title}. ${desc}`;
      speakText(fullText, currentLang);
    };

    headerTop.appendChild(btn);
  }
}

// ── DOM TRANSLATION ENGINE ──────────────────────────────────────────
function translateDom(lang) {
  currentLang = lang;
  localStorage.setItem("r2m_language", lang);

  const targets = [
    document.getElementById("formPage"),
    document.getElementById("mainPage"),
    document.getElementById("notesModal"),
    document.getElementById("videoModal"),
    document.getElementById("queryModal")
  ].filter(Boolean);

  targets.forEach(container => {
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toLowerCase();
          if (tag === "script" || tag === "style" || parent.id === "r2mLangSelect" || parent.id === "r2mAudioBtn") {
            return NodeFilter.FILTER_REJECT;
          }
          const text = node.nodeValue.trim();
          return text.length > 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      }
    );

    const nodesToReplace = [];
    while (walker.nextNode()) {
      nodesToReplace.push(walker.currentNode);
    }

    nodesToReplace.forEach(node => {
      const parent = node.parentElement;
      if (!parent) return;

      if (!parent.hasAttribute("data-orig-text")) {
        parent.setAttribute("data-orig-text", node.nodeValue.trim());
      }
      const origText = parent.getAttribute("data-orig-text");

      if (lang === "en") {
        node.nodeValue = origText;
      } else if (DICT[origText] && DICT[origText][lang]) {
        node.nodeValue = DICT[origText][lang];
      }
    });
  });

  // Translate placeholders
  const placeholders = [
    { id: "name", en: "Enter your name", hi: "अपना नाम दर्ज करें", ta: "உங்கள் பெயரை உள்ளிடவும்" },
    { id: "email", en: "Enter your mail id", hi: "अपनी ईमेल आईडी दर्ज करें", ta: "உங்கள் மின்னஞ்சலை உள்ளிடவும்" },
    { id: "phone", en: "Enter your mobile number", hi: "अपना मोबाइल नंबर दर्ज करें", ta: "உங்கள் மொபைல் எண்ணை உள்ளிடவும்" },
    { id: "queryName", en: "Enter your name", hi: "अपना नाम दर्ज करें", ta: "உங்கள் பெயரை உள்ளிடவும்" },
    { id: "queryText", en: "Describe your doubt clearly...", hi: "अपने संदेह का स्पष्ट वर्णन करें...", ta: "உங்கள் சந்தேகத்தை தெளிவாக விவரிக்கவும்..." },
    { id: "notesArea", en: "Write your notes here...", hi: "अपने नोट्स यहाँ लिखें...", ta: "உங்கள் குறிப்புகளை இங்கே எழுதுங்கள்..." }
  ];

  placeholders.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) el.placeholder = lang === "en" ? item.en : (item[lang] || item.en);
  });

  // Update Welcome message
  const welcomeEl = document.getElementById("welcomeMsg");
  const savedName = sessionStorage.getItem("r2m_name") || "";
  if (welcomeEl && savedName) {
    const prefix = lang === "hi" ? "नमस्ते" : (lang === "ta" ? "வணக்கம்" : "Hello");
    welcomeEl.textContent = `${prefix}, ${savedName.split(" ")[0]}`;
  }

  // Update audio button label if present
  if (document.getElementById("r2mAudioBtn")) {
    updateAudioBtnState(isSpeaking);
  }
}

// Intercept window.loadDomain to inject audio button & re-translate on track change
const originalLoadDomain = window.loadDomain;
if (typeof originalLoadDomain === "function") {
  window.loadDomain = function(domain) {
    originalLoadDomain(domain);
    setTimeout(() => {
      injectAudioButton();
      translateDom(currentLang);
    }, 60);
  };
}

// Inject language switcher dropdown ONLY in header
function injectLanguageSelector() {
  const selectHtml = `
    <select id="r2mLangSelect" style="
      background: var(--bg-card, #1a2236);
      color: var(--text-primary, #e2e8f0);
      border: 1px solid var(--border-color, #2d3748);
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      margin-right: 12px;
      outline: none;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    ">
      <option value="en" ${currentLang === "en" ? "selected" : ""}>🌐 English</option>
      <option value="hi" ${currentLang === "hi" ? "selected" : ""}>🌐 हिंदी (Hindi)</option>
      <option value="ta" ${currentLang === "ta" ? "selected" : ""}>🌐 தமிழ் (Tamil)</option>
    </select>
  `;

  const headerRight = document.querySelector(".header-right");
  if (headerRight && !document.getElementById("r2mLangSelect")) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = selectHtml;
    headerRight.insertBefore(wrapper.firstElementChild, headerRight.firstChild);

    const s1 = document.getElementById("r2mLangSelect");
    if (s1) {
      s1.addEventListener("change", (e) => {
        translateDom(e.target.value);
      });
    }
  }

  translateDom(currentLang);
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  injectLanguageSelector();
} else {
  window.addEventListener("DOMContentLoaded", injectLanguageSelector);
}

// ── AWS BACKEND INTERCEPTORS (PRESERVED 100%) ──────────────────────────────
const originalValidateForm = window.validateForm;
const originalSubmitQuery  = window.submitQuery;

if (isAwsEnabled) {
  console.log("⚡ AWS Mode Active: Routing submissions to AWS API Gateway + DynamoDB");

  window.validateForm = async function () {
    const name  = (document.getElementById("name")?.value || "").trim();
    const email = (document.getElementById("email")?.value || "").trim();
    const phone = (document.getElementById("phone")?.value || "").trim();
    const error = document.getElementById("error");
    const emailPat = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/i;

    if (name.length < 3) {
      if (error) error.textContent = "Name must be at least 3 characters.";
      return;
    }
    if (!emailPat.test(email)) {
      if (error) error.textContent = "Please enter a valid email address.";
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      if (error) error.textContent = "Phone must be exactly 10 digits.";
      return;
    }
    if (error) error.textContent = "";

    try {
      await api("POST", "/users", { name, email, phone });
      console.log("✅ User registered successfully on AWS DynamoDB");
    } catch (err) {
      console.warn("AWS user registration error, attempting fallback to Firebase:", err);
      if (typeof originalValidateForm === "function") {
        return originalValidateForm();
      }
    }

    const fp = document.getElementById("formPage");
    if (fp) {
      fp.style.transition = "opacity .4s";
      fp.style.opacity = "0";
      setTimeout(() => {
        fp.style.display = "none";
        const mp = document.getElementById("mainPage");
        if (mp) {
          mp.style.display = "block";
          mp.style.opacity = "0";
          mp.style.transition = "opacity .4s";
          setTimeout(() => (mp.style.opacity = "1"), 10);
        }
      }, 380);
    }

    const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    const avatarEl = document.getElementById("userAvatar");
    const welcomeEl = document.getElementById("welcomeMsg");
    if (avatarEl) avatarEl.textContent = initials;
    sessionStorage.setItem("r2m_name", name);
    setTimeout(() => {
      injectAudioButton();
      translateDom(currentLang);
    }, 100);
  };

  window.submitQuery = async function () {
    const textEl = document.getElementById("queryText");
    const nameEl = document.getElementById("queryName");
    const msgEl  = document.getElementById("queryMsg");

    const text = (textEl?.value || "").trim();
    if (!text) return;
    const name = (nameEl?.value || "").trim() || "Anonymous";

    const modalTitle = document.getElementById("queryModalTitle")?.textContent || "";
    const topic = modalTitle.replace(/^.*?—\s*/, "") || "General";

    try {
      await api("POST", "/doubts", { name, topic, question: text });
      if (msgEl) {
        msgEl.textContent = "Submitted to AWS! Mentor notified via email.";
        msgEl.style.color = "";
        msgEl.style.display = "inline";
      }
      if (textEl) textEl.value = "";
      if (nameEl) nameEl.value = "";
    } catch (err) {
      console.warn("AWS doubt submission error, falling back to Firebase:", err);
      if (typeof originalSubmitQuery === "function") {
        return originalSubmitQuery();
      }
      if (msgEl) {
        msgEl.textContent = "Could not submit. Please try again.";
        msgEl.style.color = "#e06060";
        msgEl.style.display = "inline";
      }
    }

    if (msgEl) {
      setTimeout(() => { msgEl.style.display = "none"; }, 3000);
    }
  };
}
