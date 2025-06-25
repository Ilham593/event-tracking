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
        navigate('/login')
      })
      .catch((err) => {
        alert(err?.msg)
      })
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="flex flex-col md:flex-row gap-8 max-w-7xl w-full xs:items-center">
        {/* logo */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={heroLogin}
            alt="hero login"
            className="rounded-xl max-w-full h-auto object-contain"
          />
        </div>

        {/* form */}
        <div className="flex-1 max-w-md bg-white p-8 rounded-lg shadow-md w-full">
          <h1 className="text-center text-2xl font-semibold mb-6">
            Silakan Daftar
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-medium">
                name
              </label>
              <input
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="name"
                id="name"
                placeholder="Masukkan nama"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                name="email"
                id="email"
                placeholder="Masukkan email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <input
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                name="password"
                id="password"
                placeholder="Masukkan password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className={`w-full bg-blue-600 p-3 rounded-md text-white uppercase font-semibold flex justify-center items-center transition ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
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

            {error && <p className="text-red-500">{error}</p>}
            <p className="text-center">
              Anda sudah mempunyai Akun?
              <Link to="/login" className="text-blue-500">
                {" "}
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
