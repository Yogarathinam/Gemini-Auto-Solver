let autoObserver;

function startAutoSolve() {
  if (autoObserver) {
    console.log("⚠️ Auto-solver is already running!");
    return;
  }

  let lastQuestion = "";

  autoObserver = new MutationObserver(async () => {
    const questionEl = document.querySelector('.ql-editor.t-text-neutral-1');
    if (!questionEl) return;

    // 🧠 Extract question text
    const questionText = questionEl.innerText.trim();

    // 💻 Extract any embedded code snippet (ACE editor)
    const codeSnippet = [...document.querySelectorAll('.ace_line')]
      .map(line => line.innerText.trim())
      .join(' ')
      .trim();

    // 📜 Combine question + code (if exists)
    const fullQuestion = codeSnippet
      ? `${questionText}\n\nCode:\n${codeSnippet}`
      : questionText;

    if (fullQuestion === lastQuestion || !fullQuestion) return;
    lastQuestion = fullQuestion;

    // 🧩 Extract clean options (handles multi-line)
    const options = [...document.querySelectorAll('[id^="tt-option-"]')]
      .map(opt => opt.innerText.replace(/\s+/g, " ").trim())
      .filter(opt => opt.length > 0);

    console.log("🧠 New question detected:", fullQuestion);
    console.log("📋 Options:", options);

    try {
      // 🚀 Send question + options to backend
      const res = await fetch("http://127.0.0.1:5000/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: fullQuestion, options })
      });

      const result = await res.json();
      console.log("🤖 Gemini response:", result);

      // 🔢 Extract numeric index
      const index = parseInt(result.index?.match(/\d+/)?.[0] ?? -1);

      if (!isNaN(index) && index >= 0 && index < options.length) {
        const target = document.querySelector(`#tt-option-${index}`);
        if (target) {
          target.click();
          console.log(`✅ Clicked option #${index}:`, options[index]);
        } else {
          console.warn(`⚠️ Option element not found for index ${index}`);
        }
      } else {
        console.warn("⚠️ Invalid or no index returned by Gemini.");
      }
    } catch (err) {
      console.error("❌ Error while solving question:", err);
    }
  });

  // 🕵️ Observe for question updates
  autoObserver.observe(document.body, { childList: true, subtree: true });
  console.log("👀 Auto-solver started — waiting for new questions...");
}

function stopAutoSolve() {
  if (autoObserver) {
    autoObserver.disconnect();
    autoObserver = null;
    console.log("⏹️ Auto-solver stopped.");
  } else {
    console.log("⚠️ Auto-solver is not running.");
  }
}
