const fs = require('fs');
const path = require('path');

const hiddenFiles = [
  "designCI-loop-theater.html","designCG-chapter-rail.html","designCL-thesis-mirror.html",
  "designCM-horizon-file.html","designCN-charter-desk.html","designCC-operator-journal.html",
  "designCK-dispatch-grid.html","designCF-station-map.html","designBY-frame-sequence.html",
  "designBU-meridian-board.html","designBZ-north-star-room.html","designBW-registry-house.html",
  "designCB-vault-entry.html","designBS-current-room.html","designBQ-proof-gallery.html",
  "designBM-foundry-table.html","designBO-window-stack.html","designBK-quiet-terminal.html",
  "designBI-crown-index.html","designBF-plaza-screen.html","designBH-studio-ledger.html",
  "designBD-signal-chapel.html","designBC-meridian-desk.html","designAW-treaty-table.html",
  "designAY-greenhouse.html","designAZ-index-folio.html","designAU-passport-studio.html",
  "designAT-auction-floor.html","designAL-magazine-cover.html","designAR-cabinet-view.html",
  "designAM-atlas-forum.html","designAN-monograph-grid.html","designAH-dossier-file.html",
  "designAI-expedition-map.html","designAE-lab-wall.html","designAD-mobile-shell.html",
  "designZ-split-decision.html","designAB-operating-manual.html","designW-conversation-first.html",
  "designV-story-board.html","designR-paper-pulse.html","designJ-solstice-flow.html",
  "designO-bloom-circuit.html","designP-delta-chrome.html","design5-neo-pastel.html",
  "design3-editorial-minimal.html","designI-monolith-signal.html","https://www.digitalocean.com",
  "designBV-pattern-atlas.html","designBJ-mission-deck.html","design1-brutalist-dark.html",
  "design4-retro-terminal.html","designAQ-catwalk-system.html","designBB-antechamber.html",
  "designBA-obligation-grid.html","designAS-observatory.html","designAV-prism-corridor.html",
  "designAX-switchboard.html","designAJ-timeline-machine.html","designAK-broadcast-wall.html",
  "designAO-salon-stage.html","designAP-ledger-room.html","designAF-terminal-city.html",
  "designAC-pitch-deck.html","designU-control-room.html","designN-carbon-rail.html",
  "designT-velvet-arc.html","designX-metro-cards.html","designQ-orbit-ribbon.html",
  "designY-radial-nav.html","designS-night-shift.html","designK-vector-field.html",
  "designA-vela-cosmic.html"
];

// 1. Delete files
hiddenFiles.forEach(file => {
  if (file.endsWith('.html')) {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('Deleted', file);
    }
  }
});

// 2. Clean drafts-overview.html
const overviewPath = path.join(__dirname, 'drafts-overview.html');
let overviewHtml = fs.readFileSync(overviewPath, 'utf8');

hiddenFiles.forEach(file => {
  if (file.endsWith('.html')) {
    const regex = new RegExp(`^\\s*<a href="${file}">[\\s\\S]*?<\\/a>\\s*$`, 'gm');
    overviewHtml = overviewHtml.replace(regex, '');
  }
});

fs.writeFileSync(overviewPath, overviewHtml, 'utf8');
console.log('Updated drafts-overview.html');

// 3. Clean generate-drafts.js
const genPath = path.join(__dirname, 'generate-drafts.js');
let genJs = fs.readFileSync(genPath, 'utf8');

// The script has two arrays: filesToReplace and themes.
// Let's use eval safely by just extracting the arrays text
const filesMatch = genJs.match(/const filesToReplace = \[\s*([\s\S]*?)\s*\];/);
const themesMatch = genJs.match(/const themes = \[\s*([\s\S]*?)\s*\];/);

let filesToReplace = [];
let themes = [];

if (filesMatch) {
  // Use a dirty trick to parse the JS array definition
  filesToReplace = eval(`[${filesMatch[1]}]`);
}
if (themesMatch) {
  themes = eval(`[${themesMatch[1]}]`);
}

const newFilesToReplace = [];
const newThemes = [];

filesToReplace.forEach((file, index) => {
    if (!hiddenFiles.includes(file)) {
        newFilesToReplace.push(file);
        newThemes.push(themes[index]);
    }
});

// Format the arrays back to JS
const formatThemes = newThemes.map(t => {
    return `  { name: "${t.name}", layout: "${t.layout}", fontKey: "${t.fontKey}", font: "${t.font}", bg: "${t.bg}", text: "${t.text}", accent: "${t.accent}", headline: "${t.headline}", subheadline: "${t.subheadline}" }`;
}).join(',\n');

const formatFiles = newFilesToReplace.map(f => `  "${f}"`).join(',\n');

// Replace in genJs
genJs = genJs.replace(/const filesToReplace = \[\s*[\s\S]*?\s*\];/, `const filesToReplace = [\n${formatFiles}\n];`);
genJs = genJs.replace(/const themes = \[\s*[\s\S]*?\s*\];/, `const themes = [\n${formatThemes}\n];`);

fs.writeFileSync(genPath, genJs, 'utf8');
console.log('Updated generate-drafts.js');
