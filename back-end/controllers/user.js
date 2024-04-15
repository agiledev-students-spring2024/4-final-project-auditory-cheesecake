const User = require('../models/User');

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("controller UserId:", id);
        const user = await User.findById(id);
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
    getUserById
};