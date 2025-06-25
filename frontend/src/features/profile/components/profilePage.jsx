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
  const token = useSelector((state) => state.auth.token); // Biasanya token ada di auth slice

  useEffect(() => {
    if (!token) {
      // Jika tidak ada token, redirect ke login
      navigate("/login");
    } else {
      dispatch(fetchProfile());
    }
  }, [dispatch, token, navigate]);

  if (!token) {
    return <p>Anda harus login untuk melihat profil</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("user", user)
  return (
   
  );
}

export default ProfilePage;
