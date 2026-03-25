import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [projects, setProjects] = useState([]);

  async function generate() {
    const res = await axios.post("http://localhost:5000/generate", { prompt });
    setProjects([...projects, res.data]);
  }

  async function loadProjects() {
    const res = await axios.get("http://localhost:5000/projects");
    setProjects(res.data);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🚀 AI Builder PRO</h1>

      <textarea
        placeholder="Crie um sistema..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <br /><br />
      <button onClick={generate}>Gerar Projeto</button>

      <h2>Projetos</h2>

      {projects.map(p => (
        <div key={p.id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <h3>{p.name}</h3>
          <a href={p.previewUrl} target="_blank">Abrir</a>
        </div>
      ))}
    </div>
  );
}