// ApiError naam ka ek custom error class bana rahe hain
// Ye JavaScript ke built-in Error class ko extend karta hai
class ApiError extends Error {

    // Constructor tab call hota hai jab hum `new ApiError()` likhte hain
    constructor(
        statusCode,                         // HTTP status code (400, 404, 500 etc.)
        message = "Something went wrong",   // Agar message pass na karein to default message
        errors = [],                        // Extra error details (mostly validation errors)
        stack = ""                          // Custom stack trace (optional)
    ){
        // Parent Error class ka constructor call kar rahe hain
        // Ye `message` property set karta hai
        super(message);

        // Error ka HTTP status code store kar rahe hain
        // Express error middleware me use hoga
        this.statusCode = statusCode;

        // success false set kar rahe hain
        // Taaki frontend easily samajh sake ki request fail hui hai
        this.success = false;

        // Additional error details store kar rahe hain
        // Example: form validation errors
        this.errors = errors;

        // Agar custom stack trace diya gaya ho
        if (stack) {
            // To wahi stack trace assign kar do
            this.stack = stack;
        } else {
            // Nahi diya hai to automatically stack trace generate karo
            // Aur constructor ko stack se hata do (clean debugging ke liye)
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

// Is class ko export kar rahe hain
// Taaki poori application me kahin bhi use kar sakein
export { ApiError };
