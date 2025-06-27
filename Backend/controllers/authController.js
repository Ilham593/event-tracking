import User from "../models/User.js"; // import user buat operasi crud
import bcrypt from "bcryptjs"; // libraryy buat hass password
import jwt from "jsonwebtoken"; // buat token jwt

export const register = async (req, res) => {
  try {
    // ambil dan trim(hilang spasi dan request frontend)
    const { name, email, password } = req.body;

    // validasi input ,pastiakn semua wajib diisi
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ msg: "semua field wajib diisi!" });
    }

    if(password.trim().length < 6) {
      return res.status(400).json({
        msg: "Password minimal 6 karakter."
      })
    }

    // cek apakah user dengan email tersebut sudah ada atau belum
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(409).json({
        msg: "email sudah terdaftar",
      });
    }
    // hash passwrod
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    // buat user baru didatabase dengan password yang sudah di hash
    const newUser = await User.create({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    // kirim respond sukses ke  frontedn ,jng kirim password
    res.status(201).json({
      msg: "Pendaftaran Berhasil",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Terjadi Kesalahan Server",
      error: err.message || err,
    });
  }
};

export const login = async (req, res) => {
  try {
    // ambil dan trim input dari body request
    const { email, password} = req.body

    // validasi input
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({
        msg: "mohon isi email dan password",
      });
    }

    // cari user berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        msg: "Email atau password salah",
      });
    }

    // bandingakn password yang di kirim dengan password hash didatabase
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Email atau password salah" });
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

    res.status(200).json({
      msg: "berhasil login",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "terjadi kesalahan server", error: err.message });
  }
};
