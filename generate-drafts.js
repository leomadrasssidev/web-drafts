const fs = require('fs');
const path = require('path');

const filesToReplace = [
  "designBE-archive-spine.html",
  "designBG-data-conservatory.html",
  "designBL-beacon-hall.html",
  "designBN-relay-mesh.html",
  "designBP-atlas-strip.html",
  "designBR-treaty-wall.html",
  "designBT-pilot-log.html",
  "designBX-signal-atlas.html",
  "designCA-procession.html",
  "designCD-forum-index.html",
  "designCE-axis-room.html",
  "designCH-proof-cabinet.html",
  "designCJ-paper-runway.html"
];

const fontUrls = {
  inter: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap",
  playfair: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap",
  spaceMono: "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap",
  syne: "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap",
  outfit: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700;800&display=swap"
};

const layouts = {
  centered_rich: (t) => `
    <style>
      body { margin: 0; background: ${t.bg}; color: ${t.text}; font-family: ${t.font}; overflow-x: hidden; }
      nav { display: flex; justify-content: space-between; padding: 1.5rem 4rem; border-bottom: 1px solid ${t.accent}33; }
      .logo { font-weight: 800; font-size: 1.5rem; letter-spacing: -1px; color: ${t.accent}; }
      .nav-links { display: flex; gap: 2rem; list-style: none; margin: 0; padding: 0; align-items: center; }
      .nav-links a { color: ${t.text}; text-decoration: none; opacity: 0.7; font-weight: 500; transition: 0.2s; }
      .nav-links a:hover { opacity: 1; color: ${t.accent}; }
      .cta-btn { background: ${t.accent}; color: ${t.bg}; padding: 0.6rem 1.5rem; border-radius: 2rem; font-weight: 700; text-decoration: none; }
      
      .hero { text-align: center; padding: 8rem 2rem; position: relative; }
      .hero::before { content: ''; position: absolute; top: -50%; left: 50%; transform: translateX(-50%); width: 800px; height: 800px; background: radial-gradient(circle, ${t.accent}22 0%, transparent 70%); z-index: -1; pointer-events: none; }
      .pill { display: inline-block; padding: 0.4rem 1.2rem; border-radius: 2rem; border: 1px solid ${t.accent}66; color: ${t.accent}; margin-bottom: 2rem; font-size: 0.85rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
      h1 { font-size: clamp(3.5rem, 8vw, 6.5rem); margin: 0 auto 1.5rem; line-height: 1.05; letter-spacing: -0.04em; max-width: 900px; }
      .hero p { font-size: 1.25rem; line-height: 1.6; opacity: 0.8; max-width: 600px; margin: 0 auto 3rem; }
      .btn-group { display: flex; gap: 1rem; justify-content: center; }
      .btn-primary { background: ${t.accent}; color: ${t.bg}; padding: 1rem 2.5rem; border-radius: 3rem; font-weight: 700; font-size: 1.1rem; border: none; cursor: pointer; transition: 0.2s; }
      .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 20px ${t.accent}44; }
      .btn-secondary { background: transparent; color: ${t.text}; padding: 1rem 2.5rem; border-radius: 3rem; font-weight: 600; font-size: 1.1rem; border: 1px solid ${t.text}44; cursor: pointer; transition: 0.2s; }
      .btn-secondary:hover { border-color: ${t.accent}; color: ${t.accent}; }

      .stats { display: flex; border-top: 1px solid ${t.text}22; border-bottom: 1px solid ${t.text}22; max-width: 1200px; margin: 0 auto 6rem; }
      .stat { flex: 1; padding: 3rem 2rem; text-align: center; border-right: 1px solid ${t.text}22; }
      .stat:last-child { border-right: none; }
      .stat h3 { font-size: 3rem; margin: 0; color: ${t.accent}; font-weight: 800; }
      .stat p { margin: 0.5rem 0 0; opacity: 0.6; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }

      .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; max-width: 1200px; margin: 0 auto 8rem; padding: 0 2rem; }
      .card { background: ${t.text}08; border: 1px solid ${t.text}11; padding: 3rem; border-radius: 24px; transition: 0.3s; }
      .card:hover { transform: translateY(-10px); border-color: ${t.accent}66; background: ${t.accent}11; }
      .icon { font-size: 2.5rem; margin-bottom: 1.5rem; }
      .card h3 { font-size: 1.5rem; margin: 0 0 1rem; }
      .card p { opacity: 0.7; line-height: 1.7; margin: 0 0 2rem; }
      .tag { display: inline-block; padding: 0.3rem 0.8rem; background: ${t.accent}22; color: ${t.accent}; border-radius: 1rem; font-size: 0.8rem; font-weight: 700; }
    </style>
    <nav>
      <div class="logo">Leo Madrassi</div>
      <ul class="nav-links">
        <li><a href="#">Work</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#" class="cta-btn">Hire Me</a></li>
      </ul>
    </nav>
    <section class="hero">
      <div class="pill">${t.name} Concept</div>
      <h1>${t.headline}</h1>
      <p>${t.subheadline}</p>
      <div class="btn-group">
        <button class="btn-primary">View Projects</button>
        <button class="btn-secondary">Read Manifesto</button>
      </div>
    </section>
    <section class="stats">
      <div class="stat"><h3>10+</h3><p>Years Experience</p></div>
      <div class="stat"><h3>40</h3><p>Products Launched</p></div>
      <div class="stat"><h3>99%</h3><p>Client Success</p></div>
    </section>
    <section class="cards">
      <div class="card">
        <div class="icon">⚡️</div>
        <h3>Rapid Prototyping</h3>
        <p>From concept to interactive prototype in days, not weeks. Speed without sacrificing quality.</p>
        <div class="tag">Design Engineering</div>
      </div>
      <div class="card">
        <div class="icon">🧠</div>
        <h3>Systems Thinking</h3>
        <p>Building scalable design systems that grow with your product and maintain visual consistency.</p>
        <div class="tag">Architecture</div>
      </div>
      <div class="card">
        <div class="icon">✨</div>
        <h3>Polished UI/UX</h3>
        <p>Obsessive attention to detail, micro-interactions, and motion design that delights users.</p>
        <div class="tag">Product Design</div>
      </div>
    </section>
  `,
  split_rich: (t) => `
    <style>
      body { margin: 0; background: ${t.bg}; color: ${t.text}; font-family: ${t.font}; }
      .wrapper { display: flex; min-height: 100vh; }
      .left { flex: 1.2; padding: 4rem; display: flex; flex-direction: column; }
      .right { flex: 0.8; background: ${t.accent}; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
      
      nav { display: flex; justify-content: space-between; margin-bottom: 6rem; align-items: center; }
      .logo { font-weight: 800; font-size: 1.5rem; letter-spacing: -1px; }
      .nav-links { display: flex; gap: 2rem; }
      .nav-links a { color: ${t.text}; text-decoration: none; font-weight: 600; opacity: 0.6; }
      .nav-links a:hover { opacity: 1; color: ${t.accent}; }
      
      .hero { flex: 1; display: flex; flex-direction: column; justify-content: center; }
      .eyebrow { color: ${t.accent}; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1.5rem; font-size: 0.9rem; }
      h1 { font-size: clamp(3rem, 6vw, 6rem); margin: 0 0 2rem 0; line-height: 1.05; letter-spacing: -0.03em; }
      p.lead { font-size: 1.3rem; line-height: 1.6; opacity: 0.8; max-width: 500px; margin: 0 0 3rem 0; }
      
      .actions { display: flex; gap: 1.5rem; }
      .btn { padding: 1.2rem 3rem; font-weight: 700; font-size: 1.1rem; text-decoration: none; border-radius: 0px; display: inline-block; }
      .btn-primary { background: ${t.text}; color: ${t.bg}; }
      .btn-secondary { border: 2px solid ${t.text}44; color: ${t.text}; }
      
      .right-shape { width: 150%; height: 150%; border-radius: 40%; background: ${t.bg}; opacity: 0.15; position: absolute; animation: rotate 20s linear infinite; }
      @keyframes rotate { 100% { transform: rotate(360deg); } }
      .right-content { position: relative; z-index: 10; color: ${t.bg}; padding: 3rem; }
      .right-content h2 { font-size: 3rem; margin: 0 0 1rem; }
      
      .services { padding: 6rem 4rem; background: ${t.text}05; }
      .services h2 { font-size: 3rem; margin: 0 0 4rem; }
      .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3rem; }
      .service-item { border-left: 3px solid ${t.accent}; padding-left: 2rem; }
      .service-item h3 { font-size: 1.8rem; margin: 0 0 1rem; }
      .service-item p { opacity: 0.7; line-height: 1.6; }
    </style>
    <div class="wrapper">
      <div class="left">
        <nav>
          <div class="logo">Leo Madrassi</div>
          <div class="nav-links">
            <a href="#">Index</a>
            <a href="#">Studio</a>
            <a href="#">Contact</a>
          </div>
        </nav>
        <div class="hero">
          <div class="eyebrow">${t.name}</div>
          <h1>${t.headline}</h1>
          <p class="lead">${t.subheadline} A deep dive into digital craftsmanship, pushing the boundaries of web experiences.</p>
          <div class="actions">
            <a href="#" class="btn btn-primary">Start Project</a>
            <a href="#" class="btn btn-secondary">Explore Archive</a>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-shape"></div>
        <div class="right-content">
          <h2>Creative<br>Engineering</h2>
          <p style="font-size: 1.2rem; opacity: 0.8; max-width: 300px;">Bridging the gap between ambitious design and flawless technical execution.</p>
        </div>
      </div>
    </div>
    <section class="services">
      <h2>Capabilities</h2>
      <div class="grid">
        <div class="service-item">
          <h3>Interactive WebGL</h3>
          <p>Immersive 3D experiences built directly for the browser, optimizing performance without losing visual fidelity.</p>
        </div>
        <div class="service-item">
          <h3>Design Systems</h3>
          <p>Robust, scalable, and token-based component libraries that empower teams to build faster.</p>
        </div>
        <div class="service-item">
          <h3>Technical Direction</h3>
          <p>Guiding engineering teams to adopt modern stacks, ensuring architecture aligns with business goals.</p>
        </div>
        <div class="service-item">
          <h3>Brand Identity</h3>
          <p>Translating core brand values into cohesive visual languages and digital touchpoints.</p>
        </div>
      </div>
    </section>
  `,
  editorial_rich: (t) => `
    <style>
      body { margin: 0; background: ${t.bg}; color: ${t.text}; font-family: ${t.font}; }
      header { border-bottom: 1px solid ${t.text}44; padding: 1.5rem 3rem; display: flex; justify-content: space-between; text-transform: uppercase; letter-spacing: 2px; font-size: 0.9rem; font-weight: 700; }
      
      .main-grid { display: grid; grid-template-columns: 3fr 1fr; border-bottom: 1px solid ${t.text}44; min-height: 80vh; }
      
      .content { padding: 6rem 4rem; border-right: 1px solid ${t.text}44; }
      .meta { color: ${t.accent}; font-weight: bold; margin-bottom: 2rem; display: block; }
      h1 { font-size: clamp(4rem, 8vw, 8rem); margin: 0 0 2rem; line-height: 0.9; font-weight: 400; }
      p.dropcap::first-letter { font-size: 5rem; float: left; line-height: 0.8; padding-right: 1rem; color: ${t.accent}; }
      p.large { font-size: 1.5rem; line-height: 1.8; opacity: 0.9; max-width: 800px; }
      
      .sidebar { padding: 4rem 3rem; background: ${t.text}05; }
      .sidebar h3 { font-size: 1.2rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 2rem; border-bottom: 1px solid ${t.text}44; padding-bottom: 1rem; }
      .side-nav { list-style: none; padding: 0; margin: 0 0 4rem; }
      .side-nav li { margin-bottom: 1rem; }
      .side-nav a { color: ${t.text}; text-decoration: none; font-size: 1.2rem; transition: 0.2s; }
      .side-nav a:hover { color: ${t.accent}; padding-left: 0.5rem; }
      
      .info-block { margin-bottom: 3rem; }
      .info-block span { display: block; opacity: 0.5; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; }
      .info-block strong { font-size: 1.1rem; }
      
      .gallery { display: grid; grid-template-columns: repeat(3, 1fr); padding: 4rem; gap: 2rem; }
      .gallery-img { aspect-ratio: 4/5; background: ${t.text}11; position: relative; overflow: hidden; }
      .gallery-img::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, ${t.bg}, transparent); opacity: 0.8; }
      .gallery-caption { position: absolute; bottom: 1.5rem; left: 1.5rem; font-weight: bold; font-size: 1.2rem; z-index: 10; }
    </style>
    <header>
      <div>Leo Madrassi — ${t.name}</div>
      <div>Vol. 01 / Selected Works</div>
    </header>
    <div class="main-grid">
      <div class="content">
        <span class="meta">Independent Design Practice</span>
        <h1>${t.headline}</h1>
        <p class="dropcap large">${t.subheadline} This approach focuses on rigorous typography, stark contrasts, and meaningful negative space to let the work speak for itself.</p>
        <div style="margin-top: 4rem;">
           <a href="#" style="background: ${t.accent}; color: ${t.bg}; padding: 1rem 3rem; text-decoration: none; font-weight: bold; display: inline-block;">View Case Studies</a>
        </div>
      </div>
      <div class="sidebar">
        <h3>Directory</h3>
        <ul class="side-nav">
          <li><a href="#">01. Manifesto</a></li>
          <li><a href="#">02. Archive</a></li>
          <li><a href="#">03. Journal</a></li>
          <li><a href="#">04. Contact</a></li>
        </ul>
        
        <div class="info-block">
          <span>Current Status</span>
          <strong>Accepting Projects</strong>
        </div>
        <div class="info-block">
          <span>Location</span>
          <strong>Global / Remote</strong>
        </div>
      </div>
    </div>
    <div class="gallery">
      <div class="gallery-img"><div class="gallery-caption">Brand Identity</div></div>
      <div class="gallery-img"><div class="gallery-caption">Digital Platforms</div></div>
      <div class="gallery-img"><div class="gallery-caption">Art Direction</div></div>
    </div>
  `
};

