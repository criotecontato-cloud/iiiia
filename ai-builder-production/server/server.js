import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "devsecret";

let users = [];
let projects = [];

// AUTH
app.post("/auth/register", (req, res) => {
  const { email, password } = req.body;
  users.push({ email, password });
  res.json({ message: "Usuário criado" });
});

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

  const token = jwt.sign({ email }, SECRET);
  res.json({ token });
});

// GENERATE
app.post("/generate", (req, res) => {
  const { prompt } = req.body;

  const project = {
    id: Date.now(),
    name: prompt || "Projeto IA",
    previewUrl: "http://localhost:3000"
  };

  projects.push(project);
  res.json(project);
});

// PROJECTS
app.get("/projects", (req, res) => {
  res.json(projects);
});

app.listen(5000, () => {
  console.log("🚀 Backend rodando em http://localhost:5000");
});