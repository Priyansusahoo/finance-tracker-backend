// @desc   Get user profile
// @route  GET /api/users/profile
// @access Private (Requires authentication)


const getUserProfile = (req, res) => {
    res.json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    });
};

module.exports = { getUserProfile };
