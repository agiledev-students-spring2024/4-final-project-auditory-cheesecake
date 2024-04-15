const User = require('../models/User');

const getUserByEmail = async (req, res) => {
    try {
        const email = decodeURIComponent(req.params.email);
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { password, ...userWithoutPassword } = user.toObject();
        res.json(userWithoutPassword);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getUserByEmail
};