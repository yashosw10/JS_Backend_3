import {v2 as cloudinary} from "cloudinary"

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });

    // Async function to upload a file to Cloudinary
// localFilePath → path of the file stored temporarily on the server
const uploadOnCloudinary = async (localFilePath) => {
    try {
        // If no file path is provided, exit early
        // Prevents unnecessary Cloudinary API calls
        if (!localFilePath) return null

        // Upload the file to Cloudinary
        // resource_type: "auto" allows Cloudinary to detect
        // the file type automatically (image, video, pdf, etc.)
        const response = await cloudinary.uploader.upload(localFilePath, { // Study UploadTypes on cloudinary
            resource_type: "auto"
        })

        // If upload is successful, Cloudinary returns a response object
        // response contains:
        // - response.url        → public URL of uploaded file
        // - response.public_id  → unique Cloudinary file ID
        // - response.secure_url → HTTPS version of the URL
        // - response.resource_type → image/video/raw

        // Delete the file from local storage after successful upload
        // This prevents unnecessary disk usage on the server
        fs.unlinkSync(localFilePath)

        // Return the Cloudinary response so it can be saved in DB
        return response;

    } catch (error) {

        // If an error occurs during upload:
        // Remove the locally saved temporary file
        // This ensures no orphan files remain on the server
        fs.unlinkSync(localFilePath)

        // Return null to indicate upload failure
        // Controller can handle this gracefully
        return null;
    }
}
    
