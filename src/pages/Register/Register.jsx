import { useState } from "react";
import styles from "./Register.module.scss";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import registerSchema from "../../schemas/registerSchema";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    console.log(errors);

    try {
      const validatedData = await registerSchema.validate(formData, {
        abortEarly: false,
      });
      if (validatedData) {
        const res = await register(formData, { withCredentials: true });
        if (!res.success) {
          setErrors(() => ({
            submit: res.message,
          }));
        } else {
          navigate("/login", {
            replace: true,
            state: {
              message: res.data.message,
            },
          });
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
    <div className={styles.registerPage}>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => window.history.back()}
        >
          ← Back
        </button>
        <h2 className={styles.title}>Sign Up</h2>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            autoComplete="name"
          />
          {errors.name && <div className={styles.errorMsg}>{errors.name}</div>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            autoComplete="email"
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
            autoComplete="new-password"
          />
          {errors.password && (
            <div className={styles.errorMsg}>{errors.password}</div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <div className={styles.errorMsg}>{errors.confirmPassword}</div>
          )}
        </div>
        {errors.submit && (
          <div className={styles.errorMsg}>{errors.submit}</div>
        )}
        <button
          className={styles.submitBtn}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang đăng ký..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
