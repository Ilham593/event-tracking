import heroLogin from "../../../assets/images/hero-login.png";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { loginUser } from "../authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../authApi";
function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localLoading, setLocalLoading] = useState(false);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
      .unwrap()
      .then((res) => {
        localStorage.setItem('token', res.token)
        navigate('/')
        setLocalLoading(false);

      })
      .catch((error) => {
        console.error("Login gagal:", error);
        setLocalLoading(false);
        alert(error?.msg)
      });
  };
  return (
  <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10 transition-all duration-500 ease-in-out">
    <div className="flex flex-col md:flex-row gap-10 max-w-6xl w-full items-center animate-fade-in-up">
      {/* Image */}
      <div className="flex-1 flex justify-center">
        <img
          src={heroLogin}
          alt="hero login"
          className="rounded-xl w-full max-w-md transition-transform duration-500 hover:scale-105 shadow-xl"
        />
      </div>

      {/* Login Form */}
      <div className="flex-1 max-w-md w-full bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-blue-100 transition-all duration-300 hover:shadow-blue-300">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 tracking-wide">
          Selamat Datang 👋
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              type="email"
              name="email"
              id="email"
              placeholder="contoh@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold tracking-wide transition-all duration-300"
          >
            {localLoading || loading ? "Loading..." : "Login"}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <p className="text-sm text-center text-gray-600">
            Belum punya akun?
            <Link to="/register" className="text-blue-500 hover:underline ml-1">
              Daftar Sekarang
            </Link>
          </p>
        </form>
      </div>
    </div>
  </div>
);

}

export default LoginPage;
