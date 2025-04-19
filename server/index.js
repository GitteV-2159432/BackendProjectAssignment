import express from "express";  
import sessionRouter from "./routes/sessions.js";
import exerciseRouter from "./routes/exercises.js";

const app = express();

app.use(express.json()); 

app.use("/sessions", sessionRouter)
app.use("/exercises", exerciseRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
