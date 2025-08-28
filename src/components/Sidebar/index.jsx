import Icon from "../Icon";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>My Lists</span>
          <button className={styles.addBtn}>+</button>
        </div>
        <div className={styles.item}>
          <Icon name="star" size="sm" className={styles.icon} />
          <span>Favorite</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
