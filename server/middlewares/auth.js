const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "No token provided or invalid token format"
            });
        }

        const token = authHeader.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;
            next();
        } catch (jwtError) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during authentication"
        });
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        if (!req.user || req.user.accountType !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin privileges required."
            });
        }
        next();
    } catch (error) {
        console.error("isAdmin middleware error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during admin verification"
        });
    }
}

exports.isClient = async (req, res, next) => {
    try {
        if (!req.user || req.user.accountType !== "Client") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Client privileges required."
            });
        }
        next();
    } catch (error) {
        console.error("isClient middleware error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during client verification"
        });
    }
}