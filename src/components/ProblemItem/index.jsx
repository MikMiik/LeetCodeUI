import PropTypes from "prop-types";
import Icon from "../Icon";
import styles from "./ProblemItem.module.scss";
import { Link } from "react-router-dom";

const ProblemItem = ({ id, title, difficulty, tags }) => {
  const getDifficultyClass = (diff) => {
    if (!diff) return "medium";
    const d = diff.toLowerCase();
    if (d === "easy") return "easy";
    if (d === "medium") return "medium";
    if (d === "hard") return "hard";
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
        {Array.isArray(tags) && tags.length > 0 && (
          <span className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag.id} className={styles.tag}>
                {tag.name}
              </span>
            ))}
          </span>
        )}
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

ProblemItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  difficulty: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};
