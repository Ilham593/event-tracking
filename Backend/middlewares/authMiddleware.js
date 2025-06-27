import jwt from "jsonwebtoken";

// middleware unutk proteksi route menggunakan token jwt
export const authMiddleware = async (req, res, next) => {
  try {
    //ambil token dari header bearer
    const authHeader = req.headers.authorization;
    // jika tidak ada atau salah
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        msg: "token tidak di temukan atau format salah",
      });
    }

    //ambil token pisah dari bearer
    const token = authHeader.split(" ")[1];

    // verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //simpan payload token (userid dan lain lain  ) ke objek req unutk di gunakan
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        msg: "token kadaluaras silakan login ulang",
      });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "token tidak valid" });
    }
    res.status(401).json({
      msg: "autentikasi gagal",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({
    
    msg: "akses hanya untuk admin",
  });
};
