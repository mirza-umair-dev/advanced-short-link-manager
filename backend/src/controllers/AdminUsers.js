import User from "../models/User.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("name email role isVerified createdAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      users,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error!" });
  }
};

export default getUsers;
