const mongoose = require('mongoose');
const UserModel = require('../models/userModel');

exports.addUser = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, image, gender } = req.body;
    // ไม่ต้องเช็ค required ทุก field
    const newUser = new UserModel({ firstname, lastname, email, phone, image, gender });
    await newUser.save();
    const responseData = {
      id: newUser._id.toString(),
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      phone: newUser.phone,
      image: newUser.image,
      gender: newUser.gender,
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
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }
    const { firstname, lastname, email, phone, image, gender } = req.body;
    // ไม่ต้องเช็ค required ทุก field
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { firstname, lastname, email, phone, image, gender },
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }
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
