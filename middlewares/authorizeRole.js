const authorizeRole = (...roles) => {
    return (req, res, next) => {
        console.log("User Role:", req.user.role);
        if (!roles.includes(req.user.role)) {
            return res.status(403).send("Access denied.");
        }
        next();
    };
};

module.exports = authorizeRole;