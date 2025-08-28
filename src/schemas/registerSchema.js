import * as yup from "yup";
const registerSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Vui lòng nhập tên người dùng")
    .min(2, "Tên người dùng phải có ít nhất 2 ký tự"),
  email: yup
    .string()
    .trim()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .test("password", "Mật khẩu chưa đáp ứng đủ yêu cầu", function (value) {
      const errors = [];

      if (!value) return true;

      if (value.length < 8) errors.push("ít nhất 8 ký tự");

      if (!/[0-9]/.test(value)) errors.push("một số");

      if (!/[a-z]/.test(value)) errors.push("một chữ thường");

      if (!/[A-Z]/.test(value)) {
        errors.push("một chữ hoa");
      }

      if (!/[^\w]/.test(value)) errors.push("một ký tự đặc biệt");

      if (errors.length > 0) {
        return this.createError({
          message: `Mật khẩu cần: ${errors.join(", ")}`,
        });
      }
      return true;
    }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không khớp"),
});

export default registerSchema;
