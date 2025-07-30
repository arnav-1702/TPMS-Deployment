import cloudinary from "./cloudinary.js";

const uploadToCloudinary = async (fileBuffer, folderName = 'resumes') => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "raw", // for docs (PDF/DOCX)
        folder: folderName
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(fileBuffer);
  });
};

export default uploadToCloudinary;
