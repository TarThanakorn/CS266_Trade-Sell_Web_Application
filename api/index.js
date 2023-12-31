import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

app.use(express.json());
app.use(cookieParser());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    const type = file.originalname
    const fourlastchar = (type.toString()).slice(type.length-4,type.length)
    const lastnameFile = fourlastchar  === ".jpg" || fourlastchar  === ".png" ? fourlastchar : fourlastchar === "jpeg" ? "." + fourlastchar : "";
    cb(null, Date.now() + '_' +(Math.floor(Math.random() * 90000) + 10000).toString() + lastnameFile);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(8800, () => {
  console.log("Connected!");
});
