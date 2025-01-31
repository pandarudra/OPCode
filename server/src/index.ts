import express from "express";
import { analyzeCode } from "./analyze";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/analyze", analyzeCode);

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
