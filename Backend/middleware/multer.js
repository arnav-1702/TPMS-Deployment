import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import streamifier from "streamifier";

dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Use memory storage
const storage = multer.memoryStorage();

// 🔹 General uploader (so you can call upload.fields([...]))
export const upload = multer({ storage });

/**
 * Factory function to create multer instance
 * @param {string} type - "image" | "resume"
 */
const makeUploader = (type) =>
  multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: (req, file, cb) => {
      if (type === "image") {
        if (file.mimetype.startsWith("image/")) cb(null, true);
        else cb(new Error("Only image files are allowed (jpg, png, jpeg)"));
      } else if (type === "resume") {
        if (
          file.mimetype === "application/pdf" ||
          file.mimetype ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        )
          cb(null, true);
        else cb(new Error("Only PDF or DOCX files are allowed"));
      } else cb(new Error("Invalid upload type"));
    },
  });

export const uploadImage = makeUploader("image");   // For photos/logos
export const uploadResume = makeUploader("resume"); // For resumes

// Cloudinary upload helper
export const uploadToCloudinary = (buffer, folder = "companyLogos") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "raw", folder },   // 👈 important for PDF/DOCX
      (error, result) => {
        if (result) resolve(result.secure_url);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

