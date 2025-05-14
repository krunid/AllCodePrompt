
let allPrompts = [];

async function fetchData() {
  const res = await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec");
  const data = await res.json();
  allPrompts = data;
  populateFilters(data);
  renderPrompts(data);
}

function populateFilters(data) {
  const subjectSet = new Set();
  const levelSet = new Set();

  data.forEach(d => {
    subjectSet.add(d.Subject);
    levelSet.add(d.Level);
  });

  const subjectSel = document.getElementById("filterSubject");
  const levelSel = document.getElementById("filterLevel");

  subjectSet.forEach(sub => {
    const opt = document.createElement("option");
    opt.value = sub;
    opt.textContent = sub;
    subjectSel.appendChild(opt);
  });

  levelSet.forEach(lv => {
    const opt = document.createElement("option");
    opt.value = lv;
    opt.textContent = lv;
    levelSel.appendChild(opt);
  });
}

function filterPrompts() {
  const subject = document.getElementById("filterSubject").value;
  const level = document.getElementById("filterLevel").value;
  const filtered = allPrompts.filter(p => {
    return (!subject || p.Subject === subject) && (!level || p.Level === level);
  });
  renderPrompts(filtered);
}

function renderPrompts(data) {
  const container = document.getElementById("promptContainer");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p class='text-gray-500'>ไม่พบข้อมูล</p>";
    return;
  }

  data.forEach((p, i) => {
    const box = document.createElement("div");
    box.className = "bg-white border border-gray-200 shadow rounded-lg p-4";
    box.innerHTML = `
      <p><strong>Prompt #${i + 1}</strong></p>
      <p><strong>รายวิชา:</strong> ${p.Subject}</p>
      <p><strong>ระดับชั้น:</strong> ${p.Level}</p>
      <p><strong>แนวเกม:</strong> ${p.Concept}</p>
      <p><strong>ประเภทเกม:</strong> ${p.GameType}</p>
      <p><strong>จำนวนผู้เล่น:</strong> ${p.Players}</p>
      <textarea class="w-full mt-2 p-2 border rounded" rows="8">${p.Prompt}</textarea>
    `;
    container.appendChild(box);
  });
}

fetchData();
