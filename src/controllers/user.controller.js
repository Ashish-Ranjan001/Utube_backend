import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudnary.js"

const registerUser = asyncHandler(async (req, res) => {
    // get user ddetails from frontend 
    // validation - not empty
    // check if already esists"username, email
    // check for images,check for avatar
    // upload them  to cloudinary
    // create user object - create entry in db
    // remove password and refresh token field from response 
    // check for user creation
    // return res

    const { fullName, email, username, password } = req.body
    console.log("email:", email)

    //  if (fullName === ""){
    //     throw new ApiError(400,"fullname is required")
    //  }

    if (

        [fullName, email, username, password].some((field) => field?.trim() === "")  // Advance code
    ) {
        throw new ApiError(400, "ALL fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or user already esists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is requird")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath) 
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)




    // try {
    //     // Here, you can add your synchronous user registration logic
    //     // For now, let's assume registration was successful
    //     const user = {
    //         username: req.body.username,
    //         email: req.body.email,
    //     };

    //     res.status(200).json({
    //         success: true,
    //         message: "User registration successful",
    //         user,
    //     });
    // } catch (error) {
    //     console.error("Error during user registration:", error);
    //     res.status(500).json({
    //         success: false,
    //         message: "Internal server error",
    //     });
    // };
})

export { registerUser };
