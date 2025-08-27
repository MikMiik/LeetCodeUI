import styles from "./ExploreCard.module.scss";
import PropTypes from "prop-types";
import bgImg from "../../assets/abstract-geometric-shapes.png";

function ExploreCard({ title, subtitle, chapters, items, percent }) {
  return (
    <div className={styles.exploreCard}>
      <div className={styles.top}>
        <img src={bgImg} alt="background" className={styles.bg} />
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.stats}>
          <div>
            <span>{chapters}</span>
            <span className={styles.statLabel}>Chapters</span>
          </div>
          <div>
            <span>{items}</span>
            <span className={styles.statLabel}>Items</span>
          </div>
        </div>
        <button className={styles.playBtn}>
          <span>&#9654;</span>
        </button>
        <span className={styles.percent}>{percent}%</span>
      </div>
    </div>
  );
}

ExploreCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  chapters: PropTypes.number,
  items: PropTypes.number,
  percent: PropTypes.number,
};

export default ExploreCard;
