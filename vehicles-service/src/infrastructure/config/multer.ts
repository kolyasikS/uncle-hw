import * as fs from "node:fs";
import path from "node:path";
import multer, { FileFilterCallback } from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 1. Read subfolder set by the route (defaults to 'misc')
    const subfolder = (req as any).uploadFolder || "misc";
    const uploadPath = path.join("persistance/uploads", subfolder);

    // 2. Ensure directory exists before saving
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate a unique file name using timestamp + original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  // Allow images only
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});
