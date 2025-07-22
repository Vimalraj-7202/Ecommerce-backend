import User from "../models/userModel.js";
import bcrypt from 'bcrypt';

export const createUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User({ ...data, password: hashedPassword });
    return await user.save();
};

export const getAllUsers = async () => {
    return await User.find().select('-password'); 
};

export const getUserByID = async (id) => {
    return await User.findById(id).select('-password');
};

export const deleteUserByID = async (id) => {
    return await User.findByIdAndDelete(id);
};
