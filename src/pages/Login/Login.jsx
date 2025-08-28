import { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, verifyEmailToken } from "../../services/authService";
import { getCurrentUser } from "../../api/auth/authSlice";
import * as yup from "yup";
import loginSchema from "../../schemas/loginSchema";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [params] = useSearchParams();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: true,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(null);

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) return;
    const verifyToken = async () => {
      try {
        const res = await verifyEmailToken(token);
        if (res.success) {
          setIsTokenValid(true);
          localStorage.setItem("token", res.data.accessToken);
          dispatch(getCurrentUser());
        } else {
          setIsTokenValid(false);
          setErrors({ submit: res.message || "Token verification failed" });
        }
      } catch (err) {
        console.error(err);
        setIsTokenValid(null);
      }
    };

    verifyToken();
  }, [token, dispatch]);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (!token && localToken) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token]);

  const currentUser = useSelector((state) => state.auth.currentUser);

  if ((currentUser && localStorage.getItem("token")) || isTokenValid === true) {
    return <Navigate to={params.get("continue") || "/"} />;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const validatedData = await loginSchema.validate(formData, {
        abortEarly: false,
      });
      if (validatedData) {
        const res = await login(formData);
        if (res.success) {
          setErrors({});
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken || "");
          dispatch(getCurrentUser());
          navigate(params.get("continue") || "/");
        } else {
          setErrors({ submit: res.message || "Login error" });
        }
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          setErrors((prev) => ({
            ...prev,
            [error.path]: error.message,
          }));
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => window.history.back()}
        >
          ← Back
        </button>
        <h2 className={styles.title}>Sign In</h2>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && (
            <div className={styles.errorMsg}>{errors.email}</div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {errors.password && (
            <div className={styles.errorMsg}>{errors.password}</div>
          )}
        </div>
        <div className={styles.formOptions}>
          <label className={styles.rememberMe}>
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleInputChange}
            />
            Remember me
          </label>
        </div>
        {errors.submit && (
          <div className={styles.errorMsg}>{errors.submit}</div>
        )}
        <button
          className={styles.submitBtn}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang đăng nhập..." : "Login"}
        </button>
        <div className="login-helper">
          <span>Bạn chưa có tài khoản?</span>
          <Link to="/register"> Đăng ký ngay</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
