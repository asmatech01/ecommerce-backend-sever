// controllers/userAddressController.js

const UserAddress = require('../models/addressSchema');

// Create user address
exports.createShippingInfo = async (req, res) => {
  try {
    const { sessionId, addresses } = req.body;

    const userAddress = new UserAddress({
      sessionId,
      addresses,
    });

    await userAddress.save();
    res.status(201).json({ message: 'User address created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Retrieve user addresses
exports.getShippingInfo = async (req, res) => {
  try {
    const userId = req.user._id;
    const sessionId = req.sessionID;

    // Check if the user is authenticated or a guest user
    const query = req.user ? { user: userId } : { sessionId };

    const userAddresses = await UserAddress.find(query);

    if (!userAddresses) {
      return res.status(404).json({ message: 'User addresses not found' });
    }

    res.status(200).json({ userAddresses });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update user addresses
exports.updateShippingInfo = async (req, res) => {
  try {
    const userId = req.user._id;
    const sessionId = req.sessionID;
    const { addresses } = req.body;

    // Check if the user is authenticated or a guest user
    const query = req.user ? { user: userId } : { sessionId };

    const userAddress = await UserAddress.findOne(query);

    if (!userAddress) {
      return res.status(404).json({ message: 'User addresses not found' });
    }

    userAddress.addresses = addresses;

    await userAddress.save();
    res.status(200).json({ message: 'User addresses updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete user addresses
exports.deleteShippingInfo = async (req, res) => {
  try {
    const userId = req.user._id;
    const sessionId = req.sessionID;

    // Check if the user is authenticated or a guest user
    const query = req.user ? { user: userId } : { sessionId };

    const userAddress = await UserAddress.findOneAndRemove(query);

    if (!userAddress) {
      return res.status(404).json({ message: 'User addresses not found' });
    }

    res.status(200).json({ message: 'User addresses deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
