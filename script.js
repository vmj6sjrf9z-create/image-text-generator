const MODEL = "runwayml/stable-diffusion-v1-5";

const res = await fetch(
  `https://api-inference.huggingface.co/models/${MODEL}`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${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}`,
      "Content-Type": "application/json",
      "Accept": "image/png"
    },
    body: JSON.stringify({
      inputs: prompt
    })
  }
);

// Handle loading state
const contentType = res.headers.get("content-type");

if (!res.ok) {
  const text = await res.text();
  throw new Error(text);
}

if (contentType.includes("application/json")) {
  const data = await res.json();
  throw new Error(data.error || "Model returned JSON");
}

const blob = await res.blob();
resultImg.src = URL.createObjectURL(blob);
