const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
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

const changeUserPassword = async (req, res) => {
    const { id, oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Old password is incorrect' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).send({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).send({ message: 'Failed to change password', error: error.message });
    }
};

const editUserProfile = async (req, res) => {
    console.log("Received edit user request");
    console.log("Edit user Request body", req.body);
    try {
        const {id, firstName, lastName, email, username, phoneNumber} = req.body;
        
        if (username=='' || email=='' || firstName=='' || lastName=='' || phoneNumber=='') {
            return res.status(400).json({ error: 'Missing parameters' });
        }
        
        // load user
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // need to check if email, username, or phone number already exist for that person
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.username = username;

        await user.save();

        res.status(200).send({ message: 'User profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to edit user profile', error: error.message });
    }
};


module.exports = {
    getUserById,
    changeUserPassword,
    editUserProfile
};