export default async function handler(req, res) {
  const { text } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `Rewrite the draft into a concise, grammatically correct clinical SESIS note.

Rules:
- Use only the information in the draft
- Do not add facts
- Do not change meaning
- Preserve all input but remove generator labels
- Interpret free text into clinical language
- Include exactly one clinical significance sentence
- That sentence must explain why the activity is functional
- Tie the goal into the activity naturally
- Do not sound templated`
        },
        {
          role: "user",
          content: text
        }
      ]
    })
  });

  const data = await response.json();

  res.status(200).json({
    output: data.choices?.[0]?.message?.content || ""
  });
}

