import User from "../models/User.js"; // import user buat operasi crud
import bcrypt from "bcryptjs"; // libraryy buat hass password
import jwt from "jsonwebtoken"; // buat token jwt

export const register = async (req, res) => {
  try {
    // ambil dan trim(hilang spasi dan request frontend)
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();

    // validasi input ,pastiakn semua wajib diisi
    if (!name || !email || !password) {
      return res.status(400).json({
        msg: "mohon isi semua field yang di perlukan",
      });
    }

    // cek apakah user dengan email tersebut sudah ada atau belum
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        msg: "pengguna sudah ada woi",
      });
    }
    // hash passwrod
    const hashPw = await bcrypt.hash(password, 10);

    // buat user baru didatabase dengan password yang sudah di hash
    const newUser = await User.create({ name, email, password: hashPw });

    // kirim respond sukses ke  frontedn ,jng kirim password
    res.status(201).json({
      msg: "berhasil terdaftar",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
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
    // ambil dan trim input dari body request
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();

    // validasi input 
    if (!email || !password) {
      return res.status(400).json({
        msg: "mohon isi email dan password",
      });
    }

    // cari user berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "pengguna tidak di temukan",
      });
    }

    // bandingakn password yang di kirim dengan password hash didatabase
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "password salah" });
    }

    // buat token jwt dengan user id dan role selama 1 jam
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      msg: "berhasil login",
      token,
      role: user.role,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "gagal login",  error: err.message });
  }
};
