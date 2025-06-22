import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const id = req.user.userId;
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        msg: "user tidak ada",
      });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
