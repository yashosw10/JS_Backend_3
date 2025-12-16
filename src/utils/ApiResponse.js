// ApiResponse naam ka ek custom response class bana rahe hain
// Ye API ke successful responses ko standard format me bhejne ke liye use hota hai
class ApiResponse {

    // Constructor tab call hota hai jab hum `new ApiResponse()` use karte hain
    constructor(
        statusCode,                 // HTTP status code (200, 201, 204 etc.)
        data,                       // Actual data jo frontend ko bhejna hai
        message = "Success"         // Default success message
    ){
        // Response ka HTTP status code set kar rahe hain
        this.statusCode = statusCode;

        // Response ka main data (user, list, token, etc.)
        this.data = data;

        // Message jo frontend ko dikhaya jaata hai
        this.message = message;

        // success flag set kar rahe hain
        // Agar statusCode 400 se chhota hai → success true
        // Agar 400 ya usse bada hai → success false
        this.success = statusCode < 400;
    }
}

// ApiResponse ko export kar rahe hain
// Taaki poori application me use ho sake
export { ApiResponse };
