export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "token tidka di temukan" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({ msg: "invalid credential" });
    }
    req.user = decode;
    next();
  } catch (err) {
    res.status(401).json({ msg: err.message });
  }
};
