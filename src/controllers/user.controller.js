// user.controller.js

const registerUser = (req, res) => {
    try {
        // Here, you can add your synchronous user registration logic
        // For now, let's assume registration was successful
        const user = {
            username: req.body.username,
            email: req.body.email,
        };

        res.status(200).json({
            success: true,
            message: "User registration successful",
            user,
        });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export { registerUser };
