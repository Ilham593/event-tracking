import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();
    if (!name || !email || !password) {
      console.log("mohon di isi semua");
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({
        msg: "pengguna sudah ada",
      });
    }

    const hashPw = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashPw });

    res.status(201).json({
      msg: "berhasil terdaftar",
      user: {
        name: newUser.name,
      },
    });
  } catch (err) {
    res.status(500).json({
      msg: "gagal mendaftar",
      error: err.msg,
    });
  }
};

export const login = async (req, res) => {
  try {
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();
    if (!email || !password) {
      return res.status(400).json({
        msg: "mohon isi email dan password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "pengguna tidak di temukan",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "password salah" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      msg: "berhasil login",
      token,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ msg: "gagal login" });
  }
};
