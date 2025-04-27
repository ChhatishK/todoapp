const User = require('../models/User');

exports.updateUserDetails = async (req, res) => {
    try {

        const userId = req.user.id;
        const {fullName, password, phoneNumber} = req.body;

        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "Login Needed"
            })
        }
        
        const userDetails = await User.findById(userId);

        const user = await User.findByIdAndUpdate(userId, {
            fullName: fullName? fullName : userDetails.fullName,
            password: password? password : userDetails.password,
            phoneNumber: phoneNumber? phoneNumber : userDetails.phoneNumber
        }, {new: true}).populate('todos').exec();

        return res.status(200).json({
            success: true,
            message: "Profile Updated!",
            data: user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
            error: error.message
        })
    }
}