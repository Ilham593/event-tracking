import heroLogin from "../../../assets/images/hero-login.png";
import { Link, useNavigate } from "react-router-dom";
// membaca state dari store
import { useSelector } from "react-redux";
// kirim action
import { useDispatch } from "react-redux";
import { registerUser } from "../authSlice";
import { useState } from "react";
function Register() {
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("nama harus disini");
      return;
    }
    if (!formData.email.trim()) {
      alert("email harus disini");
      return;
    }

    if (!formData.password.trim()) {
      alert("password harus disii");
      return;
    }
    dispatch(registerUser(formData))
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        alert(err?.msg);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 flex items-center justify-center px-4 py-10 transition-all duration-500 ease-in-out">
      <div className="flex flex-col md:flex-row gap-10 max-w-6xl w-full items-center animate-fade-in-up">
        {/* Image Section */}
        <div className="flex-1 flex justify-center">
          <img
            src={heroLogin}
            alt="hero login"
            className="rounded-xl w-full max-w-md transition-transform duration-500 hover:scale-105 shadow-xl"
          />
        </div>

        {/* Register Form */}
        <div className="flex-1 max-w-md w-full bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-indigo-100 transition-all duration-300 hover:shadow-indigo-200">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 tracking-wide">
            Buat Akun Baru 📝
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block mb-1 font-medium text-gray-700"
              >
                Nama Lengkap
              </label>
              <input
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                type="text"
                name="name"
                id="name"
                placeholder="Masukkan nama lengkap"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-medium text-gray-700"
              >
                Email
              </label>
              <input
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                type="email"
                name="email"
                id="email"
                placeholder="contoh@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-1 font-medium text-gray-700"
              >
                Password
              </label>
              <input
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className={`w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold tracking-wide flex justify-center items-center transition-all duration-300 ${
                loading
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-indigo-700"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                "Register"
              )}
            </button>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <p className="text-sm text-center text-gray-600">
              Sudah punya akun?
              <Link
                to="/login"
                className="text-indigo-500 hover:underline ml-1"
              >
                Login di sini
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
