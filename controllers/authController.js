import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = generateToken(user._id, user.role);
  res.status(200).json({ token, user: { id: user._id, name: user.name, role: user.role } });
};
