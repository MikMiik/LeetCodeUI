import Button from "../Button";
import styles from "./CourseCard.module.scss";

// eslint-disable-next-line react/prop-types
const CourseCard = ({ title, subtitle, description, color, buttonText }) => {
    return (
        <div className={`${styles.courseCard} ${styles[color]}`}>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                {description && (
                    <p className={styles.description}>{description}</p>
                )}
                <Button variant="white">{buttonText}</Button>
            </div>
            <div className={styles.decoration}></div>
        </div>
    );
};

export default CourseCard;
