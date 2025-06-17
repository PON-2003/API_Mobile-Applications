const UserModel = require('../models/userModel');

exports.addUser = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, image } = req.body;
    // image จะเป็นลิงก์ URL ที่ผู้ใช้ส่งมา ไม่ต้องสนใจ req.file
    if (!firstname || !lastname || !email || !phone) {
      return res.status(400).json({ message: 'Please provide all required fields [firstname, lastname, email, phone]' });
    }
    const newUser = new UserModel({ firstname, lastname, email, phone, image });
    await newUser.save();
    const responseData = {
      id: newUser._id.toString(),
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      phone: newUser.phone,
      image: newUser.image,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
    res.status(201).json({ message: 'User added successfully', user: responseData });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select('-__v');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).select('-__v');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, phone, image } = req.body;
    // image จะเป็นลิงก์ URL ที่ผู้ใช้ส่งมา ไม่ต้องสนใจ req.file
    if (!firstname || !lastname || !email || !phone) {
      return res.status(400).json({ message: 'Please provide all required fields [firstname, lastname, email, phone]' });
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { firstname, lastname, email, phone, image },
      { new: true }
    ).select('-__v');
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
