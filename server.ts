import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", hospital: "Divyam Hospital" });
  });

  // Mock API for Hospital System
  // In a real app, these would connect to MongoDB or Firebase
  app.post("/api/auth/login", (req, res) => {
    const { mobile, opdNumber } = req.body;
    // Simulation: Admin is 9999999999 / ADMIN
    if (mobile === "9999999999" && opdNumber === "ADMIN") {
      return res.json({ id: "admin-1", role: "admin", name: "Hospital Admin", mobile });
    }
    // Simulation: Patient if OPD is same as mobile
    if (mobile && opdNumber === mobile) {
      return res.json({ id: `p-${mobile}`, role: "patient", name: "Guest Patient", mobile });
    }
    // Default success for demo purposes
    res.json({ id: `user-${mobile}`, role: "patient", name: "User", mobile });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Divyam Hospital Server running on http://localhost:${PORT}`);
  });
}

startServer();
