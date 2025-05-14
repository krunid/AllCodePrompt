const SHEET_URL = "https://script.google.com/macros/s/AKfycbxZUQyqdSvxXr7bassd6bXt7NAG0hbE9DLmMBSDYGkWl4j7maUHGeMqF2uNICkeUIzb/exec";

function generatePrompts() {
  const subject = document.getElementById("subject").value;
  const concept = document.getElementById("concept").value;
  const gameType = document.getElementById("gameType").value;
  const grade = document.getElementById("grade").value;
  const players = document.getElementById("players").value;
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  for (let i = 1; i <= 10; i++) {
    const promptText = \`
Prompt \${i}: 
Create a highly detailed game design prompt for Canva AI.

🎯 Subject: \${subject}
🎮 Game Concept: \${concept}
🧠 Game Type: \${gameType}
🏫 Grade Level: \${grade}
👥 Players: \${players}

Write a 500-word prompt describing a creative, engaging, and classroom-ready \${gameType} for the subject "\${subject}" aimed at students in \${grade}. The game should reflect the concept: "\${concept}", be suitable for \${players} players, and include instructions, objectives, and sample gameplay scenarios.

Make it creative, original, and suitable for Canva AI game generation — with vivid descriptions, mechanics, and imaginative details.\`.trim();

    const container = document.createElement("div");
    container.className = "bg-white p-4 rounded shadow-md border relative";

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "📋 คัดลอก Prompt นี้";
    copyBtn.className = "absolute top-2 right-2 text-sm text-indigo-600 hover:underline";
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(promptText);
      alert("คัดลอกเรียบร้อยแล้ว!");

      // ส่งไปยัง Google Sheets
      fetch(SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, concept, gameType, grade, players, prompt: promptText })
      }).catch(err => console.error("Error:", err));
    };

    const pre = document.createElement("pre");
    pre.textContent = promptText;
    pre.className = "whitespace-pre-wrap";

    container.appendChild(copyBtn);
    container.appendChild(pre);
    resultDiv.appendChild(container);
  }
}


function syncConcept() {
  const selected = document.getElementById("conceptSelect").value;
  document.getElementById("concept").value = selected;
}
