import multer from "multer";

// STUDY FROM MULTER GITHUB

// Configure Multer storage engine to store files on disk
const storage = multer.diskStorage({

    // destination() determines WHERE the uploaded file will be stored
    // req  → Express request object
    // file → File metadata (name, mimetype, size, etc.)
    // cb   → Callback function provided by Multer
    destination: function (req, file, cb) {

        // First argument: error (null means no error)
        // Second argument: directory path where file should be stored
        // "./public/temp" is a temporary folder for uploaded files
        cb(null, "./public/temp")
    },

    // filename() determines WHAT NAME the file will be saved as
    filename: function (req, file, cb) {

        // file.originalname → original file name from the user's system
        // Example: "profile.png", "resume.pdf"

        // Here, we are keeping the original file name
        // ⚠️ This can cause filename collisions if multiple users upload
        // files with the same name

        cb(null, file.originalname)
    }
})

export const upload = multer({
    storage,
})

