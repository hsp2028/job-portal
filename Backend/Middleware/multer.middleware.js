import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({storage});

export const singleUpload = upload.single("file");
const profileUpdateFields = upload.fields([
  { name: "file", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 },
]);

export const profileUpdateUpload = (req, res, next) => {
  profileUpdateFields(req, res, (error) => {
    if (error) {
      return res.status(error instanceof multer.MulterError ? 400 : 500).json({
        message: error.message || "Profile file upload failed",
        success: false,
      });
    }
    next();
  });
};
