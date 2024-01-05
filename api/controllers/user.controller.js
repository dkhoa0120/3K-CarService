import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const Test = (req, res) => {
  res.json({
    message: "text",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Unauthorized!",
    });
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Unauthorized!",
    });
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Unauthorized!",
    });
  }
};
