// asyncHandler ek higher-order function hai
// Matlab: ye ek function leta hai aur ek naya function return karta hai
const asyncHandler = (requestHandler) => {

    // Ye function Express route handler hota hai
    return (req, res, next) => {

        // Promise.resolve() ensure karta hai ki:
        // - async function ho ya normal function
        // - dono ko promise ki tarah handle kiya ja sake
        Promise
            .resolve(requestHandler(req, res, next))

            // Agar requestHandler ke andar koi error aaya
            // to wo catch block me aa jayega
            .catch((err) => next(err)); // Error ko Express ke error middleware ko bhej dete hain
    };
};

// asyncHandler ko export kar rahe hain
export { asyncHandler };





// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}


// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }