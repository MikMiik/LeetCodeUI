import Icon from "../Icon";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.section}>
                <div className={styles.item}>
                    <Icon name="book" size="sm" className={styles.icon} />
                    <span>Library</span>
                </div>
                <div className={styles.item}>
                    <Icon
                        name="graduation-cap"
                        size="sm"
                        className={styles.icon}
                    />
                    <span>Study Plan</span>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <span>My Lists</span>
                    <button className={styles.addBtn}>+</button>
                </div>
                <div className={styles.item}>
                    <Icon name="star" size="sm" className={styles.icon} />
                    <span>Favorite</span>
                    <Icon name="lock" size="sm" className={styles.lock} />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
