import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        msg: "token tidak di temukan atau format salah",
      });
    }

    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;
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
