import * as userService from '../services/userService.js';

export const registerUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(200).json({ message: 'User Created', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserByID = async (req, res) => {
    try {
        const user = await userService.getUserByID(req.params.id);
        if (!user) return res.status(404).json({ message: 'User Not Found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await userService.deleteUserByID(req.params.id);
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
