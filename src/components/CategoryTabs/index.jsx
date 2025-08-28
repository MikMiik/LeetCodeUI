import PropTypes from "prop-types";

import styles from "./CategoryTabs.module.scss";

const DIFFICULTY_TABS = [
  { name: "All", value: null },
  { name: "Easy", value: "easy" },
  { name: "Medium", value: "medium" },
  { name: "Hard", value: "hard" },
];

const CategoryTabs = ({ activeDifficulty, setActiveDifficulty }) => {
  return (
    <div className={styles.categoryTabs}>
      {DIFFICULTY_TABS.map((tab) => (
        <button
          key={tab.name}
          className={`${styles.tab} ${
            activeDifficulty === tab.value ? styles.active : ""
          }`}
          onClick={() => setActiveDifficulty(tab.value)}
        >
          <span className={styles.name}>{tab.name}</span>
        </button>
      ))}
    </div>
  );
};

CategoryTabs.propTypes = {
  activeDifficulty: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
  setActiveDifficulty: PropTypes.func.isRequired,
};

export default CategoryTabs;
