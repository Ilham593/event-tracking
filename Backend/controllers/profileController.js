import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    // ambil user id dari object yang bisaay diisi aut dari token
    const id = req.user.userId;
    // cari user berdasarkan id di database
    const user = await User.findById(id);

    // jika tidak ada user kirim res
    if (!user) {
      return res.status(404).json({
        msg: "user tidak ada",
      });
    }

    // kiirm data profil ke user frontend
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({
      msg: "terjadi kesalahan server", 
      error: err.message,
    });
  }
};
