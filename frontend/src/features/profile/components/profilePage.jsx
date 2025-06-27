import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../profileSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.profile.loading);
  const error = useSelector((state) => state.profile.error);
  const user = useSelector((state) => state.profile.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile());
    }
  }, [dispatch, token]);

  if (!token) {
    return (
      <div className="max-w-sm mx-auto mt-24 p-6 bg-white rounded-lg shadow-md text-center">
        <p className="mb-4 text-gray-700 font-semibold">
          Anda harus login untuk melihat profil.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Login Sekarang
        </button>
      </div>
    );
  }

  if (loading) return <p className="text-center mt-24">Loading...</p>;
  if (error)
    return <p className="text-center mt-24 text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-sm mx-auto mt-24 p-6 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100 transition-all duration-300 animate-fade-in-up">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        Profil Pengguna 👤
      </h1>

      {user ? (
        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold text-gray-800">Nama:</span>{" "}
            {user.name}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Email:</span>{" "}
            {user.email}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Role:</span>{" "}
            <span
              className={`inline-block px-2 py-0.5 rounded text-sm font-medium ${
                user.role === "admin"
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {user.role}
            </span>
          </p>
        </div>
      ) : (
        <p className="text-gray-500 italic text-sm">Tidak ada data user</p>
      )}
    </div>
  );
}

export default ProfilePage;
