const Address = require("../../../models/Address");

module.exports.postAddress = async (req, res) => {
  try {
    const { userId, country, city, address, phoneNumber } = req.body;
    if (!userId || !country || !city || !address || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const newAddress = new Address({
      userId: userId,
      country: country,
      city: city,
      address: address,
      phoneNumber: phoneNumber,
    });

    await newAddress.save();

    res.status(201).json({
      success: true,
      message: "Create address successfully",
      data: newAddress,
    });
  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports.getAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required",
      });
    }

    const address = await Address.find({ userId: userId });

    res.status(200).json({
      success: true,
      message: "Get address successfully",
      data: address,
    });
  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports.updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required",
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId: userId,
      },
      formData,
      { new: true }
    );

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Update address successfully",
      data: address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports.deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required",
      });
    }

    const address = await Address.findOneAndDelete({
      _id: addressId,
      userId: userId,
    });

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};
