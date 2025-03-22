const getUserProfile = (req, res) => {
    res.json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    });
};

module.exports = { getUserProfile };
