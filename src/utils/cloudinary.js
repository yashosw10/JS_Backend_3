// Cloudinary ka v2 version import kar rahe hain
// v2 as cloudinary likhne se modern API access milta hai
import { v2 as cloudinary } from "cloudinary";

// Node.js ka file system module
// Local server se files delete karne ke kaam aata hai
import fs from "fs";


// 🔹 Cloudinary configuration
// Credentials environment variables se aa rahe hain (secure approach)
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary account name
    api_key: process.env.CLOUDINARY_API_KEY,       // Public API key
    api_secret: process.env.CLOUDINARY_API_SECRET  // Secret key (kabhi expose nahi karni)
});


// 🔹 Async function to upload file on Cloudinary
// localFilePath = wo path jahan multer ne file temporarily save ki hoti hai
const uploadOnCloudinary = async (localFilePath) => {
    try {
        // Agar file path hi nahi mila
        // to direct null return kar do
        if (!localFilePath) return null;

        // Cloudinary pe file upload kar rahe hain
        // resource_type: "auto" → Cloudinary khud detect karega
        // image / video / pdf / raw file
        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: "auto"
            }
        );

        // Upload successful hone ke baad
        // local server se file delete kar dete hain
        // Taaki disk space waste na ho
        fs.unlinkSync(localFilePath);

        // Cloudinary ka response return kar rahe hain
        // Isme URL, public_id, secure_url, etc hota hai
        return response;

    } catch (error) {

        // Agar upload ke time error aaya
        // tab bhi local file delete karni zaroori hai
        if (localFilePath) {
            fs.unlinkSync(localFilePath);
        }

        // Upload fail hone par null return kar dete hain
        // Controller isko handle karega
        return null;
    }
};


// Function ko export kar rahe hain
// Taaki controllers me use ho sake
export { uploadOnCloudinary };
