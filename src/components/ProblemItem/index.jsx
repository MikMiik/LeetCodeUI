import Icon from "../Icon";
import styles from "./ProblemItem.module.scss";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProblemItem = ({ id, title, acceptance, difficulty }) => {
  const getDifficultyClass = (diff) => {
    if (diff === "Easy") return "easy";
    if (diff === "Med.") return "medium";
    if (diff === "Hard") return "hard";
    return "medium";
  };

  return (
    <Link to={`/problems/${id}`} className={styles.problemItem}>
      <div className={styles.left}>
        <Icon name="file" size="sm" className={styles.status} />
        <span className={styles.id}>{id}.</span>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.right}>
        <span className={styles.acceptance}>{acceptance}</span>
        <span
          className={`${styles.difficulty} ${
            styles[getDifficultyClass(difficulty)]
          }`}
        >
          {difficulty}
        </span>
        <div className={styles.actions}>
          <Icon name="bars" size="sm" className={styles.bars} />
        </div>
      </div>
    </Link>
  );
};

export default ProblemItem;
