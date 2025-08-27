import styles from "./Button.module.scss";

// eslint-disable-next-line react/prop-types
const Button = ({ children, variant = "primary", onClick, ...props }) => {
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

export default Button;