const themes = [
  { name: "Brutalist Mono", layout: "editorial_rich", fontKey: "spaceMono", font: "'Space Mono', monospace", bg: "#000000", text: "#d1d5db", accent: "#ef4444", headline: "LEO MADRASSI // SYS", subheadline: "Unapologetic design and raw code." },
  { name: "Neon Nights", layout: "centered_rich", fontKey: "syne", font: "'Syne', sans-serif", bg: "#0f172a", text: "#f8fafc", accent: "#8b5cf6", headline: "Future Forward", subheadline: "Pushing boundaries in digital experiences." },
  { name: "Industrial Core", layout: "editorial_rich", fontKey: "inter", font: "'Inter', sans-serif", bg: "#27272a", text: "#a1a1aa", accent: "#f4f4f5", headline: "Industrial Grade", subheadline: "Robust solutions engineered by Leo Madrassi." },
  { name: "Ocean Depth", layout: "split_rich", fontKey: "outfit", font: "'Outfit', sans-serif", bg: "#082f49", text: "#e0f2fe", accent: "#0ea5e9", headline: "Deep Dives.", subheadline: "Exploring the depths of interactive design." },
  { name: "Monochrome Vault", layout: "editorial_rich", fontKey: "spaceMono", font: "'Space Mono', monospace", bg: "#171717", text: "#ffffff", accent: "#404040", headline: "The Vault", subheadline: "Archived projects of Leo Madrassi." },
  { name: "Retro Wave", layout: "centered_rich", fontKey: "spaceMono", font: "'Space Mono', monospace", bg: "#2e1065", text: "#fbcfe8", accent: "#d946ef", headline: "SYNTH//WAVE", subheadline: "Nostalgic futures built by Leo Madrassi." },
  { name: "Acid Green", layout: "centered_rich", fontKey: "syne", font: "'Syne', sans-serif", bg: "#000000", text: "#bef264", accent: "#84cc16", headline: "High Contrast", subheadline: "Loud, proud, and accessible." },
  { name: "Art Deco", layout: "editorial_rich", fontKey: "playfair", font: "'Playfair Display', serif", bg: "#111827", text: "#fef3c7", accent: "#d97706", headline: "Golden Age", subheadline: "Timeless elegance in modern code." },
  { name: "Cosmic Ray", layout: "split_rich", fontKey: "inter", font: "'Inter', sans-serif", bg: "#0f172a", text: "#e2e8f0", accent: "#38bdf8", headline: "Beyond Orbit.", subheadline: "Cosmic scale digital products." },
  { name: "Steampunk", layout: "split_rich", fontKey: "playfair", font: "'Playfair Display', serif", bg: "#292524", text: "#fdba74", accent: "#b45309", headline: "Brass & Code", subheadline: "Mechanics of the modern web." },
  { name: "Glitch Art", layout: "centered_rich", fontKey: "syne", font: "'Syne', sans-serif", bg: "#000000", text: "#ffffff", accent: "#ec4899", headline: "SYSTEM ERROR", subheadline: "Embracing the chaos of the internet." },
  { name: "Neon Grid", layout: "centered_rich", fontKey: "spaceMono", font: "'Space Mono', monospace", bg: "#020617", text: "#cbd5e1", accent: "#14b8a6", headline: "Matrix", subheadline: "Structured data and beautiful interfaces." },
  { name: "Dark academia", layout: "editorial_rich", fontKey: "playfair", font: "'Playfair Display', serif", bg: "#1e1b4b", text: "#e0e7ff", accent: "#4f46e5", headline: "Scholarly Pursuits", subheadline: "Deep research and thoughtful execution." }
];

let overviewLinksHTML = '';

themes.forEach((theme, index) => {
  const fileName = filesToReplace[index];
  const filePath = path.join(__dirname, fileName);
  
  const fontLink = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${fontUrls[theme.fontKey]}" rel="stylesheet">`;

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Leo Madrassi - ${theme.name}</title>
${fontLink}
</head>
<body>
${layouts[theme.layout](theme)}
</body>
</html>`;

  fs.writeFileSync(filePath, htmlContent, 'utf8');
  console.log(`Generated ${fileName} (${theme.name})`);
});
