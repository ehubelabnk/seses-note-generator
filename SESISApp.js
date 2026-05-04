import React, { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const generate = async () => {
    const res = await fetch('/api/rewrite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input })
    });

    const data = await res.json();
    setOutput(data.output || 'Error generating note');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>SESIS Note Generator</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste draft note here"
        rows={10}
        style={{ width: '100%', marginBottom: 10 }}
      />

      <button onClick={generate}>Generate Note</button>

      <textarea
        value={output}
        readOnly
        rows={10}
        style={{ width: '100%', marginTop: 10 }}
      />
    </div>
  );
}