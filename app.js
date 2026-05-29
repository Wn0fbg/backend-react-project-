import express from "express";
import { config } from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

config({ path: "./config/config.env" });

// Парсер кук и тела
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Настройка загрузки файлов через multer
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, path.join(__dirname, "uploads", "products_images"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
  },
});

app.use(errorMiddleware);

export default app;
