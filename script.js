const labels = [
  "Very Inaccurate",
  "Moderately Inaccurate",
  "Neither Accurate Nor Inaccurate",
  "Moderately Accurate",
  "Very Accurate"
];

// Generate buttons for each question
document.querySelectorAll(".question").forEach((qDiv) => {
  const optionsDiv = qDiv.querySelector(".options");
  labels.forEach((label, i) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.dataset.value = i + 1; // 1–5 scale
    btn.addEventListener("click", () => {
      optionsDiv.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
    optionsDiv.appendChild(btn);
  });
});

// Handle submit
document.getElementById("submitBtn").addEventListener("click", () => {
  const answers = {};
  document.querySelectorAll(".question").forEach((qDiv, index) => {
    const selected = qDiv.querySelector("button.selected");
    if (!selected) {
      alert(`Please answer Question ${index + 1}`);
      throw new Error("Incomplete survey");
    }
    answers[`Q${index + 1}`] = selected.dataset.value;
  });

  // Convert to JSON string
  const jsonString = JSON.stringify(answers, null, 2);

  // Trigger download as answers.json
  const blob = new Blob([jsonString], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "answers.json";
  link.click();

  // Change button text, disable it, and show feedback
  const submitBtn = document.getElementById("submitBtn");
  submitBtn.textContent = "Submitted";
  submitBtn.disabled = true;

  const feedback = document.getElementById("feedback");
  feedback.textContent = "✔ Submitted";
  feedback.classList.remove("hidden");
});
