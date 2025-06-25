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
            Silakan Login
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
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
              type="submit"
              className="w-full bg-blue-600 p-3 rounded-md text-white uppercase font-semibold hover:bg-blue-700 transition"
            >
              {localLoading || loading ? "...loading" : "login"}
            </button>
            {error && <p>{error}</p>}
            <p className="text-center">
              Anda belum mempunyai Akun?
              <Link to="/register" className="text-blue-500">
                {" "}
                Regsiter
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
