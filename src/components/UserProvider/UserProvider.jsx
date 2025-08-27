import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../api/auth/authSlice";

function UserProvider() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return null;
}
export default UserProvider;
