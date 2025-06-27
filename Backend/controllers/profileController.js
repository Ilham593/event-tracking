import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    // ambil user id dari token
    const userId = req.user.userId;
    // cari user berdasarkan id di database || menghilangkan field password dari hasil query,
    const user = await User.findById(userId).select("-password");

    // jika tidak ada user kirim res
    if (!user) {
      return res.status(404).json({
        msg: "user tidak ada",
      });
    }

    // kiirm data profil ke user frontend
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error(err)
    res.status(500).json({
      msg: "terjadi kesalahan server",
      error: err.message,
    });
  }
};
