import styles from "./Button.module.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const Button = ({
  children,
  variant = "primary",
  onClick,
  as,
  to,
  ...props
}) => {
  if (as === Link && to) {
    return (
      <Link
        to={to}
        className={`${styles.button} ${styles[variant]}`}
        {...props}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "white", "premium", "secondary"]),
  onClick: PropTypes.func,
  as: PropTypes.elementType,
  to: PropTypes.string,
};

export default Button;
