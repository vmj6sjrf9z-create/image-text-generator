const generateBtn = document.getElementById("generate");
const promptInput = document.getElementById("prompt");
const resultImg = document.getElementById("result");

// Replace this with your Hugging Face token
const HF_TOKEN = "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"; 

// Model to use
const MODEL = "stabilityai/stable-diffusion-3.5-large"; // Text-to-image

generateBtn.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();
  if (!prompt) return alert("Please enter a description!");

  resultImg.src = ""; // Clear previous image
  generateBtn.textContent = "Generating...";

  try {
    const res = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    if (!res.ok) throw new Error("Failed to generate image.");

    const blob = await res.blob();
    resultImg.src = URL.createObjectURL(blob);
  } catch (err) {
    alert("Error: " + err.message);
  } finally {
    generateBtn.textContent = "Generate Image";
  }
});
